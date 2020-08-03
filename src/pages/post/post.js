import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ImageUpload, PostCard } from "../../components";
import { CREATE_POST, DELETE_POST, GET_USER_POSTS } from "../../graphql";

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

  const { data: posts } = useQuery(GET_USER_POSTS);

  const { content, image } = values;

  const [createPost] = useMutation(CREATE_POST, {
    // Update Cache
    update: (cache, { data: { createPost } }) => {
      const { userPosts } = cache.readQuery({
        query: GET_USER_POSTS,
      });
      cache.writeQuery({
        query: GET_USER_POSTS,
        data: { userPosts: [createPost, ...userPosts] },
      });
    },
    onError: (err) => console.log(err),
  });

  const [deletePost] = useMutation(DELETE_POST, {
    update: ({ data }) => {
      console.log("DELETE POST MUTATION", data);
      toast.error("Post has been deleted.");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Post has not been deleted.");
    },
  });

  const handleDelete = async (postId) => {
    let confirmDeletion = window.confirm("Confirm Deletion?");
    if (confirmDeletion) {
      setLoading(true);
      deletePost({
        variables: { postId },
        refetchQueries: [{ query: GET_USER_POSTS }],
      });
      setLoading(false);
    }
  };

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
          rows="5"
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
      <div className="row p-5">
        {posts &&
          posts.userPosts.map((post) => (
            <div className="col-md-6 pt-5" key={post._id}>
              <PostCard
                post={post}
                showUpdateButton={true}
                showDeleteButton={true}
                handleDelete={handleDelete}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Post;
