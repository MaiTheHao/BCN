import { auth } from "../../configs/db";
import { createUserWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import Swal from "sweetalert2";
import { handleResetBackup } from "./handleResetBackup";

const signUp = async (email, password) => {
	try {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
		await signOut(auth);
		await sendEmailVerification(user);
		handleResetBackup();
		return user;
	} catch (error) {
		const text = error.code === "auth/email-already-in-use" ? "Email đã tồn tại" : "Mật khẩu phải có ít nhất 6 ký tự";
		Swal.fire({
			icon: "error",
			title: "Lỗi đăng ký",
			text,
		});
		return undefined;
	}
};

export default signUp;