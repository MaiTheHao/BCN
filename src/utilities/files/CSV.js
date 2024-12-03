import Swal from "sweetalert2";
import { readFileAsText } from "./fileReaderUtils";

class CSV {
	constructor(file) {
		this.file = file;
		this.listUserData = [];
		this.readFilePromise = readFileAsText(this.file)
			.then((data) => (this.listUserData = data.split("\n").slice(1)))
			.catch((err) => Swal.fire({ icon: "error", title: "Lỗi!", text: err }));
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
