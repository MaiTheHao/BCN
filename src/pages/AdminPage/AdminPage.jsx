import React from "react";
import "./main.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Statistics from "./pages/Statistics";

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
	},
];

function Tooltip({ text }) {
	return <span className="tooltip">{text}</span>;
}

function AdminPage() {
	return (
		<div className="admin-page">
			<div className="sidebar">
				<div className="sidebar-content">
					<ul>
						{sidebarItems.map((item, index) => (
							<Link key={index} to={item?.href}>
								<FontAwesomeIcon icon={item.icon} />
								<Tooltip text={item.title} />
							</Link>
						))}
					</ul>
				</div>
			</div>
			<div className="content">
				<Routes>
					{sidebarItems.map(({ href, Comp }, index) => (
						Comp && <Route key={index} path={href} element={<Comp/>} />
					))}
				</Routes>
			</div>
		</div>
	);
}

export default AdminPage;
