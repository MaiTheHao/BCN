import Swal from "sweetalert2";
/*
	-Họ và tên
	-Chuyên ngành
	-Khóa
	-Lớp
	-Lớp danh nghia
	-Profile pic base64
*/
class CSV {
	constructor(file) {
		this.file = file;
		this.listUserData = [];
		this.readFilePromise = this.readFileCSV()
			.then((data) => (this.listUserData = data))
			.catch((err) => Swal.fire({ icon: "error", title: "Lỗi!", text: err }));
	}
	readFileCSV() {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result.split("\n").slice(1));
			reader.onerror = () => reject("Đã có lỗi xảy ra khi tải file!");
			reader.readAsText(this.file);
		});
	}

	parserUserData(line) {
		let data = line.split(",", 5);
		data.push(line.slice(line.indexOf("data:image/")));
		return data;
	}

	readSingleUserData(index = 0) {
		return this.parserUserData(this.listUserData[index]);
	}

	readMultiUserData() {
		return this.listUserData.map((line) => this.parserUserData(line));
	}
}

export default CSV;
