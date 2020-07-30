import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { AuthForm } from "../components";

const ForgotPassword = () => {
  const [email, setEmail] = useState("rm17.abdul@gmail.com");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success("Check your email to reset your password.");
      })
      .catch((err) => {
        console.log("Reset Password Error", err.message);
        toast.error(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="container p-5">
      <h4>Reset Password</h4>
      <AuthForm
        email={email}
        setEmail={setEmail}
        loading={loading}
        handleSubmit={handleSubmit}
        showEmailInput="true"
      />
    </div>
  );
};

export default ForgotPassword;
