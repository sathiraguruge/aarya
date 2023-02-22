import React from "react";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import Joi from "joi";
import CustomForm from "./common/form";
import authService from "../services/authService";

class Login extends CustomForm {
  state = {
    isSubmitVisisble: true,
    data: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
  };

  schema = {
    email: Joi.string().required(),
    password: Joi.string().required(),
  };

  doSubmit = async () => {
    const { email, password } = this.state.data;
    if (await authService.login(email, password)) {
      this.props.onHandleLogin(true);
      toast.info("Logged in successfully");
    }
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
    const { data, errors } = this.state;
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
            "We'll never share your email with anyone else.",
            null,
            errors.email
          )}
          {this.renderTextField(
            "password",
            "password",
            "password",
            "Password",
            "Enter Password",
            null,
            null,
            errors.password
          )}
          {this.renderSubmitButton()}
        </Form>
      </React.Fragment>
    );
  }
}

export default Login;
