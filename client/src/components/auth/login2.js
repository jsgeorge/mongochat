import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import FormField from "../utils/form_fields";
import { validate } from "../utils/misc";
import MyButton from "../utils/button";

import { UserLogin } from "../../actions/user_actions";
class Login2 extends Component {
  state = {
    formError: false,
    formErrMsg: "",
    formdata: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter email"
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        validationMessage: ""
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter passowrd"
        },
        validation: {
          required: true
        },
        valid: false,
        validationMessage: ""
      }
    }
  };

  submitForm(event) {
    event.preventDefault();
    let dataToSubmit = {};
    let formIsValid = true;

    for (let key in this.state.formdata) {
      dataToSubmit[key] = this.state.formdata[key].value;
      formIsValid = this.state.formdata[key].valid && formIsValid;
    }
    if (formIsValid) {
      this.props.dispatch(UserLogin(dataToSubmit)).then(response => {
        if (response.payload.loginSuccess) {
          console.log(response.payload);

          this.props.history.push("/user/dashboard");
        } else {
          this.setState({
            formError: true,
            formErrMsg: "error login"
          });
        }
      });
    } else {
      this.setState({
        formError: true,
        formErrMsg: "Error. Invalid/Missing Login entries"
      });
    }
  }
  updateForm(element) {
    const newFormData = { ...this.state.formdata };
    const newElement = { ...newFormData[element.id] };
    newElement.value = element.event.target.value;

    let valiData = validate(newElement);
    newElement.valid = valiData[0];
    newElement.validationMessage = valiData[1];

    newFormData[element.id] = newElement;
    this.setState({
      formError: false,
      formdata: newFormData,
      formErrMsg: ""
    });
  }
  render() {
    return (
      <div className="signin_wrapper">
        <h2>Sign In</h2>
        <form onSubmit={event => this.submitForm(event)}>
          <div className="enroll_title">Email</div>
          <div className="enroll_input">
            <FormField
              id={"email"}
              formdata={this.state.formdata.email}
              change={element => this.updateForm(element)}
            />
            <div className="enroll_title">Password</div>
            <FormField
              id={"password"}
              formdata={this.state.formdata.password}
              change={element => this.updateForm(element)}
            />

            {this.state.formError ? (
              <div className="error_label"> {this.state.formErrMsg}</div>
            ) : null}

            <button
              onClick={event => this.submitForm(event)}
              className="button"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(Login2));
