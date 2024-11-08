import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./main.scss";
import { getIdTokenResult } from "firebase/auth";
import { auth } from "../../FB/db";
import { Navigate } from "react-router-dom";
import useAppContext from "../../contexts/App/useAppContext";

function LayoutAdmin({ children }) {
	const { userRole } = useAppContext();
	const [ccRole, setCrrRole] = useState("");
	const [isLoad, setIsLoad] = useState(true);

	const fetchUserRole = async () => {
		setIsLoad(true);
		const idTokenResult = await getIdTokenResult(auth.currentUser);
		const userClaims = idTokenResult.claims;
		setCrrRole(userClaims.role);
		setIsLoad(false);
	};

	useEffect(() => {
		fetchUserRole();
	}, []);

	return !isLoad ? (
		userRole === "admin" && ccRole === "admin" ? (
			<div>
				<Header className="webHeader webPart adminLayout" />
				<main className="webBody webPart adminLayout">{children}</main>
				<Footer className="webFooter webPart adminLayout" />
			</div>
		) : (
			<Navigate to="/xuat-anh" replace />
		)
	) : null;
}

export default LayoutAdmin;
