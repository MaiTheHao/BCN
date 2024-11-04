import React, { useState, useRef, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import useAppContext from "../../contexts/App/useAppContext";
import Swal from "sweetalert2";
import "./main.scss";

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

function ExportPic() {
	const {userData} = useAppContext();
	const name = userData?.name || "...",
		className = userData?.className || "Không",
		khoa = userData?.khoa || "Không",
		profilePic = userData?.profilePic || null;

	const formRef = useRef(null);

	useEffect(() => {
		if (!name && !className && !khoa && !profilePic) {
			Swal.fire({
				icon: "warning",
				title: "Thông báo",
				text: "Bạn chưa cập nhật thông tin cá nhân, hãy cập nhật.",
			});
		}
	}, [name, className, khoa, profilePic]);

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

	return (
		<div className="export-pic">
			<h1>Thông tin của bạn</h1>
			<InfoPreview ref={formRef} name={name} className={className} khoa={khoa} profilePic={profilePic} />
			<button onClick={handleDownload}>Tải ảnh về máy</button>
		</div>
	);
}

export default ExportPic;
