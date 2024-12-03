import { Link } from "react-router-dom";
import FormBtns from "./components/FormBtns";
import FormForgotPassword from "./FormFotgotPassword";

const FormContent = ({ crrPage, changePage, handleFormSubmit, children }) => {
	return (
		<>
			{crrPage === "forgot-password" ? (
				<FormForgotPassword changePage = {changePage}/>
			) : (
				<form onSubmit={handleFormSubmit}>
					<h2>{crrPage === "signup" ? "Đăng ký" : "Đăng nhập"}</h2>
					{children}
					<FormBtns
						mainActionName={crrPage === "signup" ? "Đăng ký" : "Đăng nhập"}
						otherActionName={crrPage === "signup" ? "Đã có tài khoản ?" : "Chưa có tài khoản ?"}
						otherActionOnClick={changePage}
					/>
					<div className="advancedOptions">
						<Link
							onClick={() => changePage("forgot-password")}
							className="advancedOptions__element"
							id="forgotPassword"
						>
							Quên mật khẩu?
						</Link>
					</div>
				</form>
			)}
		</>
	);
};

export default FormContent;
