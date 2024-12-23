import React, { useReducer, useState, useRef, useLayoutEffect, useEffect } from "react";
import useAppContext from "../../contexts/App/useAppContext";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../../../backend/configs/database";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import CropImage from "../CropImage/CropImage";
import InputField from "../Inputs/InputField";
import InputSelectField from "../Inputs/InputSelectField";
import InputFileField from "../Inputs/InputFileField";
import ProfilePreview from "../ProfilePreview/ProfilePreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faCheck, faXmark, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import IMG from "../../utilities/files/IMG";
import CSV from "../../utilities/files/CSV";
import data from "../../store/userDataSelection.json";
import SHA265 from "../../utilities/crypto/SHA265";
import "./EditUserForm.scss";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utilities/localStorage/localStorageActions";

const initialState = {
	chuyen_nganh: "",
	khoa: "",
	lop: "",
	name: "",
	className: "",
	profilePic: null,
	profilePicUploaded: null,
};

const listChuyenNganhOptions = Object.keys(data.chuyen_nganh);

function reducer(state, action) {
	switch (action.type) {
		case "SET_NAME":
			return { ...state, name: action.payload };
		case "SET_CHUYEN_NGANH":
			return { ...state, chuyen_nganh: action.payload, className: data.chuyen_nganh[action.payload] };
		case "SET_KHOA":
			return { ...state, khoa: action.payload && /^[1-9][0-9]{0,1}$/.test(action.payload) ? action.payload : "" };
		case "SET_LOP":
			return {
				...state,
				lop: action.payload && /^[a-zA-Z]+$/.test(action.payload.trim()) ? action.payload.trim()[0].toUpperCase() : "",
			};
		case "SET_PROFILE_PIC":
			return { ...state, profilePic: action.payload };
		case "SET_PROFILE_PIC_UPLOADED":
			return { ...state, profilePicUploaded: action.payload };
		default:
			return state;
	}
}

