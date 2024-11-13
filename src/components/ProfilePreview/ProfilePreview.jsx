import { forwardRef } from "react";
import "./ProfilePreview.scss";

const ProfilePreview = forwardRef(({ name, className, khoa, profilePic, onClickImg = null }, ref) => {
	return (
		<>
			<div className="info-preview small-preview" ref={ref}>
				<div className="info-preview-top">
					<p>BỘ CÔNG THƯƠNG</p>
					<h2>TRƯỜNG ĐẠI HỌC CÔNG NGHIỆP TP. HỒ CHÍ MINH</h2>
					<h1>SINH VIÊN</h1>
				</div>
				<div className="info-preview-body">
					<div
						className="info-preview-body__profilePic"
						onClick={onClickImg || null}
						style={{ cursor: onClickImg ? "pointer" : "" }}
					>
						{profilePic && <img src={profilePic} alt="Profile" />}
					</div>
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
		</>
	);
});

export default ProfilePreview;
