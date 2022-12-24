import React, { Component } from "react";
import { signUp } from "../../utilities/users-service";
import "./SignUpForm.css";

export class SignUpForm extends Component {
  state = {
    name: "",
    is_hr: false,
    email: "",
    password: "",
    confirm: "",
    error: "",
  };

  handleChange = (e) => {
    //it will take our existing state and identify the differences
    this.setState({
      [e.target.name]: e.target.value, //the name key will be updated, and doesnt touch anything else in our state object
      error: "",
    });
  };

  handleCheckChange = (e) => {
    this.setState({
      [e.target.name]: e.target.checked,
      error: "",
    });
  };

  handleSubmit = async (e) => {
    // Prevent form from being submitted to the server
    e.preventDefault();
    try {
      // We don't want to send the 'error' or 'confirm' property,
      //  so let's make a copy of the state object, then delete them
      const formData = { ...this.state }; // we don't want to mutate state/the original object, so we're creating a new object to mutate/change it by putting it in a variable
      delete formData.error;
      delete formData.confirm;

      const user = await signUp(formData);
      this.props.setUser(user);
    } catch (err) {
      this.setState({ error: "Sign Up Failed- Try Again" });
    }
  };

  render() {
    const disable = this.state.password !== this.state.confirm;
    return (
      <>
        <div>
          <div className="signup-form-container">
            <form
              autoComplete="off"
              onSubmit={this.handleSubmit}
              className="signup-form"
            >
              <label>NAME</label>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />
              <label>PLEASE CHECK IF YOU ARE HR</label>
              <input
                type="checkbox"
                name="is_hr"
                value={this.state.is_hr}
                onChange={this.handleCheckChange}
              ></input>
              <label>EMAIL</label>
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <label>PASSWORD</label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <label>CONFIRM PASSWORD</label>
              <input
                type="password"
                name="confirm"
                value={this.state.confirm}
                onChange={this.handleChange}
                required
              />
              <button type="submit" disabled={disable}>
                SIGN UP
              </button>
            </form>
          </div>
          {this.state.error ? (
            <p className="error-message">&nbsp;{this.state.error}</p>
          ) : (
            <span></span>
          )}
        </div>
        <footer></footer>
      </>
    );
  }
}

export default SignUpForm;
