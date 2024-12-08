import React, { useState, useEffect, useLayoutEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../../backend/configs/database";
import EditUserForm from "../../../../components/EditUserForm/EditUserForm";
import { Link } from "react-router-dom";
import useAdminPagesContext from "../../../../contexts/AdminPages/useAdminPagesContext";

// Cần giải quyết vấn đề fetch khi cần thiết, vì có lưu trữ local storage
function EditUser() {
	const {currentUID} = useAdminPagesContext();
	const [data, setData] = useState({UID: currentUID, userData: null});

	useLayoutEffect(() => {
		const fetchUserData = async () => {			
			const userDoc = doc(db, "userInformation", currentUID);
			const userSnap = await getDoc(userDoc);
			if (userSnap.exists()) {
				setData({UID: currentUID, userData: userSnap.data()});
			} else {
				setData({UID: currentUID, userData: null});
			}
		}
		fetchUserData();
	}, [currentUID]);	
	return <div className="content-page edit-user">
		<h1>CHỈNH SỬA THÔNG TIN NGƯỜI DÙNG</h1>
		{!data?.UID && <div className="error">Không tìm thấy người dùng, hãy quay lại trang thống kê và nhấp vào người dùng cụ thể.<Link to={"statistics"}>Quay lại</Link></div>}
		<EditUserForm UID={data?.UID} userData={data?.userData} updateUserData={() => {}} isJustOne={false}/>;
	</div>
}

export default EditUser;
