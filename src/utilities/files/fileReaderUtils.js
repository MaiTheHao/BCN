export function readFileAsDataURL(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = () => reject("Đã có lỗi xảy ra khi tải ảnh!");
		reader.readAsDataURL(file);
	});
}

export function readFileAsText(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(reader.result);
		reader.onerror = () => reject("Đã có lỗi xảy ra khi tải file!");
		reader.readAsText(file);
	});
}