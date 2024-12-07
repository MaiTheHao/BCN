import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "../auth/Auth";
import BaseLayout from "../components/Layout/BaseLayout";
import AppContextProvider from "../contexts/App/AppContextProvider";
import { PrivateRoutes, PublicRoutes } from "./RouteStore";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import Undefined from "../pages/Undefined/Undefined";

function AppRouter() {
	return (
		<BrowserRouter>
			<AppContextProvider>
				<Routes>
					<Route element={<Auth />}>
						<Route element={<BaseLayout />}>
							<Route element={<PublicRoute />}>
								{PublicRoutes.map((route, index) => (
									<Route key={index} path={route.path} element={route.component} />
								))}
							</Route>
							<Route element={<PrivateRoute />}>
								{PrivateRoutes.map((route, index) => (
									<Route key={index} path={route.path} element={route.component} />
								))}
							</Route>
						</Route>
					</Route>
					<Route path="/" element={<Navigate to="xuat-thong-tin" />} />
					<Route path="/401" element={<Unauthorized/>} />
					<Route path="/404" element={<Undefined/>} />
					<Route path="*" element={<Undefined/>} />
				</Routes>
			</AppContextProvider>
		</BrowserRouter>
	);
}

export default AppRouter;
