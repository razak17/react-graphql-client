import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import omitDeep from "omit-deep";
import { UpdateProfileForm, ImageUpload } from "../components";
import { UPDATE_USER, PROFILE } from "../graphql";

const UpdateProfile = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    about: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);
  const { data } = useQuery(PROFILE);
  const { username, email, about } = values;

  useMemo(() => {
    if (data) {
      const { username, email, about, images } = data.profile;
      setValues({
        username,
        email,
        about,
        images: omitDeep(images, ["__typename"]),
      });
    }
  }, [data]);

  const [updateUser] = useMutation(UPDATE_USER, {});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateUser({ variables: { input: values } });
    toast.success("Profile has been updated.");
    setLoading(false);
  };

  return (
    <div className="container p-5">
      <h4>Update Profile</h4>
      <div className="row">
        <ImageUpload
          setValues={setValues}
          setLoading={setLoading}
          values={values}
          loading={loading}
          multipleUpload={true}
        />
      </div>
      <UpdateProfileForm
        email={email}
        username={username}
        about={about}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default UpdateProfile;
