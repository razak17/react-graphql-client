import React from "react";
import { TextInput } from "../../components";
import PropTypes from "prop-types";

const UpdateProfileForm = ({
  email,
  username,
  about,
  handleChange,
  handleSubmit,
  loading,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        type="email"
        name="email"
        label="Email"
        placeholder="Enter Email"
        value={email}
        onChange={handleChange}
        disabled
      />
      <TextInput
        type="text"
        name="username"
        label="Username"
        placeholder="Enter Username"
        value={username}
        onChange={handleChange}
        disabled={loading}
      />
      <div className="form-group">
        <label htmlFor="about">About</label>
        <div className="field">
          <textarea
            name="about"
            className="form-control"
            placeholder="Type Submit about yourself..."
            value={about}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
      </div>
      <button
        className="btn btn-raised btn-primary"
        disabled={!email || !username || loading}
      >
        {loading ? "updating..." : "Submit"}
      </button>
    </form>
  );
};

UpdateProfileForm.propTypes = {
  email: PropTypes.string.isRequired,
  username: PropTypes.string,
  about: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default UpdateProfileForm;
