import React, { useEffect, useState, useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import * as types from "../context/types";
import { AuthForm } from "../components";
import { CREATE_USER } from "../graphql";

const CompleteRegistrationPage = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();
  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
  }, [history]);

  const [userCreate] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("Invalid Email or Password");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      // console.log(result);

      // Clear local storage
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailForRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);

        const tokenIDResult = await user.getIdTokenResult();
        dispatch({
          type: types.LOGGED_IN,
          payload: { email: user.email, token: tokenIDResult.token },
        });
        userCreate();
        toast.success("Registraton Successful.");
        history.push("/post/new");
      }
    } catch (err) {
      console.log("Registraton Error", err.message);
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className="container p-5">
      <h4>Complete Your Registration</h4>
      <AuthForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        showEmailInput="true"
        showPasswordInput="true"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
};

export default CompleteRegistrationPage;
