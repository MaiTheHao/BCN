import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { db } from "../../../FB/db";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePreview from "../../../components/ProfilePreview/ProfilePreview";
import { toPng } from "html-to-image";

const fetchUsers = async () => {
	const res = await getDocs(collection(db, "userInformation"));
	return res.docs.map((doc) => ({ UID: doc.id, ...doc.data() }));
};

const exportAsCSV = (inputData) => {
	const users = inputData.map((user) => ({
		UID: user.UID,
		Ho_va_Ten: user.name,
		Khoa: user.khoa,
		Lop_danh_nghia: user.className,
		Profile_pic_base64: user.profile,
	}));
	const headers = Object.keys(users[0]).join(",");
	const rows = users.map((user) => Object.values(user).join(",")).join("\n");
	const csv = headers + "\n" + rows;
	const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);
	link.setAttribute("href", url);
	link.setAttribute("download", "users.csv");
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};

const Statistics = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState("name");
	const [isLoadUser, setIsLoadUser] = useState(false);
	const [users, setUsers] = useState([]);
	const [showMode, setShowMode] = useState("text");
	const statisticsContentRef = useRef(null);
	const profileRefs = useRef([]);

	const loadUsers = async () => {
		setIsLoadUser(true);
		const data = await fetchUsers();
		setUsers(data);
		setIsLoadUser(false);
	};

	useEffect(() => {
		return () => (profileRefs.current = []);
	}, [users]);

	useEffect(() => {
		loadUsers();
	}, []);

	const filteredUsers = useMemo(() => {
		return users.filter((user) => user[filter]?.toLowerCase().includes(searchTerm.toLowerCase()));
	}, [users, filter, searchTerm]);

	const handleExportTableAsImage = async () => {
		if (statisticsContentRef.current === null) return;
		const dataUrl = await toPng(statisticsContentRef.current);
		downloadImage(dataUrl, "statistics.png");
	};

	const handleExportPerProfileAsImage = async (user, index) => {
		const profileRef = profileRefs.current[index];
		if (profileRef === undefined) return;
		const dataUrl = await toPng(profileRef);
		downloadImage(dataUrl, `${user.UID}-${user.name}-${user.khoa}-${user.className}.png`);
	};

	const handleExportAllProfilesAsImages = async () => {
		const promises = filteredUsers.map((user, index) => handleExportPerProfileAsImage(user, index));
		await Promise.all(promises);
	};

	const downloadImage = (dataUrl, filename) => {
		const link = document.createElement("a");
		link.download = filename;
		link.href = dataUrl;
		link.click();
		URL.revokeObjectURL(dataUrl);
	};

	const toggleShowMode = () => {
		setShowMode((prevMode) => (prevMode === "text" ? "image" : "text"));
	};

	const handleExport = (type) => {
		if (type === "image") {
			showMode === "text" ? handleExportTableAsImage() : handleExportAllProfilesAsImages();
		} else if (type === "csv") {
			exportAsCSV(filteredUsers);
		}
	};

	return (
		<div className="content-page statistics">
			<div className="statistics-search">
				<div className="statistics-search__input statistics-search-part">
					<FontAwesomeIcon icon={faMagnifyingGlass} />
					<input
						type="text"
						placeholder="Tìm kiếm người dùng..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="statistics-search__type statistics-search-part">
					<span>Mục tìm kiếm</span>
					<select value={filter} onChange={(e) => setFilter(e.target.value)}>
						<option value="name">Tên</option>
						<option value="khoa">Chuyên ngành</option>
						<option value="className">Lớp</option>
						<option value="UID">UID</option>
					</select>
				</div>
			</div>
			<ul className="statistics-actions">
				<li>
					<button onClick={toggleShowMode}>{showMode === "text" ? "Xem Image" : "Xem Text"}</button>
				</li>
				<li>
					<div className="dropdown">
						<button className="dropbtn">Xuất File</button>
						<div className="dropdown-content">
							<a onClick={() => handleExport("image")}>Xuất ảnh</a>
							<a onClick={() => handleExport("csv")}>Xuất csv</a>
						</div>
					</div>
				</li>
				<li>
					<button onClick={loadUsers}>Reload</button>
				</li>
			</ul>

			{!isLoadUser ? (
				<div className={`statistics-content ${showMode}`} ref={statisticsContentRef}>
					{showMode === "text" ? (
						<table>
							<thead>
								<tr>
									<th>UID</th>
									<th>Họ và Tên</th>
									<th>Chuyên ngành</th>
									<th>Lớp danh nghĩa</th>
								</tr>
							</thead>
							<tbody>
								{filteredUsers.map((user) => (
									<tr key={user.UID}>
										<td>{user.UID}</td>
										<td>{user.name}</td>
										<td>{user.khoa.toUpperCase()}</td>
										<td>{user.className}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						filteredUsers.map((user, index) => (
							<ProfilePreview
								key={user.UID}
								name={user.name}
								className={user.className}
								khoa={user.khoa}
								profilePic={user.profilePic}
								ref={(el) => (profileRefs.current[index] = el)}
							/>
						))
					)}
				</div>
			) : (
				<div className="loading-spinner"/>
			)}
		</div>
	);
};

export default Statistics;
