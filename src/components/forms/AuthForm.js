import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { EmailInput, PasswordInput } from "../../components";

const AuthForm = ({
  email,
  password,
  loading = false,
  setEmail,
  setPassword,
  handleSubmit,
  googleLogin,
  showPasswordInput = false,
  showEmailInput = false,
  showGoogleLogin = false,
}) => (
  <form onSubmit={handleSubmit}>
    {showGoogleLogin && (
      <button
        onClick={googleLogin}
        className="btn btn-raised btn-danger mt-5"
        disabled={loading}
      >
        Login with Google
      </button>
    )}
    {showEmailInput && (
      <EmailInput
        email={email}
        onChange={(e) => setEmail(e.target.value)}
        loading={loading}
      />
    )}

    {showPasswordInput && (
      <PasswordInput
        password={password}
        onChange={(e) => setPassword(e.target.value)}
        loading={loading}
      />
    )}

    {showGoogleLogin ? (
      <Fragment>
        <Link to="/forgot-password">forgot password? click here.</Link>
        <br />
        <button
          className="btn btn-raised btn-primary"
          disabled={!email || !password || loading}
        >
          {loading ? "logging in..." : "Login"}
        </button>
      </Fragment>
    ) : showEmailInput && showPasswordInput ? (
      <button
        className="btn btn-raised btn-primary"
        disabled={!email || !password || loading}
      >
        {loading ? "Please wait..." : "Register"}
      </button>
    ) : showEmailInput ? (
      <button
        className="btn btn-raised btn-primary"
        disabled={!email || loading}
      >
        {loading ? "Please wait..." : "Submit"}
      </button>
    ) : (
      <button
        className="btn btn-raised btn-primary"
        disabled={!password || loading}
      >
        {loading ? "Please wait..." : "Submit"}
      </button>
    )}
  </form>
);

AuthForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  showEmailInput: PropTypes.string,
  showPasswordInput: PropTypes.string,
  showGoogleLogin: PropTypes.string,
  setEmail: PropTypes.func,
  setPassword: PropTypes.func,
  handleSubmit: PropTypes.func,
  googleLogin: PropTypes.func,
  loading: PropTypes.bool,
};

export default AuthForm;
