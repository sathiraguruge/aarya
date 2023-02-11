import React, { Component } from "react";
import CustomForm from "./common/form";
import authService from "../services/authService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

class Login extends CustomForm {
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
        <Form onSubmit={this.handleSubmit}>
          {this.renderTextField(
            "email",
            "email",
            "text",
            "Email address",
            "Enter email",
            "We'll never share your email with anyone else."
          )}
          {this.renderTextField(
            "password",
            "password",
            "password",
            "Password",
            "Enter Password"
          )}
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Login;
