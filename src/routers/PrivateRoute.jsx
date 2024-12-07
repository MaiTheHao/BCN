import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { getIdTokenResult } from "firebase/auth";
import { auth } from "../../backend/configs/database";

function PrivateRoute() {
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
	}, [auth]);

	return (
    <>
      {isLoad ? <Loading/> : userRole === "admin" ? <Outlet/> : <Navigate to="/unauthorized" replace />}
    </>
  )
}

export default React.memo(PrivateRoute);
