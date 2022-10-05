import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AddNewApplication from "../addNewForm/AddNewForm";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import "./Header.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, IconButton } from "@mui/material";

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
              <Button
                color="primary"
                onClick={handleLogout}
                size="small"
              >
                Logout
              </Button>
            </li>
            <li>
              <NavLink to="/application/add">Add New</NavLink>
            </li>
            <li>
              <NavLink to="/applications">Applications</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Header;
