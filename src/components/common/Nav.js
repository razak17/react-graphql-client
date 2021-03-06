import React, { useContext, Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { auth } from "firebase";
import { AuthContext } from "../../context/authContext";

const Nav = () => {
  const { state, dispatch } = useContext(AuthContext);

  let history = useHistory();
  const { user } = state;

  const logout = () => {
    auth().signOut();
    dispatch({
      type: "LOGGED_IN",
      payload: null,
    });
    history.push("/login");
  };
  const activeStyle = { color: "#F15B2A" };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        Navbar
      </NavLink>
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
        <ul className="navbar-nav mr-auto">
          {!user && (
            <Fragment>
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  activeStyle={activeStyle}
                  to="/login"
                  exact
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item active">
                <NavLink
                  className="nav-link"
                  activeStyle={activeStyle}
                  to="/register"
                >
                  Register
                </NavLink>
              </li>
            </Fragment>
          )}
          {user && (
            <li className="nav-item active">
              <a onClick={logout} href="/login" className="nav-item nav-link">
                Logout
              </a>
            </li>
          )}
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Nav;
