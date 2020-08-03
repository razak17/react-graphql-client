import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Image from "./Image";

const UserCard = ({ user }) => {
  const { username, images, about } = user;

  return (
    <div className="card text-center m-1" style={{ minHeight: "375px" }}>
      <div className="card-body p-5">
        <Image image={images[0]} />
        <Link to={`/u/${username}`}>
          <h4 className="text-primary">@{username}</h4>
        </Link>

        <hr />
        <p>{about}</p>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserCard;
