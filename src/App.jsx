import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth";
import AppContextProvider from "./contexts/App/AppContextProvider";
import pages, { adminPages } from "./pages";
import Test from "./Test";

function App() {
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
