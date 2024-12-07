import { Navigate } from "react-router-dom";

import AdminPage from "../pages/AdminPage/AdminPage";
import Undefined from "../pages/Undefined/Undefined";
import Unauthorized from "../pages/Unauthorized/Unauthorized";
import UpdateInformation from "../pages/UpdateInformation/UpdateInformation";
import ExportInformation from "../pages/ExportInformation/ExportInformation";

const PublicRoutes = [
	{
		path: "cap-nhat-thong-tin",
		name: "Cập nhật thông tin",
		component: <UpdateInformation />,
	},
	{
		path: "xuat-thong-tin",
		name: "Xuất thông tin",
		component: <ExportInformation />,
	},
];

const PrivateRoutes = [
	{
		path: "manage/*",
		name: "Manage",
		component: <AdminPage />,
	},
];

const ErrorRoutes = [
	{
		path: "/",
		element: <Navigate to="xuat-thong-tin" />,
	},
	{
		path: "*",
		element: <Navigate to="404" />,
	},
	{
		path: "/401",
		element: <Unauthorized />,
	},
	{
		path: "/404",
		element: <Undefined />,
	},
];

export { PublicRoutes, PrivateRoutes, ErrorRoutes };
