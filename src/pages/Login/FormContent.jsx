import { Link } from "react-router-dom";
import FormBtns from "./components/FormBtns";

const FormContent = ({ crrPage, changePage, handleFormSubmit, children }) => {
	return (
		<form onSubmit={handleFormSubmit}>
			<h2>{crrPage === "signup" ? "Đăng ký" : "Đăng nhập"}</h2>
			{children}
			<FormBtns
				mainActionName={crrPage === "signup" ? "Đăng ký" : "Đăng nhập"}
				otherActionName={crrPage === "signup" ? "Đã có tài khoản ?" : "Chưa có tài khoản ?"}
				otherActionOnClick={changePage}
			/>
			<div className="advancedOptions">
				<Link to={"/forgot-password"} className="advancedOptions__element" id="forgotPassword">
					Quên mật khẩu?
				</Link>
			</div>
		</form>
	);
};

export default FormContent;