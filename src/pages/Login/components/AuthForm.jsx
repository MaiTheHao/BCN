import React from "react";
import useLoginContext from "../../../contexts/Login/useLoginContext";
import { faAt, faLock, faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import FormInput from "./FormInput";
import FormBtns from "./FormBtns";

function AuthForm() {
	const { crrPage, changePage, handleInputChange, handleFormSubmit, errors, inputValue } = useLoginContext();

	const signupInputs = [
		{
			icon: faShieldHalved,
			type: "password",
			name: "checkpassword",
			placeholder: "Check password",
			error: errors.checkpassword,
		},
	];

	const baseInputs = [
		{
			icon: faAt,
			type: "text",
			name: "email",
			placeholder: "Email",
			error: errors.email,
		},
		{
			icon: faLock,
			type: "password",
			name: "password",
			placeholder: "Password",
			error: errors.password,
		},
	];

	const renderInputs = (inputs) =>
		inputs.map((input, index) => (
			<React.Fragment key={index}>
				<FormInput
					icon={input.icon}
					type={input.type}
					name={input.name}
					placeholder={input.placeholder}
					onChange={handleInputChange}
                    inputValue={inputValue[input?.name]}
				/>
				{input.error && <p className="inputs-error">{input.error}</p>}
			</React.Fragment>
		));

	const renderForm = () => (
		<form onSubmit={handleFormSubmit}>
			<h2>{crrPage === "signup" ? "Đăng ký" : "Đăng nhập"}</h2>
			<div className="inputs">
				{renderInputs(baseInputs)}
				{crrPage === "signup" && renderInputs(signupInputs)}
			</div>
			<FormBtns
				mainActionName={crrPage === "signup" ? "Đăng ký" : "Đăng nhập"}
				otherActionName={crrPage === "signup" ? "Đăng nhập" : "Đăng ký"}
				otherActionOnClick={changePage}
			/>
		</form>
	);

	return <>{(crrPage === "signup" || crrPage === "signin") && renderForm()}</>;
}

export default AuthForm;
