import { generateCSV } from "./csvUtils";

function handleDownloadProfileCSV(userData, fileName = "profile-csv") {
	const users = {
		Ho_va_Ten: userData?.name,
		Chuyen_nganh: userData?.chuyen_nganh,
		Lop_danh_nghia: userData?.className,
		khoa: userData?.khoa,
		lop: userData?.lop,
		Profile_pic: userData?.profilePic,
	};

	const csv = generateCSV([users]);
	const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.setAttribute("href", url);
	link.setAttribute("download", `${fileName}.csv`);
	link.click();
	URL.revokeObjectURL(url);
}

function handleDownloadProfileCSVs(listusers, fileName = "profile-csv") {
	const users = listusers.map((user) => ({
		Ho_va_Ten: user?.name,
		Chuyen_nganh: user?.chuyen_nganh,
		Lop_danh_nghia: user?.className,
		khoa: user?.khoa,
		lop: user?.lop,
		Profile_pic: user?.profilePic,
	}));

	const csv = generateCSV(users);
	const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.setAttribute("href", url);
	link.setAttribute("download", `${fileName}.csv`);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

export default handleDownloadProfileCSV;
export { handleDownloadProfileCSVs };