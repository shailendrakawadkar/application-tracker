import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AddNewApplication from "../addNewForm/AddNewForm";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import "./Header.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { IconButton } from "@mui/material";

const Header = () => {
  let [isLogin, setIsLogin] = useState(false);

  React.useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    }
  }, []);

  let handleLogout = () => {
    sessionStorage.clear();
    setIsLogin(false);
  };

  return (
    <div className="header">
      <nav>
        <a id="title" href="#">
          Application Tracker
        </a>
        {!isLogin && (
          <ul>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Signup</NavLink>
            </li>
          </ul>
        )}
        {isLogin && (
          <ul>
            <li>
              <IconButton
                color="primary"
                onClick={handleLogout}
                size="small"
              >
                <LogoutIcon />
              </IconButton>
            </li>
            <li>
              <NavLink to={<AddNewApplication />}>Add New</NavLink>
            </li>
            <li>
              <NavLink to={<AddNewApplication />}>Applications</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
