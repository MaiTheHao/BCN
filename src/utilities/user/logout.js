import { auth } from "../../configs/db";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import { handleResetBackup } from "./handleResetBackup";

const logout = async () => {
	try {
		await signOut(auth);
		handleResetBackup();
		Swal.fire({
			icon: "success",
			title: "Đăng xuất thành công",
			text: "Hẹn gặp lại bạn",
		})
		return true;
	} catch (error) {
		const text = "Đã có lỗi xảy ra";
		Swal.fire({
			icon: "error",
			title: "Lỗi đăng xuất",
			text,
		});
		return undefined;
	}
};

export default logout;