function EditUserForm({ UID, userData = null, updateUserData, localStorageName = "EditUserForm-state--state", isJustOne = true}) {
	const { appContext } = useAppContext();
	const [state, dispatch] = useReducer(reducer, initialState);
	const [cropVisible, setCropVisible] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [isFectData, setIsFectData] = useState(false);
	const [isAsync, setIsAsync] = useState(true);
	const profileRef = useRef(null);

	const handleFileChange = async (e, type) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const handler = type === "IMG" ? new IMG(file) : new CSV(file);
			await handler.readFilePromise;
			if (type === "IMG") {
				Cookies.remove("CropImage-state--crop");
				dispatch({ type: "SET_PROFILE_PIC", payload: handler.IMGDataUrl });
				dispatch({ type: "SET_PROFILE_PIC_UPLOADED", payload: handler.IMGDataUrl });
				setCropVisible(true);
			} else {
				const data = handler.readSingleUserData();
				dispatch({ type: "SET_NAME", payload: data[0] });
				dispatch({ type: "SET_CHUYEN_NGANH", payload: data[1] });
				dispatch({ type: "SET_CLASS_NAME", payload: data[2] });
				dispatch({ type: "SET_KHOA", payload: data[3] });
				dispatch({ type: "SET_LOP", payload: data[4] });
				dispatch({ type: "SET_PROFILE_PIC", payload: data[5] });
			}
		}
	};

	const handleCropPicture = (base64Src) => {
		if (base64Src) {
			dispatch({ type: "SET_PROFILE_PIC", payload: base64Src });
		}
	};

	const handleUploadData = async () => {
		const curData = {
			name: state.name,
			khoa: state.khoa,
			lop: state.lop,
			className: state.className,
			chuyen_nganh: state.chuyen_nganh,
			profilePic: state.profilePic,
		};

		setIsUploading(true);
		try {
			await setDoc(doc(db, "userInformation", UID), curData);
			updateUserData(curData);
			setIsAsync(true);
			localStorage.removeItem(localStorageName);
		} catch (error) {
			Swal.fire({
				title: "Thất bại!",
				text: "Cập nhật thông tin thất bại",
				icon: "error",
			});
		}
		setIsUploading(false);
	};

	const handleAsyncData = () => {
		const { HashedUID, name, className, chuyen_nganh, profilePic, lop, khoa } = loadFromLocalStorage(localStorageName) || {};
		if (!(name || className || chuyen_nganh || profilePic || lop || khoa) || (!isJustOne && !SHA265.verifyData(UID, HashedUID))) {
			dispatch({ type: "SET_NAME", payload: userData?.name || "" });
			dispatch({ type: "SET_CLASS_NAME", payload: userData?.className || "" });
			dispatch({ type: "SET_CHUYEN_NGANH", payload: userData?.chuyen_nganh || "" });
			dispatch({ type: "SET_PROFILE_PIC", payload: userData?.profilePic || null });
			dispatch({ type: "SET_PROFILE_PIC_UPLOADED", payload: userData?.profilePic || null });
			dispatch({ type: "SET_LOP", payload: userData?.lop || "" });
			dispatch({ type: "SET_KHOA", payload: userData?.khoa || "" });
		} else {
			dispatch({ type: "SET_NAME", payload: name });
			dispatch({ type: "SET_CLASS_NAME", payload: className });
			dispatch({ type: "SET_CHUYEN_NGANH", payload: chuyen_nganh });
			dispatch({ type: "SET_PROFILE_PIC", payload: profilePic });
			dispatch({ type: "SET_PROFILE_PIC_UPLOADED", payload: profilePic });
			dispatch({ type: "SET_LOP", payload: lop });
			dispatch({ type: "SET_KHOA", payload: khoa });
		}
	};

	useLayoutEffect(() => {
		handleAsyncData();
		setIsFectData(true);
	}, [userData]);

	useEffect(() => {
		const isDataChanged = (state, userData) => {
			if (
				state.name?.trim() !== (userData?.name ?? "").trim() ||
				state.className?.trim() !== (userData?.className ?? "").trim() ||
				state.chuyen_nganh?.trim() !== (userData?.chuyen_nganh ?? "").trim() ||
				state.profilePic !== (userData?.profilePic ?? null) ||
				state.lop?.trim() !== (userData?.lop ?? "").trim() ||
				state.khoa?.trim() !== (userData?.khoa ?? "").trim()
			) {
				return true;
			}

			setIsAsync(true);
			return false;
		};

		if (isDataChanged(state, userData) && isFectData) {
			setIsAsync(false);
			const { profilePicUploaded, ...newState } = state;
			if(!isJustOne) newState.HashedUID = SHA265.hashData(UID);
			saveToLocalStorage(localStorageName, newState);
		}
	}, [state, userData, isFectData]);

	return (
		<>
			{cropVisible ? (
				<CropImage
					src={state.profilePicUploaded}
					fixedWidth={Math.min(Math.max(170, appContext.screenW * (5 / 28)), 250)}
					setStorage={handleCropPicture}
					visible={cropVisible}
					setVisible={setCropVisible}
				/>
			) : (
				<div className="update-information">
					<div className="update-information__part update-information__form">
						<div className="update-information__form__container">
							<InputField
								title="Họ và tên"
								type="text"
								id="user-name"
								name="name"
								placeholder="Nhập tên của bạn"
								value={state.name}
								onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
							/>
							<InputSelectField
								title="Chuyên ngành"
								id="user-chuyen_nganh"
								Faicon={faCaretDown}
								listOptions={listChuyenNganhOptions}
								placeholder="Nhập chuyên ngành"
								defaultValue={state.chuyen_nganh}
								handleSetData={(value) => dispatch({ type: "SET_CHUYEN_NGANH", payload: value })}
							/>
							<div className="form__nested__input">
								<InputField
									title="Khóa"
									type="number"
									id="user-khoa"
									name="khoa"
									placeholder="Nhập khóa của bạn (VD: 19, 20, ...)"
									value={state.khoa}
									onChange={(e) => dispatch({ type: "SET_KHOA", payload: e.target.value })}
								/>
								<InputField
									title="Lớp"
									id="user-className"
									placeholder="Nhập lớp (VD: A, B, C, D, ...)"
									value={state.lop}
									onChange={(e) => dispatch({ type: "SET_LOP", payload: e.target.value })}
								/>
							</div>
							<InputFileField
								id="user-profile-pic"
								title="Chọn ảnh đại diện"
								customAccept="image/png, image/jpg, image/jpeg"
								handle={(e) => handleFileChange(e, "IMG")}
							/>
							<span className="update-information__form__breakLine">------ Hoặc ------</span>
							<InputFileField
								id="user-profile-csv"
								title="Nhập file CSV"
								customAccept=".csv, .xlsx"
								handle={(e) => handleFileChange(e, "CSV")}
							/>
						</div>
					</div>
					<div className="update-information__part update-information__profile" ref={profileRef}>
						<div className="update-information__profile__content">
							<ProfilePreview {...state} width={"45em"} onClickImg={() => setCropVisible(true)} />
						</div>
						<div className="update-information__profile__process">
							<button
								className="update-information__profile__process__submit update-information__profile__process__element"
								onClick={handleUploadData}
								disabled={isUploading}
							>
								{isUploading ? (
									<>
										Đang lưu
										<FontAwesomeIcon icon={faSpinner} pulse />
									</>
								) : (
									"Lưu thông tin"
								)}
							</button>
							<div className="update-information__profile__process__async update-information__profile__process__element">
								<span>{isAsync ? "Đã lưu" : "Chưa lưu"}</span>
								<FontAwesomeIcon icon={isAsync ? faCheck : faXmark} className={`${isAsync ? "async" : ""}`} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default React.memo(EditUserForm);
