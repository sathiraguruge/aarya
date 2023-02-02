import React, { Component } from "react";
import TextField from "./common/textField";

class Register extends Component {
  state = {
    userCredentials: {
      username: "",
      password: "",
    },
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted");
  };

  handleChange = (e) => {
    let userCredentials = { ...this.state.userCredentials };
    userCredentials[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ userCredentials });
  };

  render() {
    const { userCredentials } = this.state;

    return (
      <React.Fragment>
        <h1>Register</h1>
        <form>
          <TextField
            id="username"
            name="username"
            type="text"
            value={userCredentials.username}
            onChange={this.handleChange}
          />
          <input
            id="password"
            name="password"
            type="password"
            value={userCredentials.password}
            onChange={this.handleChange}
          />
          <input type="submit" name="Login" value="Login" />
        </form>
      </React.Fragment>
    );
  }
}

export default Register;
