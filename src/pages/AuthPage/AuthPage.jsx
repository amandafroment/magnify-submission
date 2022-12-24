import React from "react";
import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";
import img from "../../images/magnify_access_logo.jpg";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <div className="AuthPage">
        <img className="logo" src={img}></img>
        <h2>EMPLOYEE ACCOMMODATIONS</h2>
        <div className="AuthPageFormsContainer">
          {showLogin ? (
            <LoginForm setUser={setUser} />
          ) : (
            <SignUpForm setUser={setUser} />
          )}
          <div>
            <button onClick={() => setShowLogin(!showLogin)}>
              {showLogin ? "SIGN UP" : "LOG IN"}
            </button>
          </div>
        </div>
      </div>
      <footer></footer>
    </>
  );
}
