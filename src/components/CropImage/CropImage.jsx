import React, { useRef, useState } from "react";
import "./main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Swal from "sweetalert2";

const initCrop = { x: (100 - 100 * 11 / 16) / 2, y: 0, width: 100 * 11 / 16, height: 100, unit: "%" };

function CropImage({ src, fixedWidth, setStorage, visible = false, setVisible }) {
	const [crop, setCrop] = useState(initCrop);
	const imgRef = useRef(null);

	const handleCropImage = () => {
		const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
		const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
		const scaleWidth = crop.width * scaleX;
		const scaleHeight = crop.height * scaleY;

		const canvas = document.createElement("canvas");
		const fixedHeight = fixedWidth * (16 / 11);
		canvas.width = fixedWidth;
		canvas.height = fixedHeight;
		const ctx = canvas.getContext("2d");

		ctx.drawImage(imgRef.current, crop.x * scaleX, crop.y * scaleY, scaleWidth, scaleHeight, 0, 0, fixedWidth, fixedHeight);

		return canvas.toDataURL("image/png");
	};

	const handleSubmit = () => {
		const base64Image = handleCropImage();

		if (base64Image) {
			try {
				setStorage(base64Image);
				setVisible(false);
				Swal.fire({
					title: "Thành công",
					text: "Ảnh đã được cắt thành công",
					icon: "success",
				});
			} catch (error) {
				console.log(error);
				Swal.fire({
					title: "Lỗi",
					text: "Không thể lưu ảnh",
					icon: "error",
				});
			}
		} else {
			Swal.fire({
				title: "Lỗi",
				text: "Vui lòng cắt ảnh trước khi xác nhận",
				icon: "error",
			});
		}
	};

	const handleExit = () => {
		setVisible(false);
	};

	return (
		visible && (
			<div className="comp-cropImage">
				<div className="comp-cropImage__block">
					<h1>
						chỉnh sửa ảnh <FontAwesomeIcon icon={faCropSimple} />
					</h1>
					<p>Hãy kéo để chọn vùng cần cắt. Kéo các góc để thay đổi tỉ lệ.</p>
					<ReactCrop
						className="comp-cropImage__block__crop"
						aspect={11 / 16}
						crop={crop}
						onChange={(changedCrop) => setCrop(changedCrop)}
					>
						<img ref={imgRef} src={src} alt="Ảnh đầu vào" style={{ maxWidth: "90vw", maxHeight: "70vh" }} />
					</ReactCrop>
					<div className="comp-cropImage__block__btns">
						<button onClick={handleExit}>Hủy</button>
						<button onClick={handleSubmit}>Cắt ảnh</button>
					</div>
				</div>
			</div>
		)
	);
}

export default CropImage;