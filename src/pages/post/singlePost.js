import React, { useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import omitDeep from "omit-deep";
import { useLazyQuery } from "@apollo/react-hooks";
import { PostCard } from "../../components";
import { GET_SINGLE_POST } from "../../graphql";

const SinglePost = () => {
  const [values, setValues] = useState({
    content: "",
    image: {
      url: "",
      public_id: "",
    },
    postedBy: {},
  });

  const [getSinglePost, { data: singlePost }] = useLazyQuery(GET_SINGLE_POST);

  const { postid } = useParams();

  useMemo(() => {
    if (singlePost) {
      const { _id, content, image, postedBy } = singlePost.singlePost;
      setValues({
        _id,
        content,
        image: omitDeep(image, ["__typename"]),
        postedBy,
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

  return (
    <div className="container p-5">
      <PostCard post={values} />
    </div>
  );
};

export default SinglePost;
