import React from "react";
import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./AuthPage.css";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <div className="AuthPage">
        <h1>Magnify Access</h1>
        <h2>Employee Accommodations</h2>
        <div className="AuthPageFormsContainer">
          {showLogin ? (
            <LoginForm setUser={setUser} />
          ) : (
            <SignUpForm setUser={setUser} />
          )}
        </div>
        <div className="changing-sign-in-button">
          <button onClick={() => setShowLogin(!showLogin)}>
            {showLogin ? "SIGN UP" : "LOG IN"}
          </button>
        </div>
      </div>
    </>
  );
}
