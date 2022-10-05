import Header from "../header/Header";
import TextField from "@mui/material/TextField";
import { Container, Button, Card, CardContent } from "@mui/material";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const mt20 = {
    marginTop: 20,
  };

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let navigate = useNavigate();

  let [emailError, setEmailError] = useState(false);
  let [passwordError, setPasswordError] = useState(false);

  let loginUser = (e) => {
    e.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      if (email.trim() === "") setEmailError(true);
      if (password.trim() === "") setPasswordError(true);
      return;
    } else {
      axios
        .post(API_URL + "user/login", { email, password })
        .then((response) => {
          console.log(response);
          sessionStorage.setItem("token", response.data.data.token);
          sessionStorage.setItem(
            "user",
            JSON.stringify(response.data.data.user)
          );
          navigate("/applications");
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Container className="container">
      <Header />
      <Card class ="card">
        <CardContent>
          <form
            id="loginForm"
            noValidate
            autoComplete="off"
            onSubmit={loginUser}
          >
            <h3>Login</h3>
            <TextField
              style={mt20}
              fullWidth
              label="Email Address"
              required
              type={email}
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              style={mt20}
              fullWidth
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
              error={passwordError}
              type="password"
              variant="outlined"
            />
            <Button
              type="submit"
              variant="contained"
              style={{
                marginTop: 20,
                float: "right",
              }}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
