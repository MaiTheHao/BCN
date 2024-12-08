import React, { useEffect, useState } from "react";
import AdminPagesContext from "./AdminPagesContext";
import { loadFromLocalStorage, saveToLocalStorage } from "../../utilities/localStorage/localStorageActions";

const AdminPagesLocalStorage = {
	name: "AdminPages-state--currentUID",
}

function AdminPagesContextProvider({ children }) {
	const [currentUID, setCurrentUID] = useState();

	const handleSetCurrentUID = (UID) => {
		saveToLocalStorage(AdminPagesLocalStorage.name, btoa(UID));
		setCurrentUID(UID);
	}

	useEffect(() => {
		const currentUID = loadFromLocalStorage(AdminPagesLocalStorage.name);
		if(currentUID) {
			setCurrentUID(atob(currentUID));
		}
	}, [])
		
	const value = { currentUID, handleSetCurrentUID };
	return <AdminPagesContext.Provider value={value}>{children}</AdminPagesContext.Provider>;
}

export default AdminPagesContextProvider;
