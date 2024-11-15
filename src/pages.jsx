import UpdateInformation from "./pages/UpdateInformation/UndateInformation";
import ExportInformation from "./pages/ExportInformation/ExportInformation";
import Layout from "./components/Layout/Layout";
import { Navigate } from "react-router-dom";
import AdminPage from "./pages/AdminPage/AdminPage";
import LayoutAdmin from "./components/Layout/LayoutAdmin";

const pages = [
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
		component: <Navigate to="xuat-thong-tin" />,
	},
];

const adminPages = [
	{
		path: "manage/*",
		name: "Manage",
		component: (
			<LayoutAdmin>
				<AdminPage />
			</LayoutAdmin>
		),
	},
]

export { adminPages };
export default pages;
