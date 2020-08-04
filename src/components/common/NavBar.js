import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "firebase";
import { AuthContext } from "../../context/authContext";
import Search from "./Search";
import NavLinks from "./NavLinks";

const NavBar = () => {
  const { state, dispatch } = useContext(AuthContext);

  const { user } = state;

  const logout = () => {
    auth().signOut();
    dispatch({
      type: "LOGGED_IN_USER",
      payload: null,
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <NavLinks user={user} logout={logout} />
        <Search />
      </div>
    </nav>
  );
};

export default NavBar;
