import React from "react";
import TextInput from "./TextInput";
import PropTypes from "prop-types";

const EmailInput = ({ email, onChange, loading }) => {
  return (
    <TextInput
      type="email"
      name="email"
      label="Email"
      placeholder="Enter Email"
      value={email}
      onChange={onChange}
      disabled={loading}
    />
  );
};

EmailInput.propTypes = {
  email: PropTypes.string,
  onChange: PropTypes.func,
  loading: PropTypes.bool,
};

export default EmailInput;
