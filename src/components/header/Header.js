import { useState } from "react";
import { NavLink } from "react-router-dom";
import AddNewApplication from "../addNewForm/AddNewForm";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import "./Header.css";

const Header = () => {
  let [isLogin, setIsLogin] = useState(false);

  if (sessionStorage.getItem("isLogin")) {
    setIsLogin(true);
  }

  return (
    <div className="header">
      <nav>
        <a id="title" href="#">
          Application Tracker
        </a>
        {!isLogin && (
          <ul>
            <li>
              <NavLink to={<Login />}>Login</NavLink>
            </li>
            <li>
              <NavLink to={<Signup />}>Signup</NavLink>
            </li>
          </ul>
        )}
        {isLogin && (
          <ul>
            <li>
              <NavLink to={<AddNewApplication />}>Applications</NavLink>
            </li>
            <li>
              <NavLink to={<AddNewApplication />}>Add New</NavLink>
            </li>
            <li>
              <NavLink to={<Signup />}>Logout</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
