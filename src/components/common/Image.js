import React from "react";
import PropTypes from "prop-types";

const Image = ({ image, handleRemoveImage = (f) => f }) => {
  return (
    <img
      src={image.url}
      key={image.public_id}
      alt={image.public_id}
      style={{ heigh: "100px" }}
      className="img-thumbnail m-3"
      onClick={() => handleRemoveImage(image.public_id)}
    />
  );
};

Image.propTypes = {
  image: PropTypes.any.isRequired,
  handleRemoveImage: PropTypes.func,
};
export default Image;
