import React from "react";
import { useState } from "react";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import LoginForm from "../../components/LoginForm/LoginForm";

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <h1>AuthPage</h1>
      <div>
        {showLogin ? (
          <SignUpForm setUser={setUser} />
        ) : (
          <LoginForm setUser={setUser} />
        )}
      </div>
      <p>Or</p>
      <div className="changing-sign-in-button">
        <h3 onClick={() => setShowLogin(!showLogin)}>
          {showLogin ? "LOG IN" : "SIGN UP"}
        </h3>
      </div>
    </>
  );
}
