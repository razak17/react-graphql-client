import React from "react";
import PropTypes from "prop-types";
import Image from "./Image";
import { Link, useHistory } from "react-router-dom";

const PostCard = ({
  post,
  showUpdateButton = false,
  showDeleteButton = false,
  handleDelete = (f) => f,
}) => {
  const { image, content, postedBy } = post;
  const history = useHistory();
  return (
    <div className="card h-100 text-center m-2" style={{ minHeight: "300px" }}>
      <Link to={`/post/${post._id}`}>
        <Image image={image} />
      </Link>
      <div className="card-body p-2">
        <Link to={`u/${postedBy.username}`}>
          <h4 className="text-primary">@{postedBy.username}</h4>
        </Link>
        <hr />
        <p>{content}</p>
        <br />
        {showUpdateButton && (
          <button
            className="btn m-2 btn-raised btn-success"
            onClick={() => history.push(`/post/update/${post._id}`)}
          >
            Update
          </button>
        )}
        {showDeleteButton && (
          <button
            className="btn m-2 btn-raised btn-danger"
            onClick={() => handleDelete(post._id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  showUpdateButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  handleDelete: PropTypes.func,
};
export default PostCard;
