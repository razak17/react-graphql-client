import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";

import { AuthForm } from "../components";
import { auth, googleAuthProvider } from "../firebase";
import { AuthContext } from "../context/authContext";
import * as types from "../context/types";
import { CREATE_USER } from "../graphql";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("rm17.abdul@gmail.com");
  const [password, setPassword] = useState("arazak_mo");
  const [loading, setLoading] = useState(false);

  let history = useHistory();
  const [userCreate] = useMutation(CREATE_USER);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await auth
        .signInWithEmailAndPassword(email, password)
        .then(async (result) => {
          const { user } = result;
          const tokenIDResult = await user.getIdTokenResult();

          dispatch({
            type: types.LOGGED_IN,
            payload: {
              email: user.email,
              token: tokenIDResult.token,
            },
          });
          // send user input to mongo server
          userCreate();
          toast.success("Login Successful");
          history.push("/post/new");
        });
    } catch (err) {
      console.log("Login Error!", err.message);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth.signInWithPopup(googleAuthProvider).then(async (result) => {
      const { user } = result;
      const tokenIDResult = await user.getIdTokenResult();

      dispatch({
        type: types.LOGGED_IN,
        payload: {
          email: user.email,
          token: tokenIDResult.token,
        },
      });
      // send user input to mongo server
      userCreate();
      toast.success("Login Successful");
      history.push("/");
    });
  };
  return (
    <div className="container p-5">
      <h4>Login</h4>
      <AuthForm
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        showEmailInput="true"
        showPasswordInput="true"
        showGoogleLogin="true"
        handleSubmit={handleSubmit}
        googleLogin={googleLogin}
        loading={loading}
      />
    </div>
  );
};

export default Login;
