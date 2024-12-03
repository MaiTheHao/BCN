import Cookies from "js-cookie";

const handleResetBackup = () => {
	localStorage.removeItem("UpdateInformation-state--state");
	Cookies.remove("userUpdatingData");
}

export { handleResetBackup };