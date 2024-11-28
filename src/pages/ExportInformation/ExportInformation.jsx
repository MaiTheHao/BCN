import React, { useRef, useEffect, useState } from "react";
import useAppContext from "../../contexts/App/useAppContext";
import "./ExportInformation.scss";
import ProfilePreview from "../../components/ProfilePreview/ProfilePreview";
import handleDownloadProfilePic from "../../components/handle/DownloadProfilePic";
import { faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import handleDownloadProfileCSV from "../../components/handle/DownloadProfileCSV";

function ExportInformation() {
	const { userData } = useAppContext();
	const formRef = useRef(null);
	const downloadPicButtonRef = useRef(null);
	const downloadCsvButtonRef = useRef(null);

	const name = userData?.name;
	const className = userData?.className;
	const khoa = userData?.khoa;
	const lop = userData?.lop;
	const chuyen_nganh = userData?.chuyen_nganh;
	const profilePic = userData?.profilePic || null;

	const handleDownloadPic = async () => {
		downloadPicButtonRef.current.disabled = true;
		await handleDownloadProfilePic(formRef, `${name}-${chuyen_nganh}-${khoa}`);
		downloadPicButtonRef.current.disabled = false;
	};

	const handleDownloadCsv = () => {
		downloadCsvButtonRef.current.disabled = true;
		handleDownloadProfileCSV(userData, `${name}-${chuyen_nganh}-${khoa}`);
		downloadCsvButtonRef.current.disabled = false;
	};

	return (
		<div className="export-pic">
			<h1>Thông tin của bạn</h1>
			<ProfilePreview
				ref={formRef}
				name={name}
				className={className}
				khoa={khoa}
				lop={lop}
				chuyen_nganh={chuyen_nganh}
				profilePic={profilePic}
				width={"80vw"}
			/>
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
