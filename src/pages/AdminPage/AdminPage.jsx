import React from "react";
import "./AdminPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer, faList, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Statistics from "./pages/Statistics/Statistics";
import Draggable from "react-draggable";
import EditUser from "./pages/EditUser.jsx/EditUser";

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
	return (
		<div className="admin-page">
			<Draggable axis="y" handle="#dragHandle">
				<div className="sidebar">
					<div className="sidebar-content">
						<ul>
							<li id="dragHandle" style={{ cursor: "move" }}>
								<FontAwesomeIcon icon={faHandPointer} />
							</li>
							{sidebarItems.map((item, index) => (
								<Link key={index} to={item?.href}>
									<FontAwesomeIcon icon={item.icon} />
									<Tooltip text={item.title} />
								</Link>
							))}
						</ul>
					</div>
				</div>
			</Draggable>
			<div className="content">
				<Routes>
					{sidebarItems.map(({ href, Comp }, index) => Comp && <Route key={index} path={href} element={<Comp />} />)}
					<Route path="*" element={<Navigate to="statistics" />} />
				</Routes>
			</div>
		</div>
	);
}

export default AdminPage;
