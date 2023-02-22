import React, { Component } from "react";
import userService from "../services/userService";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CustomForm from "./common/form";

class Profile extends CustomForm {
  state = {
    data: {
      firstname: "",
      lastname: "",
      phone: "",
      address: "",
      zipcode: "",
      email: "",
    },
  };

  async componentDidMount() {
    const data = await userService.getUserDetails();
    this.setState({ data });
  }

  render() {
    return (
      <React.Fragment>
        <h1>Profile</h1>
        <Form onSubmit={this.handleSubmit}>
          {this.renderTextField(
            "email",
            "fname",
            "fname",
            "Email Address",
            this.state.data.email,
            "",
            true
          )}
          {this.renderTextField(
            "fname",
            "fname",
            "text",
            "First Name",
            this.state.data.firstname,
            "",
            true
          )}
          {this.renderTextField(
            "lname",
            "lname",
            "text",
            "Last Name",
            this.state.data.lastname,
            "",
            true
          )}
          {this.renderTextField(
            "phone",
            "phone",
            "text",
            "Phone Number",
            this.state.data.phone,
            "",
            true
          )}
          {this.renderTextField(
            "address",
            "address",
            "text",
            "Address",
            this.state.data.address,
            "",
            true
          )}
          {this.renderTextField(
            "zipCode",
            "zipCode",
            "text",
            "Zip Code",
            this.state.data.zipcode,
            "",
            true
          )}
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </React.Fragment>
    );
  }
}

export default Profile;
