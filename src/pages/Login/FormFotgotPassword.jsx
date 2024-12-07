import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../backend/configs/database";
import CustomFormInput from "./components/CusTomFormInput";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import FormBtns from "./components/FormBtns";

const FormForgotPassword = ({changePage}) => {
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
    <div className="forgot-password">
      <form className="forgot-password__form" onSubmit={handlePasswordReset}>
        <CustomFormInput
          icon={faEnvelope}
          type="email"
          name="email"
          placeholder="Nhập email của bạn"
          inputValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="forgot-password__form__btns">
          <button>Gửi</button>
          <button type="button" onClick={() => changePage()}>Quay lại</button>
        </div>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default FormForgotPassword;