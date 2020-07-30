import React from "react";
import TextInput from "./TextInput";
import PropTypes from "prop-types";

const PasswordInput = ({
  name = "password",
  label = "Password",
  placeholder = "Enter Password",
  password,
  onChange,
  loading,
}) => {
  return (
    <TextInput
      type="password"
      name={name}
      label={label}
      placeholder={placeholder}
      value={password}
      onChange={onChange}
      disabled={loading}
    />
  );
};

PasswordInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  password: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default PasswordInput;
