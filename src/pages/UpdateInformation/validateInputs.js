import Swal from "sweetalert2";

export const validateUpdateInformation = (values) => {
	let errors = {};

	if (!values.name) {
		errors.name = "Họ tên là bắt buộc";
	}

	if (!values.className) {
		errors.className = "Lớp là bắt buộc";
	}

	if (!values.khoa) {
		errors.khoa = "Chuyên ngành là bắt buộc";
	}

	return errors;
};
