import React, { useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { auth } from "../firebase";
import { PasswordInput } from "../components";

const UpdatePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentPassword && newPassword) {
        await auth.currentUser.updatePassword(newPassword).then(() => {
          setLoading(false);
          toast.success("Password has been updated.");
          history.push("/profile");
        });
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };
  return (
    <div className="coontainer p-5">
      <h4>Update Password</h4>;
      <form onSubmit={handleSubmit}>
        <PasswordInput
          name="current password"
          label="Current Password"
          placeholder="Enter Current Password"
          password={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          loading={loading}
        />
        <PasswordInput
          name="new password"
          label="New Password"
          placeholder="Enter New Password"
          password={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          loading={loading}
        />
        <button
          className="btn btn-raised btn-primary"
          disabled={!currentPassword || !newPassword || loading}
        >
          {loading ? "Please wait..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
