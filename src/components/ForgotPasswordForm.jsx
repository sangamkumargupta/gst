import React, { useState } from "react";

const ForgotPasswordForm = ({ onBack }) => {
  const [resetEmail, setResetEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();

    if (!resetEmail.trim()) {
      setError("Please enter your email address.");
      return;
    }

    // Simulate email sent
    setResetSuccess(true);
    setError("");
  };

  return (
    <>
      <h2 className="login-title">Reset Password</h2>
      <p className="login-subtitle">
        Enter your registered email to receive reset instructions.
      </p>
      <form onSubmit={handleForgotPassword} className="login-form">
        <label className="login-label">Email Address</label>
        <input
          className="login-input"
          type="email"
          value={resetEmail}
          onChange={(e) => setResetEmail(e.target.value)}
          required
        />
        {error && <div className="login-error mt-2">{error}</div>}
        {resetSuccess && (
          <div className="text-success mt-2">
            Reset instructions sent to your email.
          </div>
        )}
        <button type="submit" className="login-button mt-3">
          Send Reset Link
        </button>
        <p
          className="text-center mt-3 text-decoration-underline"
          style={{ cursor: "pointer", color: "#007bff" }}
          onClick={onBack}
        >
          ← Back to Login
        </p>
      </form>
    </>
  );
};

export default ForgotPasswordForm;
