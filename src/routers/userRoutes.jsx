import React from "react";
import { Navigate } from "react-router-dom";
import UpdateInformation from "../pages/UpdateInformation/UpdateInformation";
import ExportInformation from "../pages/ExportInformation/ExportInformation";
import Layout from "../components/Layout/Layout";

const userRoutes = [
  {
    path: "cap-nhat-thong-tin",
    name: "Cập nhật thông tin",
    component: (
      <Layout>
        <UpdateInformation />
      </Layout>
    ),
  },
  {
    path: "xuat-thong-tin",
    name: "Xuất thông tin",
    component: (
      <Layout>
        <ExportInformation />
      </Layout>
    ),
  },
  {
    path: "*",
    component: <Navigate to={"xuat-thong-tin"} />,
  },
];

export default userRoutes;