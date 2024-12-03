import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContextProvider from "../contexts/App/AppContextProvider";
import Auth from "../auth/Auth";
import userRoutes from "../routers/userRoutes";
import adminRoutes from "../routers/adminRouters";
import Layout from "../components/Layout/Layout";
import LayoutAdmin from "../components/Layout/LayoutAdmin";

function AppRouter() {
	return (
		<BrowserRouter>
			<AppContextProvider>
				<Routes>
					<Route element={<Auth />}>
						<Route element={<Layout />}>
							{userRoutes.map((route, index) => (
								<Route key={index} path={route.path} element={route.component} />
							))}
						</Route>

						<Route element={<LayoutAdmin />}>
							{adminRoutes.map((route, index) => (
								<Route key={index} path={route.path} element={route.component} />
							))}
						</Route>
					</Route>
				</Routes>
			</AppContextProvider>
		</BrowserRouter>
	);
}

export default AppRouter;
