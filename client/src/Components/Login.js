import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useStyles } from "../Utils/style";
import { loginURL } from "../Utils/Api";

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);

  useEffect(() => {
    if (state.email && state.password) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  }, [state.email, state.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const userLogin = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post(loginURL, data);
      if (response.status === 200) {
        sessionStorage.setItem(
          "user-login",
          JSON.stringify(response.data.data.user)
        );
        dispatch({ type: "USERLOGEDIN", payload: true });
        dispatch({ type: "USERINFO", payload: response.data.data.user });
        navigate("/dashboard");
      }
    } catch (error) {
      setLoginError("Invalid user, Please try again.. or register");
    }
  };

  return (
    <form>
      <Container className={classes.root}>
        {loginError && (
          <Typography
            className={classes.error}
            sx={{
              marginBottom: 2,
              fontSize: "0.8 rem",
              lineHeight: "1.5",
              fontWeight: "200",
            }}
          >
            {loginError}
          </Typography>
        )}
        <TextField
          className={classes.textField}
          label="Email"
          variant="outlined"
          type="email"
          size="small"
          name="email"
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <TextField
          className={classes.textField}
          label="Password"
          variant="outlined"
          type="password"
          size="small"
          name="password"
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <Button
          variant="outlined"
          color="black"
          sx={{
            width: "90%",
            borderRadius: 20,
            marginTop: 2,
          }}
          disabled={!btnStatus}
          onClick={(e) => userLogin(e)}
        >
          Login
        </Button>
      </Container>
    </form>
  );
};

export default Login;
