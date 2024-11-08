import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../../../FB/db";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProfilePreview from "../../../components/ProfilePreview/ProfilePreview";
import { toPng } from "html-to-image";

const fetchUsers = async () => {
	const res = await getDocs(collection(db, "userInformation"));
	return res.docs.map((doc) => ({ UID: doc.id, ...doc.data() }));
};

const exportAsCSV = (users) => {
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

function Statistics() {
	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState("name");
	const [users, setUsers] = useState([]);
	const [showMode, setShowMode] = useState("text");
	const statisticsContentRef = useRef(null);

	useEffect(() => {
		const loadUsers = async () => {
			const data = await fetchUsers();
			setUsers(data);
		};
		loadUsers();
	}, []);

	const filteredUsers = users.filter((user) => user[filter]?.toLowerCase().includes(searchTerm.toLowerCase()));

	const exportAsImage = async () => {
		if (statisticsContentRef.current === null) return;
		const dataUrl = await toPng(statisticsContentRef.current);
		const link = document.createElement("a");
		link.download = "statistics.png";
		link.href = dataUrl;
		link.click();
	};

	const toggleShowMode = () => {
		setShowMode((prevMode) => (prevMode === "text" ? "image" : "text"));
	};

	const handleExport = (type) => {
		if (type === "image") {
			exportAsImage();
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
						<option value="khoa">Khoa</option>
						<option value="className">Lớp</option>
					</select>
				</div>
			</div>
			<ul className="statistics-actions">
				<li>
					<button onClick={toggleShowMode}>
						{showMode === "text" ? "Xem Image" : "Xem Text"}
					</button>
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
			</ul>

			<div className={`statistics-content ${showMode	}`} ref={statisticsContentRef}>
				{showMode === "text" ? (
					<table>
						<thead>
							<tr>
								<th>UID</th>
								<th>Họ và Tên</th>
								<th>Khoa</th>
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
					filteredUsers.map((user) => (
						<ProfilePreview
							key={user.UID}
							name={user.name}
							className={user.className}
							khoa={user.khoa}
							profilePic={user.profilePic}
							draggable={false}
						/>
					))
				)}
			</div>
		</div>
	);
}

export default Statistics;
