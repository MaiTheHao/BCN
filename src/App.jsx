import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth";
import AppContextProvider from "./contexts/App/AppContextProvider";
import Layout from "./components/Layout/Layout";

const pages = [{ path: "*", component: <Layout>TEST :</Layout> }];

function App() {
	return (
		<AppContextProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<Auth />}>
						{pages.map((page, index) => {
							return <Route key={index} path={page.path} element={page.component} />;
						})}
					</Route>
				</Routes>
			</BrowserRouter>
		</AppContextProvider>
	);
}

export default App;
