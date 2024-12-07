import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./BaseLayout.scss";
import { Outlet } from "react-router-dom";

function BaseLayout() {
	return (
		<>
			<Header className="webHeader webPart" />
			<main className="webBody webPart"><Outlet/></main>
			<Footer className="webFooter webPart" />
		</>
	);
}

export default BaseLayout;
