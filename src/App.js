import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { AuthContext } from "./context/authContext";
import { NavBar, PrivateRoute, PublicRoute } from "./components";
import {
  Home,
  Register,
  Login,
  NotFoundPage,
  CompleteRegistrationPage,
  ForgotPassword,
  UpdatePassword,
  UpdateProfile,
  Post,
  Users,
  UserProfile,
  UpdatePost,
  SinglePost,
  SearchResults,
} from "./pages";

const App = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    request: (operation) => {
      operation.setContext({
        headers: {
          authtoken: user ? user.token : "",
        },
      });
    },
  });

  return (
    <ApolloProvider client={client}>
      <NavBar />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          path="/complete-registration"
          component={CompleteRegistrationPage}
        />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/u/:username" component={UserProfile} />
        <Route exact path="/search/:query" component={SearchResults} />
        <Route exact path="/post/:postid" component={SinglePost} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/login" component={Login} />
        <PrivateRoute exact path="/post/new" component={Post} />
        <PrivateRoute
          exact
          path="/post/update/:postid"
          component={UpdatePost}
        />
        <PrivateRoute exact path="/profile" component={UpdateProfile} />
        <PrivateRoute
          exact
          path="/update-password"
          component={UpdatePassword}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
