import React, { useState } from "react";
import { LoginContext } from "./LoginContext";
import { validateSignin, validateSignup } from "../../pages/Login/components/validateInput";
import Swal from "sweetalert2";
import { signIn, signUp } from "../../FB/handleLoginAction";
import useAppContext from "../App/useAppContext";

const LoginContextProvider = ({ children }) => {
	const { handleSetAuth } = useAppContext();
	const [crrPage, setCrrPage] = useState("signin");
	const [inputValue, setInputValue] = useState({});
	const [errors, setErrors] = useState({});
	const handleInputChange = (e) => {
		setInputValue({ ...inputValue, [e.target.name]: e.target.value });
	};

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = crrPage === "signin" ? validateSignin(inputValue) : validateSignup(inputValue);

		if (Object.keys(validationErrors).length === 0) {
			setErrors({});
			let res =
				crrPage === "signin"
					? await signIn(inputValue.email, inputValue.password)
					: await signUp(inputValue.email, inputValue.password);
			if (res !== undefined) {
				if (crrPage === "signin") {
					Swal.fire({
						icon: "success",
						title: "Đăng nhập thành công",
						text: "Chào mừng bạn trở lại",
					});
					handleSetAuth(true, true, res);
				} else {
					Swal.fire({
						icon: "success",
						title: "Đăng ký thành công",
						text: "Vui lòng kiểm tra email và xác thực tài khoản",
					});
				}
			}
		} else {
			setErrors(validationErrors);
		}
	};

	const changePage = () => {
		setCrrPage(crrPage === "signin" ? "signup" : "signin");
		setInputValue({});
		setErrors({});
	};

	return (
		<LoginContext.Provider value={{ crrPage, changePage, handleInputChange, handleFormSubmit, errors, inputValue }}>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginContextProvider;
