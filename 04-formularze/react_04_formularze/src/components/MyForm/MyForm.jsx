// uncontroled form elements

import { Component } from "react";

class MyForm extends Component {
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit", event);
    console.log("First Name:", event.currentTarget.elements.firstName.value);
    const formElement = event.currentTarget.elements;
    const firstName = formElement.firstName.value;
    const lastName = formElement.lastName.value;

    const userData = { firstName, lastName };

    this.props.formSubmissionHandler(userData);
  };
  render() {
    return (
      <>
        <h2>{this.props.label}</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="firstName" placeholder="First Name"></input>
          <input type="text" name="lastName" placeholder="Last Name"></input>
          <button type="submit">submit</button>
        </form>
      </>
    );
  }
}

export default MyForm;
