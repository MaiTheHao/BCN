import React, { useState, useRef } from "react";
import * as htmlToImage from "html-to-image";
import { db, auth } from "../../FB/db";
import "./main.scss";
import Swal from "sweetalert2";
import { doc, setDoc } from "firebase/firestore";
import useAppContext from "../../contexts/App/useAppContext";

const InputField = ({ label, value, onChange }) => (
	<div>
		<label>
			{label}:
			<input type="text" value={value} onChange={onChange} />
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

const InfoPreview = React.forwardRef(({ name, className, khoa, profilePic }, ref) => (
	<div className="info-preview small-preview" ref={ref}>
		<div className="info-preview-top">
			<p>BỘ CÔNG THƯƠNG</p>
			<h2>TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH</h2>
			<h1>SINH VIÊN</h1>
		</div>
		<div className="info-preview-body">
			<div className="info-preview-body__profilePic">{profilePic && <img src={profilePic} alt="Profile" />}</div>
			<div className="info-preview-body__details">
				<p className="name">{name}</p>
				<p className="class">
					Lớp: <strong>{className}</strong>
				</p>
				<p className="chuyennganh">
					Chuyên ngành: <strong>{khoa}</strong>
				</p>
			</div>
		</div>
	</div>
));

function UndateInformation() {
	const { userData, updateUserData } = useAppContext();
	const [name, setName] = useState(userData?.name || "");
	const [className, setClassName] = useState(userData?.class || "");
	const [khoa, setKhoa] = useState(userData?.khoa || "");
	const [profilePic, setProfilePic] = useState(userData?.profilePic || null);
	const [profilePicBase64, setProfilePicBase64] = useState(null);
	const formRef = useRef(null);

	const handleDownload = async () => {
		if (formRef.current === null) {
			return;
		}

		try {
			const res = await htmlToImage.toPng(formRef.current);
			const link = document.createElement("a");
			link.download = "infoForm.png";
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
			name,
			className,
			khoa,
			profilePic: profilePicBase64,
		};

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
			console.log(error);

			Swal.fire({
				icon: "error",
				title: "Lỗi!",
				text: "Đã có lỗi xảy ra khi lưu thông tin",
			});
		}
	};

	const handleProfilePicChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setProfilePicBase64(reader.result);
				setProfilePic(URL.createObjectURL(file));
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="update-information">
			<h1>Cập nhật thông tin</h1>
			<form ref={formRef} className="info-form">
				<InputField label="Họ tên" value={name} onChange={(e) => setName(e.target.value)} />
				<InputField label="Lớp" value={className} onChange={(e) => setClassName(e.target.value)} />
				<InputField label="Chuyên ngành" value={khoa} onChange={(e) => setKhoa(e.target.value)} />
				<ProfilePicUpload onChange={handleProfilePicChange} />
			</form>
			<InfoPreview ref={formRef} name={name} className={className} khoa={khoa} profilePic={profilePic} />
			<div className="info-form__buttons">
				<button onClick={handleUploadData}>Lưu thay đổi</button>
				<button onClick={handleDownload}>Tải ảnh về máy</button>
			</div>
		</div>
	);
}

export default UndateInformation;
