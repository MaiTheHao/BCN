import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.scss";
import { getIdTokenResult } from "firebase/auth";
import { auth } from "../../configs/db";
import { Navigate } from "react-router-dom";
import Loading from "../Loading/Loading";

function LayoutAdmin({ children }) {
	const [userRole, setUserRole] = useState("");
	const [isLoad, setIsLoad] = useState(true);

	const fetchUserRole = async () => {
		setIsLoad(true);
		const idTokenResult = await getIdTokenResult(auth.currentUser);
		const userClaims = idTokenResult.claims;
		setUserRole(userClaims.role);
		setIsLoad(false);
	};

	useEffect(() => {
		fetchUserRole();
	}, []);

	return !isLoad ? (
		userRole === "admin" ? (
			<div>
				<Header className="webHeader webPart adminLayout" />
				<main className="webBody webPart adminLayout">{children}</main>
				<Footer className="webFooter webPart adminLayout" />
			</div>
		) : (
			<Navigate to="/undefine-page" replace />
		)
	) : <Loading/>;
}

export default LayoutAdmin;
