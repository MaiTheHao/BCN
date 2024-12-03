import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./Layout.scss";
import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<>
			<Header className="webHeader webPart" />
			<main className="webBody webPart"><Outlet/></main>
			<Footer className="webFooter webPart" />
		</>
	);
}

export default Layout;
