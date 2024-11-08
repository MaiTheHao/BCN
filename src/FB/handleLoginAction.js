import { auth } from "./db";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification } from "firebase/auth";
import Swal from "sweetalert2";

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

const signUp = async (email, password) => {
	try {
		const { user } = await createUserWithEmailAndPassword(auth, email, password);
		await signOut(auth);
		await sendEmailVerification(user);
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

const logout = async () => {
	try {
		await signOut(auth);
		Swal.fire({
			icon: "success",
			title: "Đăng xuất thành công",
		});
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

export { signIn, signUp, logout };
