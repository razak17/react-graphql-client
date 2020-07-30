import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/authContext";
import { useQuery, useMutation } from "@apollo/react-hooks";
import omitDeep from "omit-deep";
import { ImageUpload, PostCard } from "../../components";
import { CREATE_POST, USER_POSTS } from "../../graphql";

const initialState = {
  content: "",
  image: {
    url: "https://via.placeholder.com/200x200?text=Post",
    public_id: "123245678",
  },
};

const Post = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const { data: posts } = useQuery(USER_POSTS);

  const { content, image } = values;

  const [createPost] = useMutation(CREATE_POST, {
    // Update Cache
    update: (data) => console.log(data),
    onError: (err) => console.log(err),
  });

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    createPost({ variables: { input: values } });
    setValues(initialState);
    setLoading(false);
    toast.success("Your post has been created.");
  };

  const createPostForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          value={content}
          onChange={handleChange}
          name="content"
          rows="10"
          className="md-textarea form-control"
          placeholder="What are you thinking..."
          maxLength="180"
          disabled={loading}
        ></textarea>
      </div>
      <button
        className="btn btn-raised btn-primary"
        disabled={!content || loading}
      >
        {loading ? "Hang on..." : "Post"}
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <h4>New Post</h4>
      <div className="col-md-3">
        <ImageUpload
          values={values}
          loading={loading}
          setLoading={setLoading}
          setValues={setValues}
        />
      </div>
      <div className="row">
        <div className="col-md-9">{createPostForm()}</div>
      </div>
      <hr />
      <div className="row p-5">
        {posts &&
          posts.userPosts.map((post) => (
            <div className="col-md-4 pt-5" key={post._id}>
              <PostCard post={post} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Post;
