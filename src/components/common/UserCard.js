import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Image from "./Image";

const UserCard = ({ user }) => {
  const { username, images, about } = user;

  return (
    <div className="card h-100 text-center m-2" style={{ minHeight: "300px" }}>
      <div className="card-body p-2">
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
