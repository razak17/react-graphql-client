import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "../../components";

const RegistrationForm = ({
  email,
  setEmail,
  loading = false,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        type="email"
        name="email"
        label="Email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
    </form>
  );
};

RegistrationForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default RegistrationForm;
