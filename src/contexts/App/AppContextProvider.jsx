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
    // Khởi tạo state appContext với kích thước màn hình hiện tại
    const [appContext, setAppContext] = useState({ ...initAppContext, screenW: window.innerWidth, screenH: window.innerHeight });
    // Khởi tạo state crrPage từ cookie hoặc giá trị mặc định
    const [crrPage, setCrrPage] = useState(Cookies.get("web-current-page") || "xuat-thong-tin");
    // Khởi tạo state userData
    const [userData, setUserData] = useState({});
    // Khởi tạo state userRole
    const [userRole, setUserRole] = useState("");

    // Hàm cập nhật thông tin xác thực
    const handleSetAuth = (_isAuth, _isLogged, _user) => {
        setAppContext({
            ...appContext,
            isAuth: _isAuth ?? appContext.isAuth,
            isLogged: _isLogged ?? appContext.isLogged,
            user: _user ?? appContext.user,
        });
    };

    // Hàm cập nhật trang hiện tại và lưu vào cookie
    const handleSetCrrPage = (_crrPage, preventCookie = false) => {
        setCrrPage(_crrPage);
        if (preventCookie) return;
        Cookies.set("web-current-page", _crrPage, { expires: (5 / 1440) });
    };

    // Hàm cập nhật dữ liệu người dùng
    const updateUserData = (newData) => {
        setUserData((prevData) => ({
            ...prevData,
            ...newData,
        }));
    };

    // Giá trị provider được cung cấp cho các component con
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
        // Hàm lấy dữ liệu người dùng từ Firestore
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

        // Gọi hàm fetchUserData khi component mount
        fetchUserData();
    }, [auth.currentUser]);

	useEffect(() => {
		const handleResize = () => {
			// Hàm này cập nhật kích thước màn hình vào appContext khi cửa sổ thay đổi kích thước
			setAppContext({
				...appContext,
				screenW: window.innerWidth,
				screenH: window.innerHeight,
			});
		};

		// Thêm sự kiện lắng nghe thay đổi kích thước cửa sổ
		window.addEventListener("resize", handleResize);

		// Hàm cleanup để loại bỏ sự kiện lắng nghe khi component bị unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, [appContext]);

	// Trả về AppContext.Provider với giá trị providerValues và children
	return <AppContext.Provider value={providerValues}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
