import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";

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

const SignUp = () => {
  const classes = useStyles();

  const signUpUrl = "http://localhost:5000/addusers";

  const [showPassword, setShowPassword] = useState(false);
  const [rshowPassword, setRShowPassword] = useState(false);

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    rpassword: "",
  });
  const [errState, setErrState] = useState({
    nameErr: "",
    emailErr: "",
    passwordErr: "",
    rpasswordErr: "",
  });

  const [signUpErr, setSignUpErr] = useState("");
  const [success, setSuccess] = useState("");
  const [btnStatus, setBtnStatus] = useState(false);

  useEffect(() => {
    if (
      state.name &&
      state.email &&
      state.password &&
      state.rpassword &&
      errState.nameErr === "" &&
      errState.emailErr === "" &&
      errState.passwordErr === "" &&
      errState.rpasswordErr === ""
    ) {
      setBtnStatus(true);
    } else {
      setBtnStatus(false);
    }
  }, [state, errState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    validator(name, value);
    setState({
      ...state,
      [name]: value,
    });
  };

  const validator = (name, value) => {
    switch (name) {
      case "name":
        if (value.length < 3) {
          setErrState({
            ...errState,
            nameErr: "Name must be atleast 3 characters long",
          });
        } else {
          setErrState({
            ...errState,
            nameErr: "",
          });
        }
        break;
      case "email":
        if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
          setErrState({
            ...errState,
            emailErr: "Invalid email address",
          });
        } else {
          setErrState({
            ...errState,
            emailErr: "",
          });
        }
        break;
      case "password":
        if (
          !value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        ) {
          setErrState({
            ...errState,
            passwordErr:
              "Password should contain char, Capital, small letter, digit and should be 8 char long.",
          });
        } else {
          setErrState({
            ...errState,
            passwordErr: "",
          });
        }
        break;
      case "rpassword":
        if (value !== state.password) {
          setErrState({
            ...errState,
            rpasswordErr: "Password does not match",
          });
        } else {
          setErrState({
            ...errState,
            rpasswordErr: "",
          });
        }
        break;
      default:
        break;
    }
  };
  const userSignUp = async (e) => {
    e.preventDefault();
    setSignUpErr("");
    setSuccess("");
    const { name, email, password } = state;
    const data = {
      name,
      email,
      password,
    };
    try {
      const response = await axios.post(signUpUrl, data);
      console.log("res", response, response.status);
      if (response.status === 201) {
        setSuccess("User registered successfully");
      }
    } catch (error) {
      setSignUpErr("Email Id is already registered");
    }
  };

  return (
    <form>
      <Container className={classes.root}>
        {signUpErr && (
          <Typography
            className={classes.error}
            sx={{
              marginBottom: 2,
              fontSize: "0.8 rem",
              lineHeight: "1.5",
              fontWeight: "200",
            }}
          >
            {signUpErr}
          </Typography>
        )}

        {success && (
          <Typography
            className={classes.success}
            sx={{
              marginBottom: 2,
              fontSize: "0.8 rem",
              lineHeight: "1.5",
              fontWeight: "200",
            }}
          >
            {success}
          </Typography>
        )}

        <TextField
          className={classes.textField}
          label="Full Name"
          variant="outlined"
          error={errState.nameErr ? true : false}
          type="text"
          size="small"
          name="name"
          placeholder="John Doe"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton title={errState.nameErr} placement="top">
                  <PersonIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <TextField
          className={classes.textField}
          label="Email"
          variant="outlined"
          error={errState.emailErr ? true : false}
          type="email"
          size="small"
          name="email"
          onChange={(e) => {
            handleChange(e);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton title={errState.emailErr} placement="top">
                  <EmailIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          required
        />
        <TextField
          className={classes.textField}
          label="Password"
          variant="outlined"
          error={errState.passwordErr ? true : false}
          type={showPassword ? "text" : "password"}
          size="small"
          name="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  title={errState.passwordErr}
                  placement="top"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={(e) => {
            handleChange(e);
          }}
          required
        />
        <TextField
          className={classes.textField}
          label="Retype Password"
          variant="outlined"
          error={errState.rpasswordErr ? true : false}
          type={rshowPassword ? "text" : "password"}
          size="small"
          name="rpassword"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setRShowPassword(!rshowPassword);
                  }}
                  title={errState.rpasswordErr}
                  placement="top"
                >
                  {rshowPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
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
          onClick={(e) => userSignUp(e)}
        >
          Register
        </Button>
      </Container>
    </form>
  );
};

export default SignUp;
