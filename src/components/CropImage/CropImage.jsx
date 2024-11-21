import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
function CropImage({ src, fixedWidth, setStorage, visible = false, setVisible }) {
	const [crop, setCrop] = useState();
	const imgRef = useRef(null);

	const getCroppedImage = () => {
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
		Cookies.set("CropImage-state--crop", JSON.stringify(crop), { expires: 1 / 1440 });
		const base64Image = getCroppedImage();

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

	const handleImageLoad = (e) => {
		console.log("loaded");
		
		if (crop) return; 
		console.log("loaded CROP");
		
		const { width, height } = e.target;
		const widthGreater = width > height,
			minSize = Math.min(width, height),
			initialWidth = widthGreater ? minSize * (11 / 16) : minSize,
			initialHeight = widthGreater ? minSize : minSize * (16 / 11),
			initialCrop = {
				x: widthGreater ? (width - initialWidth) / 2 : 0,
				y: widthGreater ? 0 : (height - initialHeight) / 2,
				width: initialWidth,
				height: initialHeight,
				unit: "px",
			};

		setCrop(initialCrop);
	};

	useLayoutEffect(() => {
		const cookie = Cookies.get("CropImage-state--crop");
		if (cookie) {
			console.log(cookie);
			setCrop(JSON.parse(cookie));
		}
	}, []);

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
						onChange={(changedCrop) => {
							setCrop(changedCrop);
						}}
					>
						<img src={src} alt="Ảnh đầu vào" style={{ maxWidth: "90vw", maxHeight: "70vh" }} onLoad={handleImageLoad} ref={imgRef} />
					</ReactCrop>
					<div className="comp-cropImage__block__btns">
						<button onClick={handleSubmit}>Cắt ảnh</button>
					</div>
				</div>
			</div>
		)
	);
}

export default CropImage;
