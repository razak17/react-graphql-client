import React, { useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import { AuthContext } from "../../context/authContext";
import Image from "./Image";

const ImageUpload = ({
  setValues,
  setLoading,
  loading,
  values,
  multipleUpload = false,
}) => {
  const { state } = useContext(AuthContext);

  const handleImageResizeAndUpload = (e) => {
    setLoading(true);
    let fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        e.target.files[0],
        200,
        200,
        "JPEG",
        100,
        0,
        (uri) => {
          console.log(uri);
          axios
            .post(
              `${process.env.REACT_APP_REST_ENDPOINT}/image-upload`,
              { image: uri },
              {
                headers: { authtoken: state.user.token },
              }
            )
            .then((response) => {
              setLoading(false);
              console.log("CLOUDINARY_UPLOAD_SUCCESS", response);
              // Single and Multiple image upload
              if (multipleUpload) {
                const { images } = values;
                setValues({ ...values, images: [...images, response.data] });
              } else {
                const { image } = values;
                setValues({ ...values, image: response.data });
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log("CLOUDINARY_UPLOAD_FAILURE", err);
            });
        },
        "base64"
      );
    }
  };

  const handleRemoveImage = (id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_REST_ENDPOINT}/image-remove`,
        {
          public_id: id,
        },
        { headers: { authtoken: state.user.token } }
      )
      .then((response) => {
        setLoading(false);
        // Single and Multiple image upload
        if (multipleUpload) {
          const { images } = values;
          let filteredImages = images.filter((item) => {
            return item.public_id !== id;
          });
          setValues({ ...values, images: filteredImages });
        } else {
          const { image } = values;
          setValues({ ...values, image: { url: "", public_id: "" } });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="row">
      <div className="col-md-2">
        <div className="form-group">
          <label className="btn btn-primary">
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={handleImageResizeAndUpload}
              className="form-control"
              placholder="Image"
              disabled={loading}
            />
          </label>
        </div>
      </div>
      <div className="col-md-10">
        {values.image && (
          <Image
            image={values.image}
            key={values.image.public_id}
            handleRemoveImage={handleRemoveImage}
          />
        )}
        {values.images &&
          values.images.map((image) => (
            <Image
              image={image}
              key={image.public_id}
              handleRemoveImage={handleRemoveImage}
            />
          ))}
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  setValues: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default ImageUpload;
