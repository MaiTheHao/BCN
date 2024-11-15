import Swal from "sweetalert2";
class IMG {
	constructor(file) {
		this.file = file;
		this.IMGDataUrl;;
		this.readFilePromise = this.readFileIMG()
			.then((data) => (this.IMGDataUrl = data))
			.catch((err) => Swal.fire({ icon: "error", title: "Lỗi!", text: err }));
	}

	readFileIMG() {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = () => reject("Đã có lỗi xảy ra khi tải ảnh!");
			reader.readAsDataURL(this.file);
		});
	}
}

export default IMG;