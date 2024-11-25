import React, { useLayoutEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth";
import AppContextProvider from "./contexts/App/AppContextProvider";
import pages, { adminPages } from "./pages";
import { handleResetCookie } from "./FB/handleLoginAction";

function App() {

	useLayoutEffect(() => {
		handleResetCookie("web-current-page");
	}, [])

	return (
		<AppContextProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Auth />}>
						{pages.map((page, index) => {
							return <Route key={index} path={page.path} element={page.component} />;
						})}

						{adminPages.map((page, index) => {
							return <Route key={index} path={page.path} element={page.component} />;
						})}
					</Route>
					{/* <Route path="*" element = {
						<Test/>
					}></Route> */}
				</Routes>
			</BrowserRouter>
		</AppContextProvider>
	);
}

export default App;
