import React, { useRef, useEffect, useState } from "react";
import * as htmlToImage from "html-to-image";
import useAppContext from "../../contexts/App/useAppContext";
import Swal from "sweetalert2";
import "./main.scss";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import handleDownloadProfilePic from "../../components/handle/DownloadProfilePic";
import { faCaretDown, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import handleDownloadProfileCSV from "../../components/handle/DownloadProfileCSV";

function ExportInformation() {
	const { userData } = useAppContext();
	const formRef = useRef(null);
	const [exportFormat, setExportFormat] = useState("png");

	const name = userData?.name || "...";
	const className = userData?.className || "Không";
	const khoa = userData?.khoa || "Không";
	const profilePic = userData?.profilePic || null;

	useEffect(() => {
		if (!name && !className && !khoa && !profilePic) {
			Swal.fire({
				icon: "warning",
				title: "Thông báo",
				text: "Bạn chưa cập nhật thông tin cá nhân, hãy cập nhật.",
			});
		}
	}, [name, className, khoa, profilePic]);

	return (
		<div className="export-pic">
			<h1>Thông tin của bạn</h1>
			<ProfilePreview ref={formRef} name={name} className={className} khoa={khoa} profilePic={profilePic} />
			<div id="download-profile-buttons" className="export-pic__download">
				<div className="export-pic__download__content">
					<button
						className="export-pic__download__content__pic"
						onClick={async () => await handleDownloadProfilePic(formRef, `${name}-${khoa}-${khoa}`, exportFormat)}
					>
						Tải ảnh về máy
					</button>
					<button
						className="export-pic__download__content__csv"
						onClick={() => handleDownloadProfileCSV(userData, `${name}-${khoa}-${khoa}`)}
					>
						<FontAwesomeIcon icon={faFileCsv} />
					</button>
				</div>
				<div className="select-container">
					<select className="select-box" value={exportFormat} onChange={(e) => setExportFormat(e.target.value)}>
						<option value="png">PNG</option>
						<option value="jpg">JPG</option>
					</select>
					<div className="select-icon">
						<FontAwesomeIcon icon={faCaretDown} />
					</div>
				</div>
			</div>
		</div>
	);
}

export default ExportInformation;
