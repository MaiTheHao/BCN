import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Auth from "../auth/Auth";
import BaseLayout from "../components/Layout/BaseLayout";
import AppContextProvider from "../contexts/App/AppContextProvider";
import { ErrorRoutes, PrivateRoutes, PublicRoutes } from "./RouteStore";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

function AppRouter() {
	return (
		<BrowserRouter>
			<AppContextProvider>
				<Routes>
					<Route element={<Auth />}>
						<Route element={<BaseLayout />}>
							<Route element={<PublicRoute />}>
								{PublicRoutes.map((route, index) => (
									<Route key={`PublicRoutes-${index}`} path={route.path} element={route.component} />
								))}
							</Route>
							<Route element={<PrivateRoute />}>
								{PrivateRoutes.map((route, index) => (
									<Route key={`PrivateRoutes-${index}`} path={route.path} element={route.component} />
								))}
							</Route>
						</Route>
					</Route>

					{
						/* Error routes */
						ErrorRoutes.map((route, index) => (<Route key={`ErrorRoutes-${index}`} path={route.path} element={route.element}></Route>))
					}
				</Routes>
			</AppContextProvider>
		</BrowserRouter>
	);
}

export default AppRouter;
