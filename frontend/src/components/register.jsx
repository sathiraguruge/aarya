import React, { Component } from "react";
import TextField from "./common/textField";
import CustomForm from "./common/form";
import Joi from "joi";
import Form from "react-bootstrap/Form";

class Register extends CustomForm {
  state = {
    data: {
      firstname: "",
      lastname: "",
      phone: "",
      address: "",
      zipcode: "",
      email: "",
      password: "",
    },
    errors: {
      firstname: "",
      lastname: "",
      phone: "",
      address: "",
      zipcode: "",
      email: "",
      password: "",
    },
  };

  schema = {
    firstname: Joi.string().min(5).max(10).required(),
    lastname: Joi.string().min(5).max(10).required(),
    phone: Joi.string().min(10).max(10).optional(),
    address: Joi.string().min(8).max(50).optional(),
    zipcode: Joi.number().integer().optional(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(8).required(),
  };

  doSubmit = async () => {};

  render() {
    const { data, errors } = this.state;
    return (
      <React.Fragment>
        <h1>Register</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderTextField(
            "firstname",
            "firstname",
            "text",
            "First Name",
            "Chris",
            null,
            null,
            errors.firstname
          )}
          {this.renderTextField(
            "lastname",
            "lastname",
            "lastname",
            "Last Name",
            "Damian",
            null,
            null,
            errors.lastname
          )}
          {this.renderTextField(
            "phone",
            "phone",
            "phone",
            "Phone Number",
            "0775423617",
            null,
            null,
            errors.phone
          )}
          {this.renderTextField(
            "address",
            "address",
            "address",
            "Address",
            "234, Main Street, Colombo",
            null,
            null,
            errors.address
          )}
          {this.renderTextField(
            "zipcode",
            "zipcode",
            "zipcode",
            "Zip Code",
            "10652",
            null,
            null,
            errors.zipcode
          )}
          {this.renderTextField(
            "email",
            "email",
            "email",
            "Email",
            "someone@gmail.com",
            null,
            null,
            errors.email
          )}
          {this.renderTextField(
            "password",
            "password",
            "password",
            "Password",
            null,
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

export default Register;
