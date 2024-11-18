import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import Cookies from "js-cookie";
import { db, auth } from "../../FB/db";
import { doc, getDoc } from "firebase/firestore";
import { getIdTokenResult } from "firebase/auth";

const initAppContext = {
	isAuth: false,
	isLogged: false,
	user: undefined,
};

const AppContextProvider = ({ children }) => {
	const [appContext, setAppContext] = useState({ ...initAppContext, screenW: window.innerWidth, screenH: window.innerHeight });
	const [crrPage, setCrrPage] = useState(Cookies.get("crrPage") || "xuat-anh");
	const [userData, setUserData] = useState({});
	const [userRole, setUserRole] = useState("");

	const handleSetAuth = (_isAuth, _isLogged, _user) => {
		setAppContext({
			...appContext,
			isAuth: _isAuth ?? appContext.isAuth,
			isLogged: _isLogged ?? appContext.isLogged,
			user: _user ?? appContext.user,
		});
	};

	const handleSetCrrPage = (_crrPage, preventCookie = false) => {
		setCrrPage(_crrPage);

		if (preventCookie) return;
		Cookies.set("crrPage", _crrPage, { expires: (60 / 86400) });
	};

	const updateUserData = (newData) => {
		setUserData((prevData) => ({
			...prevData,
			...newData,
		}));
	};

	const providerValues = {
		appContext,
		handleSetAuth,
		crrPage,
		handleSetCrrPage,
		userData,
		userRole,
		updateUserData,
	};

	useEffect(() => {
		const fetchUserData = async () => {
			const user = auth.currentUser;
			if (user) {
				const UID = user.uid;
				const docRef = doc(db, "userInformation", UID);
				const res = await getDoc(docRef);
				if (res.exists()) {
					setUserData((prevData) => ({
						...prevData,
						...res.data(),
					}));
				}

				const idTokenResult = await getIdTokenResult(auth.currentUser);
				const userClaims = idTokenResult.claims;
				setUserRole(userClaims.role);
			}
		};

		fetchUserData();
	}, [auth.currentUser]);

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
