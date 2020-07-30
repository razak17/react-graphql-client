import React, { useState } from "react";
import { auth } from "../firebase";
import { AuthForm } from "../components";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("rm17.abdul@gmail.com");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    // Confirmation toast
    toast.success(`Check your email to complete registration.`);
    // Add Email to local Storage
    window.localStorage.setItem("emailForRegistration", email);
    setEmail("");
    setLoading(false);
  };
  return (
    <div className="container p-5">
      <h4>Registration</h4>
      <AuthForm
        email={email}
        loading={loading}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        showEmailInput="true"
      />
    </div>
  );
};

export default Register;
