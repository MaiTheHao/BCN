import Swal from "sweetalert2";
import { readFileAsDataURL } from "./fileReaderUtils";

class IMG {
	constructor(file) {
		this.file = file;
		this.IMGDataUrl;
		this.readFilePromise = readFileAsDataURL(this.file)
			.then((data) => (this.IMGDataUrl = data))
			.catch((err) => Swal.fire({ icon: "error", title: "Lỗi!", text: err }));
	}
}

export default IMG;