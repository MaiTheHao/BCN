import React, { useReducer, useRef, useState, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import { db, auth } from "../../FB/db";
import "./main.scss";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import useAppContext from "../../contexts/App/useAppContext";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import CropImage from "../../components/CropImage/CropImage";
import validateInput from "./validateInput";
import CSV from "../../components/handle/CSV";
import IMG from "../../components/handle/IMG";

const InputField = ({ label, value, onChange, placeholder }) => (
	<div>
		<label>
			{label}:
			<input type="text" value={value} onChange={onChange} placeholder={placeholder} />
		</label>
	</div>
);

const ProfilePicUpload = ({ onChange }) => (
	<div>
		<label>
			Ảnh đại diện:
			<input type="file" accept="image/*" onChange={onChange} />
			<span className="custom-file-upload">Chọn ảnh</span>
		</label>
	</div>
);

const ProfileCsvUpload = ({ onChange }) => (
	<div>
		<label>
			Hoặc nhập file csv:
			<input type="file" accept=".csv" onChange={onChange} />
			<span className="custom-file-upload">Chọn file</span>
		</label>
	</div>
);

const SubmitButtons = ({handleUploadData, handleDownload}) => (
	<div className="info-form__buttons">
		<button onClick={handleUploadData}>Lưu thay đổi</button>
		<button onClick={handleDownload}>Tải ảnh về máy</button>
	</div>
);

const initialState = {
	name: "",
	className: "",
	khoa: "",
	profilePic: null,
	profilePicUploaded: null,
};

function reducer(state, action) {
	switch (action.type) {
		case "SET_NAME":
			return { ...state, name: action.payload };
		case "SET_CLASS_NAME":
			return { ...state, className: action.payload };
		case "SET_KHOA":
			return { ...state, khoa: action.payload };
		case "SET_PROFILE_PIC":
			return { ...state, profilePic: action.payload };
		case "SET_PROFILE_PIC_UPLOADED":
			return { ...state, profilePicUploaded: action.payload };
		default:
			return state;
	}
}

function UndateInformation() {
	const { appContext, userData, updateUserData } = useAppContext();
	const [state, dispatch] = useReducer(reducer, initialState);
	const [cropVisible, setCropVisible] = useState(false);
	const formRef = useRef(null);

	useEffect(() => {
		dispatch({ type: "SET_NAME", payload: userData?.name || "" });
		dispatch({ type: "SET_CLASS_NAME", payload: userData?.className || "" });
		dispatch({ type: "SET_KHOA", payload: userData?.khoa || "" });
		dispatch({ type: "SET_PROFILE_PIC", payload: userData?.profilePic || null });
		dispatch({ type: "SET_PROFILE_PIC_UPLOADED", payload: userData?.profilePic || null });
	}, [userData]);

	const handleDownload = async () => {
		if (formRef.current === null) {
			return;
		}

		try {
			const res = await htmlToImage.toPng(formRef.current);
			const link = document.createElement("a");
			link.download = `${userData.name}-${userData.khoa}-${userData.className}.png`;
			link.href = res;
			link.click();
			URL.revokeObjectURL(link.href);
		} catch (error) {
			Swal.fire({
				icon: "error",
				title: "Lỗi!",
				text: "Đã có lỗi xảy ra khi tải ảnh",
			});
		}
	};

	const handleUploadData = async () => {
		const data = {
			name: state?.name,
			className: state?.className,
			khoa: state?.khoa,
			profilePic: state?.profilePic,
		};

		if (validateInput(data)) {
			try {
				const UID = auth.currentUser.uid;
				const docRef = await setDoc(doc(db, "userInformation", UID), data);
				Swal.fire({
					icon: "success",
					title: "Thành công!",
					text: "Thông tin đã được lưu thành công",
				});
				updateUserData(data);
			} catch (error) {
				Swal.fire({
					icon: "error",
					title: "Lỗi!",
					text: "Đã có lỗi xảy ra khi lưu thông tin",
				});
			}
		}
	};

	const handleProfilePicChange = async (e) => {
		if (e.target.files && e.target.files[0]) {
			const myIMG = new IMG(e.target.files[0]);
			await myIMG.readFilePromise;
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

			dispatch({ type: "SET_NAME", payload: data[1] });
			dispatch({ type: "SET_KHOA", payload: data[2] });
			dispatch({ type: "SET_CLASS_NAME", payload: data[3] });
			dispatch({ type: "SET_PROFILE_PIC", payload: data[4] });
		}
	};

	const handleCropPicture = (base64Src) => {
		if (base64Src) {
			dispatch({ type: "SET_PROFILE_PIC", payload: base64Src });
		}
	};

	return (
		<>
			<CropImage
				src={state?.profilePicUploaded}
				fixedWidth={Math.min(Math.max(170, appContext?.screenW * (5 / 28)), 250)}
				setStorage={handleCropPicture}
				visible={cropVisible}
				setVisible={setCropVisible}
			/>
			{!cropVisible && (
				<div className="update-information">
					<h1>Cập nhật thông tin</h1>
					<form ref={formRef} className="info-form">
						<InputField
							label="Họ tên"
							value={state.name}
							onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
							placeholder="Nhập họ tên"
						/>
						<InputField
							label="Lớp"
							value={state.className}
							onChange={(e) => dispatch({ type: "SET_CLASS_NAME", payload: e.target.value })}
							placeholder="Nhập lớp"
						/>
						<InputField
							label="Chuyên ngành"
							value={state.khoa}
							onChange={(e) => dispatch({ type: "SET_KHOA", payload: e.target.value })}
							placeholder="Nhập chuyên ngành"
						/>
						<ProfilePicUpload onChange={handleProfilePicChange} />
						<ProfileCsvUpload onChange={handleProfileCsvChange} />
					</form>

					<ProfilePreview
						ref={formRef}
						name={state.name}
						className={state.className}
						khoa={state.khoa}
						profilePic={state.profilePic}
						onClickImg={() => setCropVisible(true)}
					/>

					<span id="update-information-note">Hãy nhấn vào ảnh để căn chỉnh lại</span>
					<SubmitButtons handleDownload={handleDownload} handleUploadData={handleUploadData}/>
				</div>
			)}
		</>
	);
}

export default UndateInformation;
