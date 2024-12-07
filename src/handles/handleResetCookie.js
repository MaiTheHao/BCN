import Cookies from "js-cookie";

const handleResetCookie = (name) => {
	Cookies.remove(name);
}

export default handleResetCookie;