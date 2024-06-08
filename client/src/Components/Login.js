import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    display: "flex !important",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    padding: 10,
    width: "100%",
  },
  title: {
    fontSize: 30,
    fontWeight: "lighter",
    color: "#ac8971",
    textAlign: "center",
    fontFamily: "Brush Script MT",
  },

  textField: {
    display: "flex",
    margin: "10px !important",
  },

  error: {
    color: "red",
  },
  success: {
    color: "green",
  },
});

const Login = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const loginURL = "http://localhost:5000/login";

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
      console.log(response, response.status);
      if (response.status === 200) {
        sessionStorage.setItem("user-login", JSON.stringify(response.data));
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
