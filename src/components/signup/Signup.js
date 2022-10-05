import Header from "../header/Header";
import TextField from "@mui/material/TextField";
import { Container, Button, CardContent, Card } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import './signup.css';
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const mt20 = {
    marginTop: 20,
  };

  let navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");

  let [nameError, setNameError] = useState(false);
  let [emailError, setEmailError] = useState(false);
  let [passwordError, setPasswordError] = useState(false);
  let [confirmPasswordError, setConfirmPasswordError] = useState(false);

  let signupUser = (e) => {
    e.preventDefault();

    if (
      (email.trim() === "" || password.trim() === "",
      name.trim() === "" ||
        confirmPassword.trim() === "" ||
        password.trim() !== confirmPassword.trim())
    ) {
      if (email.trim() === "") setEmailError(true);
      if (password.trim() === "") setPasswordError(true);
      if (
        confirmPassword.trim() === "" ||
        password.trim() !== confirmPassword.trim()
      )
        setConfirmPasswordError(true);
      if (name.trim() === "") setNameError(true);
    } else {
      axios
        .post(API_URL + "user/signup", { name, email, password })
        .then((response) => {
          if(response.data.successful)
          {
            navigate('/login');
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Container  >
      <Header />
      
      <Card class="card">
      <h3>Signup</h3>  
        <CardContent>
        
          <form
            id="signupForm"
            noValidate
            autoComplete="off"
            onSubmit={signupUser}
          >
            <TextField
              style={mt20}
              fullWidth
              label="Name"
              required
              onChange={(e) => setName(e.target.value)}
              error={nameError}
              variant="outlined"
            />
            <TextField
              style={mt20}
              fullWidth
              label="Email Address"
              required
              type="email"
              error={emailError}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
            />
            <TextField
              style={mt20}
              fullWidth
              label="Password"
              required
              type="password"
              error={passwordError}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <TextField
              style={mt20}
              fullWidth
              error={confirmPasswordError}
              label="Confirm Password"
              required
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Create
            </Button>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
