import React, { useContext, useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { LoadingRedirect } from "../components";

const PrivateRoute = ({ ...rest }) => {
  const { state } = useContext(AuthContext);
  const [user, setUser] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (isMounted && state.user) {
      setUser(true);
    }
    return () => {
      isMounted = false;
    };
  }, [state.user]);

  const navLinks = () => (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/post/new">
            Post
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/update-password">
            Password
          </Link>
        </li>
      </ul>
    </nav>
  );

  const renderContent = () => (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-2">{navLinks()}</div>
        <div className="col-md-10">
          <Route {...rest} />
        </div>
      </div>
    </div>
  );
  return user ? renderContent() : <LoadingRedirect path="/login" />;
};

export default PrivateRoute;
