import React from "react";
import { Link } from "react-router-dom";
import * as userService from "../../utilities/users-service";
import "./NavBar.css";
import img from "../../images/magnify_access_logo.jpg";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    // Delegate to the users-service
    userService.logOut();
    // Update state will also cause a re-render
    setUser(null);
  }

  return (
    <nav>
      <img src={img}></img>
      <div className="nav-div-container">
        {user && <span className="username">Hello, {user.name}</span>}
        &nbsp;{" "}
        <Link to="" onClick={handleLogOut} className="link">
          Log Out
        </Link>
      </div>
    </nav>
  );
}
