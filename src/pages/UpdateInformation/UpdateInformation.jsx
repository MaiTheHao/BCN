import React, { useReducer, useState, useEffect, useLayoutEffect, useRef } from "react";
import Cookies from "js-cookie";
import { db, auth } from "../../FB/db";
import "./UpdateInformation.scss";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import useAppContext from "../../contexts/App/useAppContext";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import CropImage from "../../components/CropImage/CropImage";
import CSV from "../../components/handle/CSV";
import IMG from "../../components/handle/IMG";
import { faCaretDown, faCheck, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import data from "./store.json";
import InputSelectField from "./Components/InputSelectField";
import InputField from "./Components/InputField";
import InputFileField from "./Components/InputFileField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const initialState = {
	name: "",
	className: "",
	khoa: "",
	profilePic: null,
	profilePicUploaded: null,
};

const listChuyenNganhOptions = data.chuyen_nganh;
const listLopOptions = data.lop;

function reducer(state, action) {
	switch (action.type) {
		case "SET_NAME":
			return { ...state, name: action?.payload };
		case "SET_CLASS_NAME":
			return { ...state, className: action?.payload };
		case "SET_CHUYEN_NGANH":
			return { ...state, khoa: action?.payload };
		case "SET_PROFILE_PIC":
			return { ...state, profilePic: action?.payload };
		case "SET_PROFILE_PIC_UPLOADED":
			return { ...state, profilePicUploaded: action?.payload };
		default:
			return state;
	}
}

function UpdateInformation() {
	const { appContext, userData, updateUserData } = useAppContext();
	const [state, dispatch] = useReducer(reducer, initialState);
	const [cropVisible, setCropVisible] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [isFectData, setIsFectData] = useState(false);
	const [isAsync, setIsAsync] = useState(true);
	const profileRef = useRef(null);
	const [profileSize, setProfileSize] = useState({ width: 0, height: 0 });

	const handleProfilePicChange = async (e) => {
		if (e.target.files && e.target.files[0]) {
			const myIMG = new IMG(e.target.files[0]);
			await myIMG.readFilePromise;
			Cookies.remove("CropImage-state--crop");
			dispatch({ type: "SET_PROFILE_PIC", payload: myIMG.IMGDataUrl });
			dispatch({ type: "SET_PROFILE_PIC_UPLOADED", payload: myIMG.IMGDataUrl });
			setCropVisible(true);
		}
	};

	const handleProfileCsvChange = async (e) => {
		if (e.target.files && e.target.files[0]) {
			const myCSV = new CSV(e.target.files[0]);
			await myCSV.readFilePromise;
			const data = myCSV.readSingleUserData();

			dispatch({ type: "SET_NAME", payload: data[0] });
			dispatch({ type: "SET_CHUYEN_NGANH", payload: data[1] });
			dispatch({ type: "SET_CLASS_NAME", payload: data[2] });
			dispatch({ type: "SET_PROFILE_PIC", payload: data[3] });
		}
	};

	const handleCropPicture = (base64Src) => {
		if (base64Src) {
			dispatch({ type: "SET_PROFILE_PIC", payload: base64Src });
		}
	};

	const handleUploadData = async () => {
		const curData = {
			name: state?.name,
			className: state?.className,
			khoa: state?.khoa,
			profilePic: state?.profilePic,
		};

		setIsUploading(true);
		try {
			const UID = auth.currentUser.uid;
			const docRef = await setDoc(doc(db, "userInformation", UID), curData);
			updateUserData(curData);
			setIsAsync(true);
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
		const { name, className, khoa, profilePic } = JSON.parse(localStorage.getItem("UpdateInformation-state--state") || "{}");

		if (!(name || className || khoa || profilePic)) {
			dispatch({ type: "SET_NAME", payload: userData?.name || "" });
			dispatch({ type: "SET_CLASS_NAME", payload: userData?.className || "" });
			dispatch({ type: "SET_CHUYEN_NGANH", payload: userData?.khoa || "" });
			dispatch({ type: "SET_PROFILE_PIC", payload: userData?.profilePic || null });
			dispatch({ type: "SET_PROFILE_PIC_UPLOADED", payload: userData?.profilePic || null });
		} else {
			dispatch({ type: "SET_NAME", payload: name });
			dispatch({ type: "SET_CLASS_NAME", payload: className });
			dispatch({ type: "SET_CHUYEN_NGANH", payload: khoa });
			dispatch({ type: "SET_PROFILE_PIC", payload: profilePic });
			dispatch({ type: "SET_PROFILE_PIC_UPLOADED", payload: profilePic });
		}
	};

	// ASYNC TỪ COOKIE
	useLayoutEffect(() => {
		handleAsyncData();
		setIsFectData(true);
	}, [userData]);

	// BACKUP VÀO COOKIE (1 min)
	useEffect(() => {
		const isDataChanged = (state, userData) => {
			if (
				state.name?.trim() !== (userData?.name ?? "").trim() ||
				state.className?.trim() !== (userData?.className ?? "").trim() ||
				state.khoa?.trim() !== (userData?.khoa ?? "").trim() ||
				state.profilePic !== (userData?.profilePic ?? null)
			) {
				return true;
			}

			setIsAsync(true);
			return false;
		};

		if (isDataChanged(state, userData) && isFectData) {
			setIsAsync(false);
			const { profilePicUploaded, ...newState } = state;
			localStorage.setItem("UpdateInformation-state--state", JSON.stringify(newState));
		}
	}, [state]);

	useLayoutEffect(() => {
		if (profileRef.current) {
			const { offsetWidth, offsetHeight } = profileRef.current;
			setProfileSize({ width: offsetWidth, height: offsetHeight });
		}
	}, [profileRef.current]);

	return (
		<>
			{cropVisible ? (
				<CropImage
					src={state?.profilePicUploaded}
					fixedWidth={Math.min(Math.max(170, appContext?.screenW * (5 / 28)), 250)}
					setStorage={handleCropPicture}
					visible={cropVisible}
					setVisible={setCropVisible}
				/>
			) : (
				<div className="update-information">
					<div className="update-information__part update-information__form">
						<form action="">
							<InputField
								title="Họ và tên"
								type="text"
								id="user-name"
								name="name"
								placeholder="Nhập tên của bạn"
								value={state?.name}
								onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
							/>
							<InputSelectField
								title="Chuyên ngành"
								id="user-khoa"
								Faicon={faCaretDown}
								listOptions={listChuyenNganhOptions}
								placeholder="Nhập chuyên ngành"
								defaultValue={state?.khoa}
								handleSetData={(value) => dispatch({ type: "SET_CHUYEN_NGANH", payload: value })}
							/>
							<InputSelectField
								title="Lớp"
								id="user-className"
								Faicon={faCaretDown}
								listOptions={listLopOptions}
								placeholder="Nhập lớp"
								defaultValue={state?.className}
								handleSetData={(value) => dispatch({ type: "SET_CLASS_NAME", payload: value })}
							/>
							<InputFileField
								id="user-profile-pic"
								title="Chọn ảnh đại diện"
								customAccept="image/png, image/jpg, image/jpeg"
								handle={handleProfilePicChange}
							/>
							<span className="update-information__form__breakLine">------ Hoặc ------</span>

							<InputFileField
								id="user-profile-csv"
								title="Nhập file CSV"
								customAccept=".csv, .xlsx"
								handle={handleProfileCsvChange}
							/>
						</form>
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

export default UpdateInformation;
