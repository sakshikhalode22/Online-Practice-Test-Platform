import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authenticate from "./Components/Authenticate";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dashboard from "./Components/Dashboard";

const theme = createTheme({
  palette: {
    black: {
      main: "#000000",
    },
  },

  typography: {
    fontFamily: "Roboto",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "black",
          borderColor: "black",
          "&:hover": {
            backgroundColor: "black",
            color: "white",
          },
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function App() {


  return (
    <>
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" exact element={<Authenticate />} />
          <Route path="/auth" element={<Authenticate />} />
          <Route path="/dashboard" element={<Dashboard/>}/>
        </Routes>
      </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
