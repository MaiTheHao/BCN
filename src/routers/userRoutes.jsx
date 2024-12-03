import React from "react";
import { Navigate } from "react-router-dom";
import UpdateInformation from "../pages/UpdateInformation/UpdateInformation";
import ExportInformation from "../pages/ExportInformation/ExportInformation";

const userRoutes = [
  {
    path: "cap-nhat-thong-tin",
    name: "Cập nhật thông tin",
    component: (
        <UpdateInformation />
    ),
  },
  {
    path: "xuat-thong-tin",
    name: "Xuất thông tin",
    component: (  
        <ExportInformation />
    ),
  },
  {
    path: "*",
    component: <Navigate to={"xuat-thong-tin"} />,
  }
];

export default userRoutes;