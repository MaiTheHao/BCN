import React, { useEffect, useState } from "react";
import { auth } from "../FB/db";
import { onAuthStateChanged } from "firebase/auth";
import Loading from "../components/Loading/Loading";
import useAppContext from "../contexts/App/useAppContext";
import { Outlet } from "react-router-dom";
import Login from "../pages/Login/Login";

function Auth() {
	const { appContext, handleSetAuth } = useAppContext();
	const [isLoading, setIsLoading] = useState(true);
	const handleOnAuthStateChange = () => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setIsLoading(true);
			if (user && user?.emailVerified) {
				handleSetAuth(true, true, user);
				setIsLoading(false);
			} else {
				handleSetAuth(undefined, undefined, undefined);
				setIsLoading(false);
			}
		});
		return () => unsubscribe();
	};

	useEffect(() => {
		handleOnAuthStateChange();
	}, []);

	return <>{isLoading ? <Loading /> : appContext.isLogged && appContext.isAuth ? <Outlet /> : <Login />}</>;
}

export default Auth;
