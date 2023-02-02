import React, { Component } from "react";
import Form from "./common/form";
import authService from "../services/authService";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    await authService.login(email, password);
  };

  render() {
    const { data } = this.state;
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderTextField("email", "email", "text")}
          {this.renderTextField("password", "password", "password")}
          <input type="submit" name="Login" value="Login" />
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
