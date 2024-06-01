import React, { useState, useEffect } from "react";
import { Container, Typography, TextField, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Login = ({
  useStyles,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const googleLogin = useSelector((state) => state.userReducers.googleLogin);

  const loginURL = "http://localhost:5000/login";

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError]=useState("");
  const [btnStatus, setBtnStatus]= useState(false)

  const navigateToAuth = () => {
    dispatch({ type: "BUTTONCLICKED", payload: false });
    dispatch({ type: "GOOGLELOGIN", payload: false });
    navigate("/auth");
  };

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
      console.log(response,response.status);
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
      {/* create form using mui */}
      {!googleLogin && (
        <Container className={classes.root}>
          {
            loginError && (
              <Typography
                className={classes.error}
                sx={{
                  marginBottom:2,
                  fontSize: "0.8 rem",
                  lineHeight: "1.5",
                  fontWeight: "200",
                }}
              >
                {loginError}
              </Typography>
            )
          }
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
            }}
        disabled={!btnStatus}
            onClick={(e) => userLogin(e)}
          >
            Login
          </Button>
          <Typography
            sx={{
              marginTop: 4,
              fontSize: "0.8 rem",
              lineHeight: "1.5",
              color: "green",
              fontWeight: "600",
              cursor: "pointer",
            }}
            onClick={navigateToAuth}
          >
            <ArrowBackIosIcon
              sx={{
                position: "relative",
                top: "6px",
              }}
            />
            Back to Authentication option
          </Typography>
        </Container>
      )}
    </form>
  );
};

export default Login;
