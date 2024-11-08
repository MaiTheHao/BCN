import React, { useRef, useEffect } from "react";
import * as htmlToImage from "html-to-image";
import useAppContext from "../../contexts/App/useAppContext";
import Swal from "sweetalert2";
import "./main.scss";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";

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
			<ProfilePreview ref={formRef} name={name} className={className} khoa={khoa} profilePic={profilePic} draggable={false}/>
			<button onClick={handleDownload}>Tải ảnh về máy</button>
		</div>
	);
}

export default ExportPic;
