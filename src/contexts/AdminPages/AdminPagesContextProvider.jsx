import React, { useState } from "react";
import AdminPagesContext from "./AdminPagesContext";

function AdminPagesContextProvider({ children }) {
	const [currentUID, setCurrentUID] = useState(atob(localStorage.getItem("AdminPages-state--currentUID")) || "");

	const handleSetCurrentUID = (UID) => {
		localStorage.setItem("AdminPages-state--currentUID", btoa(UID));
		setCurrentUID(UID);
	}
		
	const value = { currentUID, handleSetCurrentUID };
	return <AdminPagesContext.Provider value={value}>{children}</AdminPagesContext.Provider>;
}

export default AdminPagesContextProvider;
