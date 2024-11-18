import React, { useRef, useEffect, useState } from "react";
import useAppContext from "../../contexts/App/useAppContext";
import Swal from "sweetalert2";
import "./ExportInformation.scss";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import handleDownloadProfilePic from "../../components/handle/DownloadProfilePic";
import { faCaretDown, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import handleDownloadProfileCSV from "../../components/handle/DownloadProfileCSV";

function ExportInformation() {
	const { userData } = useAppContext();
	const formRef = useRef(null);
	const downloadPicButtonRef = useRef(null);
	const downloadCsvButtonRef = useRef(null);
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

	const handleDownloadPic = async () => {
		downloadPicButtonRef.current.disabled = true;
		await handleDownloadProfilePic(formRef, `${name}-${khoa}-${khoa}`, exportFormat);
		downloadPicButtonRef.current.disabled = false;
	};

	const handleDownloadCsv = () => {
		downloadCsvButtonRef.current.disabled = true;
		handleDownloadProfileCSV(userData, `${name}-${khoa}-${khoa}`);
		downloadCsvButtonRef.current.disabled = false;
	};

	return (
		<div className="export-pic">
			<h1>Thông tin của bạn</h1>
			<ProfilePreview ref={formRef} name={name} className={className} khoa={khoa} profilePic={profilePic} />
			<div id="download-profile-buttons" className="export-pic__download">
				<div className="export-pic__download__content">
					<button
						ref={downloadPicButtonRef}
						className="export-pic__download__content__pic"
						onClick={handleDownloadPic}
						disabled={false}
					>
						<span>Tải ảnh về máy</span>
						<div></div>
					</button>
					<button
						ref={downloadCsvButtonRef}
						className="export-pic__download__content__csv"
						onClick={handleDownloadCsv}
						disabled={false}
					>
						<span>
							<FontAwesomeIcon icon={faFileCsv} />
						</span>
						<div></div>
					</button>
				</div>
			</div>
		</div>
	);
}

export default ExportInformation;
