import React from "react";
import { Container, Box, Typography, Button, Stack } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import MailIcon from "@mui/icons-material/Mail";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Login from "./Login";


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
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
    marginBottom: 20,
  },

  error: {
    color: "red",
  },
  success: {
    color: "green",
  },
});

const Authenticate = () => {
  const dispatch=useDispatch()

  const buttonClicked = useSelector(
    (state) => state.userReducers.buttonClicked
  );

  const googleLogin =useSelector(
    (state) => state.userReducers.googleLogin
  )

  console.log(buttonClicked,googleLogin)

  const handleGoogleLogin = () => {
    dispatch({type: "GOOGLELOGIN", payload: true})
    dispatch({type: "BUTTONCLICKED", payload: true})
  };

  const handleEmailLogin = () => {
    dispatch({type: "GOOGLELOGIN", payload: false})
    dispatch({type: "BUTTONCLICKED", payload: true})
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 15,
          padding: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow:
            "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 0px 4px rgba(0, 0, 0, 0.25)",
          borderRadius: 2,
          color: "black",
        }}
      >
        <Typography
          component="h1"
          variant="h5"
          sx={{
            fontSize: "1.2 rem",
            fontWeight: "700",
            lineHeight: "1.5",
          }}
        >
          Sign In
        </Typography>
        {!buttonClicked ? (
          <>
            <Stack
              spacing={4}
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                color="black"
                sx={{
                  width: "100%",
                  borderRadius: 20,
                }}
                onClick={handleGoogleLogin}
                startIcon={<GoogleIcon />}
              >
                Sign in with Google
              </Button>
              <Button
                variant="outlined"
                color="black"
                onClick={handleEmailLogin}
                startIcon={<MailIcon />}
                sx={{
                  width: "100%",
                  borderRadius: 20,
                }}
              >
                Sign in with Email
              </Button>
            </Stack>

            <Typography
              sx={{
                marginTop: 4,
                fontSize: "0.8 rem",
                fontWeight: "400",
                lineHeight: "1.5",
              }}
            >
              No Account?{" "}
              <Link
                to="/register"
                style={{
                  textDecoration: "none",
                  color: "green",
                  fontWeight: "600",
                }}
              >
                Create One
              </Link>
            </Typography>
          </>
        ) : (
          <Login
            useStyles={useStyles}
          />
        )}
      </Box>
    </Container>
  );
};

export default Authenticate;
