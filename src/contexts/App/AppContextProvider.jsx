import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";

const initAppContext = {
	isAuth: false,
	isLogged: false,
	user: undefined,
};

const AppContextProvider = ({ children }) => {
	const [appContext, setAppContext] = useState({ ...initAppContext, screenW: window.innerWidth, screenH: window.innerHeight });
	const [crrPage, setCrrPage] = useState('trang-chu');
	const handleSetAuth = (_isAuth, _isLogged, _user) => {
		setAppContext({
			...appContext,
			isAuth: _isAuth ?? appContext.isAuth,
			isLogged: _isLogged ?? appContext.isLogged,
			user: _user ?? appContext.user,
		});
	};

	const providerValues = {
		appContext,
		handleSetAuth,
	}

	useEffect(() => {
		const handleResize = () => {
			setAppContext({
				...appContext,
				screenW: window.innerWidth,
				screenH: window.innerHeight,
			});
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [appContext]);

	return <AppContext.Provider value={providerValues}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
