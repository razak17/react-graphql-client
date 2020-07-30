import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../components";

const CompleteRegistrationForm = ({
  email,
  password,
  loading = false,
  disabled = true,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="container p-5">
      <h4>Complete Your Registration</h4>
      <form onSubmit={onSubmit}>
        <TextInput
          type="text"
          name="email"
          label="Email"
          placeholder="Enter Email"
          value={email}
          disabled={disabled}
        />

        <TextInput
          type="password"
          name="password"
          label="Password"
          placeholder="Enter Password"
          value={password}
          onChange={onChange}
        />
        <button
          className="btn btn-raised btn-primary"
          disabled={!email || !password || loading}
        >
          {loading ? "loading..." : "Register"}
        </button>
      </form>
    </div>
  );
};

CompleteRegistrationForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default CompleteRegistrationForm;
