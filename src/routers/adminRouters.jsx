import React from "react";
import AdminPage from "../pages/AdminPage/AdminPage";

const adminRoutes = [
  {
    path: "manage/*",
    name: "Manage",
    component: (
        <AdminPage />
    ),
  },
];

export default adminRoutes;