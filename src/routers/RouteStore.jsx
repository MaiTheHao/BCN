import AdminPage from "../pages/AdminPage/AdminPage";
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

export { PublicRoutes, PrivateRoutes };