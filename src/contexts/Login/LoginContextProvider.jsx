import React, { useState } from "react";
import { LoginContext } from "./LoginContext";
import { validateSignin, validateSignup } from "../../pages/Login/components/validateInput";
import Swal from "sweetalert2";
import signIn from "../../services/auth/signIn";
import signUp from "../../services/auth/signUp";
import useAppContext from "../App/useAppContext";

/**
 * LoginContextProvider là một component cung cấp ngữ cảnh đăng nhập cho ứng dụng.
 * @param {Object} props - Các thuộc tính của component.
 * @param {React.ReactNode} props.children - Các component con sẽ được bao bọc bởi LoginContextProvider.
 * @returns {JSX.Element} - Trả về một phần tử JSX.
 */
const LoginContextProvider = ({ children }) => {
	const { handleSetAuth } = useAppContext();
	const [crrPage, setCrrPage] = useState("signin");
	const [inputValue, setInputValue] = useState({});
	const [isFetchAuth, setIsFetchAuth] = useState(false);
	const [errors, setErrors] = useState({});
	const handleInputChange = (e) => {
		setInputValue({ ...inputValue, [e.target.name]: e.target.value });
	};
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = crrPage === "signin" ? validateSignin(inputValue) : validateSignup(inputValue);

		if (Object.keys(validationErrors).length === 0) {
			setIsFetchAuth(true);
			setErrors({});
			let res =
				crrPage === "signin"
					? await signIn(inputValue.email, inputValue.password)
					: await signUp(inputValue.email, inputValue.password);
			if (res !== undefined) {
				if (crrPage === "signin") {
					handleSetAuth(true, true, res);
				} else {
					Swal.fire({
						icon: "success",
						title: "Đăng ký thành công",
						text: "Vui lòng kiểm tra email và xác thực tài khoản",
					});
					changePage();
				}
			}
		} else {
			setErrors(validationErrors);
		}
		setIsFetchAuth(false);
	};

	/**
	 * Thay đổi trang giữa đăng nhập và đăng ký.
	 */
	const changePage = (page = null) => {
		setCrrPage(page ? page : crrPage === "signin" ? "signup" : "signin");
		setInputValue({});
		setErrors({});
	};

	return (
		<LoginContext.Provider value={{ crrPage, changePage, handleInputChange, handleFormSubmit, errors, inputValue, isFetchAuth}}>
			{children}
		</LoginContext.Provider>
	);
};

export default LoginContextProvider;
