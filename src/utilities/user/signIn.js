import { auth } from "../../configs/db";
import { signInWithEmailAndPassword } from "firebase/auth";
import Swal from "sweetalert2";
import { handleResetBackup } from "./handleResetBackup";

const signIn = async (email, password) => {
	try {
		const { user } = await signInWithEmailAndPassword(auth, email, password);

		if (!user?.emailVerified) {
			Swal.fire({
				icon: "error",
				title: "Email chưa xác thực",
				text: "Vui lòng kiểm tra email và xác thực tài khoản",
			});
			return undefined;
		}

		handleResetBackup();
		return user;
	} catch (error) {
		const text = error.code === "auth/user-not-found" ? "Email không tồn tại" : "Mật khẩu không đúng";
		Swal.fire({
			icon: "error",
			title: "Lỗi đăng nhập",
			text,
		});
		return undefined;
	}
};

export default signIn;