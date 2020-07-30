import React, { useContext } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { GET_ALL_POSTS } from "../graphql";

const Home = () => {
  const { data, loading } = useQuery(GET_ALL_POSTS);
  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS);
  const { state, dispatch } = useContext(AuthContext);

  let history = useHistory();

  const updateUserName = () => {
    dispatch({
      type: "LOGGED_IN_USER",
      payload: "Razak Mo",
    });
  };

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allPosts.map((p) => (
            <div className="col-md-4" key={p._id}>
              <div className="card m-1">
                <div className="card-body">
                  <div className="card-title">
                    <h4>@{p.postedBy.username}</h4>
                  </div>
                  <p className="card-text">{p.content}</p>
                </div>
              </div>
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
      <button className="btn btn-primary" onClick={updateUserName}>
        Change user name
      </button>
      <hr />
      {JSON.stringify(history)}
    </div>
  );
};

export default Home;
