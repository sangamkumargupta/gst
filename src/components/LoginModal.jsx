 
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CaptchaBox from "../components/CaptchaBox";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/LoginModal.css";

const LoginModal = ({ show, handleClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [isForgotMode, setIsForgotMode] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (captchaInput.trim().toUpperCase() !== captchaText.toUpperCase()) {
      toast.error("Invalid CAPTCHA");
      return;
    }

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      toast.success("Login successful!");

      setTimeout(() => {
        handleClose();
        navigate("/dashboard");
      }, 1000); // Slight delay to let toast show
    } else {
      toast.error("Invalid email or password.");
    }
  };

  const resetModal = () => {
    setEmail("");
    setPassword("");
    setCaptchaInput("");
    setIsForgotMode(false);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={resetModal}
      size="md"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton className="border-0 pb-0" />
      <Modal.Body>
        <div className="custom-login-modal modal-container">
          {!isForgotMode ? (
            <>
              <h2 className="login-title">Admin Login</h2>
              <p className="login-subtitle">
                Secure login for authorized personnel
              </p>
              <form onSubmit={handleLogin} className="login-form">
                <label className="login-label">Admin Email</label>
                <input
                  className="login-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label className="login-label">Password</label>
                <input
                  className="login-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                <label className="login-label mt-3">CAPTCHA</label>
                <div className="d-flex align-items-center">
                  <input
                    className="login-input me-2"
                    type="text"
                    placeholder="Enter CAPTCHA"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                  />
                  <CaptchaBox onChange={(text) => setCaptchaText(text)} />
                </div>

                <button type="submit" className="login-button mt-3">
                  Login
                </button>

                <p
                  className="text-center mt-3 text-decoration-underline"
                  style={{ cursor: "pointer", color: "#007bff" }}
                  onClick={() => setIsForgotMode(true)}
                >
                  Forgot Password?
                </p>
              </form>
            </>
          ) : (
            <ForgotPasswordForm onBack={() => setIsForgotMode(false)} />
          )}

          {/* Toast container with colored theme */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            closeOnClick
            pauseOnHover
            draggable
            theme="colored"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
