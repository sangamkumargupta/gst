import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy credentials
    const dummyEmail = "admin@gmail.com";
    const dummyPassword = "admin123";

    if (email === dummyEmail && password === dummyPassword) {
      setError("");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("adminEmail", email); // ✅ Save logged-in email
      navigate("/dashboard")
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="container-fluid login-wrapper d-flex align-items-center justify-content-center p-0">
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

              <div className="mb-4">
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

              {error && <div className="text-danger text-center mb-3">{error}</div>}

              <button type="submit" className="btn gradient-btn w-100 rounded-3 fw-semibold py-2">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
