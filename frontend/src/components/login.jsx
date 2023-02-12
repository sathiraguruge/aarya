import React, { Component } from "react";
import CustomForm from "./common/form";
import authService from "../services/authService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Joi from "joi";

class Login extends CustomForm {
  state = {
    data: {
      email: "",
      password: "",
    },
  };

  doSubmit = async () => {
    // this.validate();
    const { email, password } = this.state.data;
    if (await authService.login(email, password))
      this.props.onHandleLogin(true);
  };

  validate = () => {
    const { email, password } = this.state.data;
    const schema = Joi.object({
      email: Joi.string().required(),
      password: Joi.string().required(),
    });
    const { error, value } = schema.validate(
      { email, password },
      { abortEarly: false }
    );
    console.log(error);
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
