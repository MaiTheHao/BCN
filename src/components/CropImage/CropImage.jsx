import React, { useRef, useState } from "react";
import "./main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";

function CropImage({ src, fixedWidth, setStorage, visible = false, setVisible }) {
	const [crop, setCrop] = useState(null);
	const [result, setResult] = useState(null);
	const imgRef = useRef(null);

	const handleSubmit = () => {
		if (result) {
			try {
				setStorage(result);
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
	}

	const handleCrop = () => {
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

		const base64Image = canvas.toDataURL("image/png");
		setResult(base64Image);
	};

	return (
		visible && (
			<div className="comp-cropImage">
				<div className="comp-cropImage__block">
					<h1>
						chỉnh sửa ảnh <FontAwesomeIcon icon={faCropSimple} />
					</h1>
					<p>Hãy đưa con trỏ chuột vào kéo để chọn vùng cần cắt. Kéo các góc để thay đổi tỉ lệ.</p>
					<ReactCrop
						className="comp-cropImage__block__crop"
						aspect={11 / 16}
						crop={crop}
						onChange={(changedCrop) => {
							setCrop(changedCrop);
						}}
					>
						<img ref={imgRef} src={src} alt="Ảnh đầu vào" style={{ maxWidth: "90vw", maxHeight: "70vh" }} />
					</ReactCrop>
					<button onClick={() => handleCrop()}>Xác nhận</button>
					<div className="comp-cropImage__block__result">
						<h2>
							Kết quả <FontAwesomeIcon icon={faImage} />
						</h2>
						{result && <img src={result} alt="Ảnh đã cắt" />}
					</div>
					<div className="comp-cropImage__block__btns">
						<button onClick={() => handleExit()}>Hủy</button>
						<button onClick={() => handleSubmit()}>Chọn ảnh</button>
					</div>
				</div>
			</div>
		)
	);
}

export default CropImage;