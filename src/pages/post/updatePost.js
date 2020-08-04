import React, { useState, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import omitDeep from "omit-deep";
import { ImageUpload } from "../../components";
import { GET_SINGLE_POST, UPDATE_POST } from "../../graphql";

const UpdatePost = () => {
  const [values, setValues] = useState({
    content: "",
    image: {
      url: "",
      public_id: "",
    },
  });

  const [getSinglePost, { data: singlePost }] = useLazyQuery(GET_SINGLE_POST);
  const [updatePost] = useMutation(UPDATE_POST);
  const [loading, setLoading] = useState(false);
  const { content, image } = values;
  const { postid } = useParams();

  useMemo(() => {
    if (singlePost) {
      const { _id, content, image } = singlePost.singlePost;
      setValues({
        ...values,
        _id,
        content,
        image: omitDeep(image, ["__typename"]),
      });
    }
  }, [singlePost]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      getSinglePost({ variables: { postId: postid } });
    }
    return () => {
      isMounted = false;
    };
  }, [getSinglePost, postid]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    updatePost({ variables: { input: values } });
    setLoading(false);
    toast.success("Post has been updated.");
  };

  const updatePostForm = () => (
    <form onSubmit={handleUpdate}>
      <div className="form-group">
        <textarea
          value={content}
          onChange={handleChange}
          name="content"
          rows="5"
          className="md-textarea form-control"
          placeholder="What are you thinking..."
          maxLength="180"
          disabled={loading}
        ></textarea>
      </div>
      <button
        className="btn btn-raised btn-primary"
        disabled={!content || !image || loading}
      >
        {loading ? "Hang on..." : "Update Post"}
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <h4>Update Post</h4>
      <ImageUpload
        values={values}
        loading={loading}
        setLoading={setLoading}
        setValues={setValues}
      />
      {updatePostForm()}
    </div>
  );
};

export default UpdatePost;
