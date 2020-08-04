import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const NavLinks = ({ user, logout }) => {
  return (
    <ul className="navbar-nav mr-auto">
      {user && (
        <li className="nav-item active">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
      )}
      {user && (
        <li className="nav-item active">
          <Link className="nav-link" to="/users">
            Explore
          </Link>
        </li>
      )}
      {!user && (
        <Fragment>
          <li className="nav-item active">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </Fragment>
      )}
      {user && (
        <li className="nav-item">
          <a onClick={logout} href="/login" className="nav-item nav-link">
            Logout
          </a>
        </li>
      )}
    </ul>
  );
};

NavLinks.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};

export default NavLinks;
