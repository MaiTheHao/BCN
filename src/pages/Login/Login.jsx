import React from "react";
import LoginContextProvider from "../../contexts/Login/LoginContextProvider";
import "./Login.scss";
import AuthForm from "./components/AuthForm";

function Login() {
	return (
		<LoginContextProvider>
			<div id="loginPage">
				<AuthForm/>
			</div>
		</LoginContextProvider>
	);
}

export default Login;
