import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { CssBaseline } from "@mui/material";
import { Link } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import Login from "./Login";

const SignUp = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      dispatch({ type: "GOOGLELOGIN", payload: true });
      window.open("http://localhost:5000/auth/google/callback", "_self");
    }, 2000);
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

        <Login />
        <Button
          variant="outlined"
          color="black"
          onClick={handleGoogleLogin}
          startIcon={<GoogleIcon />}
          sx={{
            width: "100%",
            borderRadius: 20,
          }}
        >
          {loading ? <CircularProgress size={24} /> : "Sign in with Google"}
        </Button>

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
      </Box>
    </Container>
  );
};

export default SignUp;
