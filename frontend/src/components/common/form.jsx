import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Joi from "joi";
import TextField from "./textField";

class CustomForm extends Component {
  handleChange = (e) => {
    let data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.validateField(e.currentTarget.name, e.currentTarget.value);
    this.setState({ data });
  };

  validateField = (property, val) => {
    const schema = Joi.object({
      [property]: this.schema[property],
    });
    const { error } = schema.validate({
      [property]: val,
    });
    let { errors, isSubmitVisisble } = this.state;
    if (error) {
      errors[property] = error.details[0].message;
    } else {
      errors[property] = null;
    }
    this.setState({ errors });
  };

  isFormValid = () => {
    const schema = Joi.object(this.schema);
    const { error, value } = schema.validate(this.state.data, {
      abortEarly: false,
    });
    if (error) return true;
    else return false;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.doSubmit();
  };

  renderTextField(
    id,
    name,
    type,
    label,
    placeholder,
    hint,
    isDisabled,
    error = false
  ) {
    return (
      <TextField
        id={id}
        name={name}
        type={type}
        label={label}
        placeholder={placeholder}
        hint={hint}
        isDisabled={isDisabled}
        value={this.state.data[name]}
        onChange={this.handleChange}
        error={error}
      />
    );
  }

  renderSubmitButton() {
    return (
      <Button variant="primary" type="submit" disabled={this.isFormValid()}>
        Submit
      </Button>
    );
  }
}

export default CustomForm;
