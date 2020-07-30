import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import { UserCard } from "../components";
import { GET_USER_PROFILE } from "../graphql";

const UserProfile = () => {
  let params = useParams();
  const { loading, data } = useQuery(GET_USER_PROFILE, {
    variables: { username: params.username },
  });

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <br />
      <UserCard user={data.publicProfile} />
    </div>
  );
};

export default UserProfile;
