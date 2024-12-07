import React, { useLayoutEffect, useState } from "react";
import { auth } from "../../backend/configs/database";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../components/Loading/Loading";
import useAppContext from "../contexts/App/useAppContext";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login/Login";

const useAuthState = (handleSetAuth, setIsLoading) => {
	useLayoutEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {	
			setIsLoading(true);
			if (user && user?.emailVerified) {
				handleSetAuth(true, true, user);
			} else {
				handleSetAuth(undefined, undefined, undefined);
			}
			setIsLoading(false);
		})

		return () => unsubscribe();
	}, [])
}

function Auth() {
	const { appContext, handleSetAuth } = useAppContext();
	const [isLoading, setIsLoading] = useState(true);

	useAuthState(handleSetAuth, setIsLoading);

	return <>{isLoading ? <Loading /> : appContext.isLogged && appContext.isAuth ? <Outlet /> : <Login />}</>;
}

export default Auth;
