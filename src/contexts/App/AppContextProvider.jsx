import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import Cookies from "js-cookie";
import { db, auth } from "../../configs/db";
import { doc, getDoc } from "firebase/firestore";
import { getIdTokenResult } from "firebase/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const initAppContext = {
	isAuth: false,
	isLogged: false,
	user: undefined,
};

const AppContextProvider = ({ children }) => {
    const navigator = useNavigate();
    // Khởi tạo state appContext với kích thước màn hình hiện tại
    const [appContext, setAppContext] = useState({ ...initAppContext, screenW: window.innerWidth, screenH: window.innerHeight });
    // Khởi tạo state userData
    const [userData, setUserData] = useState(null);
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
                    const data = res.data();                    
                    setUserData((prevData) => ({
                        ...prevData,
                        ...data,
                    }));
                }
                else
                {
                    Swal.fire({
                        icon: "info",
                        title: 'Xin hãy cập nhật thông tin cá nhân',
                        confirmButtonText: 'OK'
                    })
                    navigator("cap-nhat-thong-tin")
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
