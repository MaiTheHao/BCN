import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../configs/db";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hộp thư của bạn.");
      setError("");
    } catch (err) {
      setMessage("");
      setError("Có lỗi xảy ra. Vui lòng kiểm tra lại email.");
    }
  };

  return (
    <div>
      <h2>Quên mật khẩu</h2>
      <form onSubmit={handlePasswordReset}>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Gửi yêu cầu</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PasswordReset;
