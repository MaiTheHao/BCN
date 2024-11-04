import Swal from "sweetalert2";

export const validateSignup = (values) => {
	let errors = {};

	if (!values.email) {
		errors.email = "Email là bắt buộc";
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = "Địa chỉ email không hợp lệ";
	}

	if (values.password && values.checkpassword) {
		if (values.password !== values.checkpassword) {
			errors.checkpassword = "Mật khẩu không khớp";
			Swal.fire({
				icon: "error",
				title: "Sai mật khẩu xác nhận",
				text: "Mật khẩu không khớp",
			});
		}
	} else {
		if (!values.password) {
			errors.password = "Mật khẩu là bắt buộc";
		} else if (values.password.length < 6) {
			errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
		}

		if (!values.checkpassword) {
			errors.checkpassword = "Xác nhận mật khẩu là bắt buộc";
		}
	}

	return errors;
};

export const validateSignin = (values) => {
	let errors = {};

	if (!values.email) {
		errors.email = "Email là bắt buộc";
	} else if (!/\S+@\S+\.\S+/.test(values.email)) {
		errors.email = "Địa chỉ email không hợp lệ";
	}

	if (!values.password) {
		errors.password = "Mật khẩu là bắt buộc";
	}

	return errors;
};
