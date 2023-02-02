import React, { Component } from "react";
import TextField from "./textField";

class Form extends Component {
  state = {
    data: {
      username: "",
      password: "",
    },
  };

  handleChange = (e) => {
    let data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.doSubmit();
  };

  renderTextField(id, name, type) {
    return (
      <TextField
        id={id}
        name={name}
        type={type}
        value={this.state.data[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
