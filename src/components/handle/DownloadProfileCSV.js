function handleDownloadProfileCSV(
	{ UID = "", Ho_va_Ten = "", Khoa = "", Lop_danh_nghia = "", Profile_pic_base64 = "" },
	fileName = "profile-csv"
) {
	const users = {
		UID,
		Ho_va_Ten,
		Khoa,
		Lop_danh_nghia,
		Profile_pic_base64,
	};
	const headers = Object.keys(users).join(",");
	const rows = Object.values(users).join(",");
	const csv = `${headers}\n${rows}`;
	const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.setAttribute("href", url);
	link.setAttribute("download", `${fileName}.csv`);
	link.click();
	URL.revokeObjectURL(url);
}

function handleDownloadProfileCSVs(listusers, fileName = "profile-csv") {
	const users = listusers.map((user) => {
		const userData = {
			UID: user.UID,
			Ho_va_Ten: user.name,
			Khoa: user.khoa,
			Lop_danh_nghia: user.className,
			Profile_pic_base64: user.profilePic,
		};
        return userData;
	});

	const headers = Object.keys(users[0]).join(",");
	const rows = users.map((user) => Object.values(user).join(",")).join("\n");

	const csv = headers + "\n" + rows;
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
