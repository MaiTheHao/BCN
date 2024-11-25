import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useMemo, useRef, useState, useReducer } from "react";
import { db } from "../../../../FB/db";
import { faFileCsv, faFileImage, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toPng } from "html-to-image";
import { handleDownloadProfileCSVs } from "../../../../components/handle/DownloadProfileCSV";
import PagnigationOptions from "./component/PagnigationOptions";
import TableMode from "./component/TableMode";
import ImgMode from "./component/ImgMode";
import "./Statistics.scss";

const pagnigationReducer = (state, action) => {
	switch (action.type) {
		case "NEXT_PAGE":
			if (state.page + 1 > state.maxPage) return state;
			return { ...state, page: state.page + 1 };
		case "PREV_PAGE":
			if (state.page - 1 < 1) return state;
			return { ...state, page: state.page - 1 };
		case "SET_PAGE":
			if (action.payload < 1 || action.payload > state.maxPage) return state;
			return { ...state, page: action.payload };
		case "SET_MAX_PER_PAGE":
			return { ...state, maxPerPage: action.payload };
		case "SET_LIMIT_PER_FETCH":
			return { ...state, limitPerFetch: action.payload };
		case "SET_REAL_TOTAL_USER":
			return { ...state, realTotalUser: action.payload, maxPage: Math.ceil(action.payload / state.maxPerPage) };
		default:
			return state;
	}
};


function Statistics() {
	const [pagnigation, dispatch] = useReducer(pagnigationReducer, {
		page: 1,
		maxPerPage: 15,
		limitPerFetch: 100,
		realTotalUser: 0,
		maxPage: 0,
	});

	const [users, setUsers] = useState([]);
	const [isLoadUser, setIsLoadUser] = useState(false);

	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState("name");

	const [showMode, setShowMode] = useState("text");

	const statisticsContentRef = useRef(null);
	const profileRefs = useRef([]);

	const fetchUsers = async () => {
		const querySnapshot = query(collection(db, "userInformation"), limit(pagnigation?.limitPerFetch), orderBy("name", "asc"));
		const res = await getDocs(querySnapshot);
		return res.docs.map((doc) => ({ ...doc.data() }));
	};

	const loadUsers = async (fetchUsersFunc, type) => {
		setIsLoadUser(true);
		const data = await fetchUsersFunc();
		if (type === "new") {
			setUsers(data);
			dispatch({ type: "SET_REAL_TOTAL_USER", payload: data.length });
		} else if (type === "add") {
			setUsers((prev) => [...prev, ...data]);
			dispatch({ type: "SET_REAL_TOTAL_USER", payload: data.length + users.length });
		}
		setIsLoadUser(false);
	};

	const filteredUsers = useMemo(() => {
		const raw_data = users.filter((user) => user[filter]?.toLowerCase().includes(searchTerm.toLowerCase()));
		const res = raw_data.slice((pagnigation.page - 1) * pagnigation.maxPerPage, pagnigation.page * pagnigation.maxPerPage);
		return res;
	}, [users, filter, searchTerm, pagnigation.page]);

	const handleExportTableAsImage = async () => {
		if (statisticsContentRef.current === null) return;
		const dataUrl = await toPng(statisticsContentRef.current);
		downloadImage(dataUrl, "statistics.png");
	};

	const handleExportPerProfileAsImage = async (user, index) => {
		const profileRef = profileRefs.current[index];
		if (profileRef === undefined) return;
		const dataUrl = await toPng(profileRef);
		downloadImage(dataUrl, `${user.name}-${user.khoa}-${user.className}.png`);
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

	const handleExportData = (type) => {
		if (type === "image") {
			if (showMode === "text") {
				handleExportTableAsImage();
			} else {
				handleExportAllProfilesAsImages();
			}
		} else if (type === "csv") {
			handleDownloadProfileCSVs(filteredUsers, `statistics-${Date.now()}-total_${filteredUsers.length}_users`);
		}
	};

	useEffect(() => {
		return () => (profileRefs.current = []);
	}, [users]);

	useEffect(() => {
		loadUsers(fetchUsers, "new");
	}, []);

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
					</select>
				</div>
			</div>
			<ul className="statistics-actions">
				<li>
					<button onClick={toggleShowMode}>{showMode === "text" ? "Xem ảnh" : "Xem văn bản"}</button>
				</li>
				<li>
					<div className="dropdown">
						<button className="dropbtn">Xuất File</button>
						<div className="dropdown-content">
							<a onClick={() => handleExportData("image")}>
								<FontAwesomeIcon icon={faFileImage} />
								Xuất ảnh
							</a>
							<a onClick={() => handleExportData("csv")}>
								<FontAwesomeIcon icon={faFileCsv} />
								Xuất csv
							</a>
						</div>
					</div>
				</li>
				<li>
					<button onClick={() => loadUsers(fetchUsers, "new")}>Reload</button>
				</li>
			</ul>
			{!isLoadUser ? (
				<div className={`statistics-content ${showMode}`} ref={statisticsContentRef}>
					{showMode === "text" ? (
						<TableMode filteredUsers = {filteredUsers}/>
					) : (
						<ImgMode filteredUsers = {filteredUsers} profileRefs={profileRefs}/>
					)}
				</div>
			) : (
				<div className="loading-spinner" />
			)}
			<PagnigationOptions pagnigation={pagnigation} pagnigationDispatch={dispatch} />
		</div>
	);
}

export default Statistics;
