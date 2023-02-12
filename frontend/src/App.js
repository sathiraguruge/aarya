import "./App.css";
import NavigationBar from "./components/common/navBar";
import Login from "./components/login";
import HomePage from "./components/home";
import NotFound from "./components/notFound";
import Register from "./components/register";
import Orders from "./components/orders";
import MyAccount from "./components/profile";
import { Navigate, Route, Routes } from "react-router-dom";
import React, { Component } from "react";
import authService from "./services/authService";

class App extends Component {
  state = {
    user: {
      isLoggedIn: false,
    },
  };

  componentDidMount() {
    let user = {
      isLoggedIn: false,
    };
    user["isLoggedIn"] = authService.isLoggedIn();
    this.setState({ user });
  }

  handleLogin = (loginBool) => {
    let user = {
      isLoggedIn: loginBool,
    };
    this.setState({ user });
  };

  render() {
    return (
      <React.Fragment>
        <NavigationBar
          user={this.state.user}
          onHandleLogin={this.handleLogin}
        />
        <Routes>
          <Route
            path="/login"
            element={<Login onHandleLogin={this.handleLogin} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={<MyAccount />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </React.Fragment>
    );
  }
}

export default App;
