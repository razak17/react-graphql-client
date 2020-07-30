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
        <PublicRoute path="/register" component={Register} />
        <PublicRoute path="/login" component={Login} />
        <PrivateRoute path="/post/new" component={Post} />
        <PrivateRoute path="/profile" component={UpdateProfile} />
        <PrivateRoute path="/update-password" component={UpdatePassword} />
        <Route component={NotFoundPage} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
