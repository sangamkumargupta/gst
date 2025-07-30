import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CaptchaBox from "../components/CaptchaBox";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [forgotMode, setForgotMode] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    if (captchaInput.trim().toLowerCase() !== captchaText.toLowerCase()) {
      toast.error("Invalid CAPTCHA. Try again.");
      return;
    }

    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("adminEmail", email);
      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000); // delay so toast can show
    } else {
      toast.error("Invalid email or password.");
    }
  };

  return (
    <div className="text-panel container-fluid login-wrapper d-flex align-items-center justify-content-center p-0">
      <div className="row w-100 m-0">
        {/* Left panel */}
        <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center left-panel text-white p-5">
          <div>
            <h1 className="fw-bold">GST Admin Portal</h1>
            <p className="mt-3">Manage GST filings, returns & compliance all in one place.</p>
            <ul className="mt-4 ps-3">
              <li>Track GST return status</li>
              <li>Update business information</li>
              <li>View tax summaries and reports</li>
              <li>Generate e-way bills</li>
            </ul>
            <img
              src="https://equalconsultancy.com/new/wp-content/uploads/2020/02/GST-LOGO.png"
              alt="GST Illustration"
              className="img-fluid mt-4 animated-img"
              style={{ width: "200px", height: "auto", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Right panel */}
        <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center">
          <div className="login-card animated-card shadow-lg p-4 p-md-5 w-100" style={{ maxWidth: "420px" }}>
            {!forgotMode ? (
              <>
                <div className="text-center mb-4">
                  <h2 className="fw-bold title-text">GST Admin Login</h2>
                  <p className="subtitle-text">Secure login for authorized personnel</p>
                </div>

                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Admin Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control rounded-3"
                      placeholder="admin@gstportal.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-control rounded-3"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">CAPTCHA</label>
                    <CaptchaBox onChange={(text) => setCaptchaText(text)} />
                    <input
                      type="text"
                      className="form-control rounded-3 mt-2"
                      placeholder="Enter CAPTCHA"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      required
                    />
                  </div>

                  <button type="submit" className="btn gradient-btn w-100 rounded-3 fw-semibold py-2">
                    Login
                  </button>

                  <p
                    className="text-center mt-3 text-decoration-underline"
                    style={{ cursor: "pointer", color: "#007bff" }}
                    onClick={() => setForgotMode(true)}
                  >
                    Forgot Password?
                  </p>
                </form>
              </>
            ) : (
              <ForgotPasswordForm onBack={() => setForgotMode(false)} />
            )}
          </div>
        </div>
      </div>

      {/* Toast messages container */}
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
  );
};

export default Login;
