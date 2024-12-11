import React, { useState } from "react";
import "./AdminPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp, faHandPointer, faList, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Statistics from "./pages/Statistics/Statistics";
import Draggable from "react-draggable";
import EditUser from "./pages/EditUser.jsx/EditUser";
import PrivateRoute from "../../routers/PrivateRoute";

const sidebarItems = [
	{
		title: "Danh sách thống kê người dùng",
		icon: faList,
		href: "statistics",
		Comp: Statistics,
	},
	{
		title: "Chỉnh sửa người dùng",
		icon: faPen,
		href: "edit",
		Comp: EditUser,
	},
];

function Tooltip({ text }) {
	return <span className="tooltip">{text}</span>;
}

function AdminPage() {
	const location = useLocation();
	const currentPath = location.pathname;
	const [sidebarMinimize, setSidebarMinimize] = useState(false);

	return (
		<div className="admin-page">
			<Draggable axis="both" handle="#dragHandle">
				<div className={`sidebar ${sidebarMinimize ? "sidebar--minimize" : ""}`}>
					<div className="sidebar-content">
						<button className="sidebar-action-item tooltip-container" id="dragHandle">
							<FontAwesomeIcon icon={faHandPointer} />
						</button>
						<ul>
							{sidebarItems.map((item, index) => (
								<Link
									key={index}
									to={`${item.href}`}
									className={`tooltip-container ${currentPath.includes(item.href) ? "active" : ""}`}
								>
									<FontAwesomeIcon icon={item.icon} />
									<Tooltip text={item.title} />
								</Link>
							))}
						</ul>
						<button
							className="sidebar-action-item tooltip-container"
							id="sidebar-resize"
							onClick={() => setSidebarMinimize(!sidebarMinimize)}
						>
							<FontAwesomeIcon icon={faAngleUp} />
							<Tooltip text={"Thu gọn"} />
						</button>
					</div>
				</div>
			</Draggable>
			<div className="content">
				<Routes>
					<Route element={<PrivateRoute />}>
						{sidebarItems.map(
							({ href, Comp }, index) => Comp && <Route key={index} path={`${href}`} element={<Comp />} />
						)}
					</Route>
					<Route path="*" element={<Navigate to="statistics" />} />
				</Routes>
			</div>
		</div>
	);
}

export default AdminPage;
