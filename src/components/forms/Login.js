import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { TextInput } from "../../components";

const LoginForm = ({
  email,
  password,
  setEmail,
  setPassword,
  loading = false,
  handleSubmit,
  googleLogin,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <button
        onClick={googleLogin}
        className="btn btn-raised btn-danger mt-5"
        disabled={loading}
      >
        Login with Google
      </button>
      <TextInput
        type="text"
        name="email"
        label="Email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <TextInput
        type="password"
        name="password"
        label="Password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />
      <Link to="/forgot-password">forgot password? click here.</Link>
      <br />
      <button
        className="btn btn-raised btn-primary"
        disabled={!email || !password || loading}
      >
        {loading ? "logging in..." : "Login"}
      </button>
    </form>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default LoginForm;
