import React, { useContext } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { PostCard } from "../components";

import { AuthContext } from "../context/authContext";
import { GET_ALL_POSTS } from "../graphql";

const Home = () => {
  const { data, loading } = useQuery(GET_ALL_POSTS);
  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS);
  const { state } = useContext(AuthContext);

  let history = useHistory();

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allPosts.map((p) => (
            <div className="col-md-4" key={p._id}>
              <PostCard post={p} />
            </div>
          ))}
      </div>
      <div className="row p-5">
        <button
          onClick={() => fetchPosts()}
          className="btn-btn-raised btn-primary"
        >
          Fetch posts
        </button>
      </div>
      <hr />
      {JSON.stringify(posts)}
      <hr />
      {JSON.stringify(state.user)}
      <hr />
      {JSON.stringify(history)}
    </div>
  );
};

export default Home;
