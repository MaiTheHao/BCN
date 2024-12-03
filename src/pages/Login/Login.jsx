import React from "react";
import LoginContextProvider from "../../contexts/Login/LoginContextProvider";
import "./Login.scss";
import FormAuth from "./FormAuth";

function Login() {
	return (
		<LoginContextProvider>
			<div id="loginPage">
				<FormAuth/>
			</div>
		</LoginContextProvider>
	);
}

export default Login;
