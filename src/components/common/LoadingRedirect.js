import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const LoadingRedirect = ({ path }) => {
  const [count, setCount] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && history.push(path);
    return () => clearInterval(interval);
  }, [count, history, path]);

  return (
    <div className="contianer p-5 text-center">
      <p>Redirecting you in {count} seconds...</p>
    </div>
  );
};

LoadingRedirect.propTypes = {
  path: PropTypes.string.isRequired,
};

export default LoadingRedirect;
