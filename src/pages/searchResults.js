import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { GET_SEARCH_RESULTS } from "../graphql";
import { PostCard } from "../components";

const SearchResults = () => {
  const { query } = useParams();
  const { data, loading } = useQuery(GET_SEARCH_RESULTS, {
    variables: { query },
  });

  if (loading)
    return (
      <div className="container text-center">
        <p className="p-5">Loading...</p>
      </div>
    );
  if (!data.search.length)
    return (
      <div className="container text-center">
        <h4 className="p-5">Uhmmm... Could not find any results.</h4>
      </div>
    );
  return (
    <div className="container">
      <h4 className="pt-5">Search results for "{query}"</h4>
      <div className="row pb-5">
        {data.search.map((post) => (
          <div className="col-md-4 pt-5" key={post._id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
