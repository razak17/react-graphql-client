import React, { useState, useContext } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";
import { PostCard, PostPagination } from "../components";

import { AuthContext } from "../context/authContext";
import { GET_ALL_POSTS, GET_TOTAL_POSTS } from "../graphql";

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery(GET_ALL_POSTS, { variables: { page } });
  const { data: postCount } = useQuery(GET_TOTAL_POSTS);
  const [fetchPosts, { data: posts }] = useLazyQuery();
  const { state } = useContext(AuthContext);

  let history = useHistory();
  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row p-5">
        {data &&
          data.allPosts.map((p) => (
            <div className="col-md-4 mb-4" key={p._id}>
              <PostCard post={p} />
            </div>
          ))}
      </div>
      <PostPagination page={page} setPage={setPage} postCount={postCount} />
      <hr />
      {JSON.stringify(posts)}
      <hr />
      {/* {JSON.stringify(state.user)} */}
      <hr />
      {JSON.stringify(history)}
    </div>
  );
};

export default Home;
