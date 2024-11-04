import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "./main.scss";

function Layout({ children }) {
	return (
		<>
			<Header className="webHeader webPart" />
			<main className="webBody webPart">{children}</main>
			<Footer className="webFooter webPart" />
		</>
	);
}

export default Layout;
