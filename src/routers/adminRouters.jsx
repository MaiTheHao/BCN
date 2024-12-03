import React from "react";
import AdminPage from "../pages/AdminPage/AdminPage";
import LayoutAdmin from "../components/Layout/LayoutAdmin";

const adminRoutes = [
  {
    path: "manage/*",
    name: "Manage",
    component: (
      <LayoutAdmin>
        <AdminPage />
      </LayoutAdmin>
    ),
  },
];

export default adminRoutes;