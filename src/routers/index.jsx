import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppContextProvider from "../contexts/App/AppContextProvider";
import Auth from "../auth/Auth";
import userRoutes from "../routers/userRoutes";
import adminRoutes from "../routers/adminRouters";

function AppRouter() {
  return (
    <BrowserRouter>
      <AppContextProvider>
        <Routes>
          <Route element={<Auth />}>
            {userRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
            {adminRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Route>
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default AppRouter;