import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CalculateIcon from "@mui/icons-material/Calculate";
import { deepPurple } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Profile from "./Profile";

const pages = ["Dashboard", "Take Test"];

const Header = () => {
  const isLoggedIn = useSelector((state) => state.userReducers.isLoggedIn);
  const userInfo = useSelector((state) => state.userReducers.userLoginInfo);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = (event) => {
    event.stopPropagation();
    console.log("open");
    setOpenModal(true);
  };
  const handleClose = (event) => {
    event.stopPropagation();
    console.log("close");
    setOpenModal(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getLink = (page) => {
    let link = page.toLowerCase().replace(/\s+/g, "");
    return isLoggedIn ? `/${link}` : "/login";
  };

  const getFirstLetter = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const loggedOut = () => {
    sessionStorage.removeItem("user-login");
    window.location.reload();
  };
  return (
    <AppBar color="success" position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CalculateIcon sx={{ display: { xs: "none", md: "flex" }, mr: 2 }} />

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Brainiac
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link
                      style={{ color: "black", textDecoration: "none" }}
                      to={getLink(page)}
                    >
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <CalculateIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Brainiac
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link
                  style={{ color: "white", textDecoration: "none" }}
                  to={getLink(page)}
                >
                  {page}
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              {isLoggedIn && (
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>
                    {getFirstLetter(userInfo.name)}
                  </Avatar>
                  <Typography
                    textAlign="center"
                    sx={{
                      display: { xs: "none", md: "block" },
                      ml: 1,
                      fontWeight: 700,
                      color: "white",
                    }}
                  >
                    {userInfo.name}
                  </Typography>
                </IconButton>
              )}
            </Tooltip>
            <Menu
              sx={{
                mt: "50px",
                // increase width
                "& .MuiMenu-paper": {
                  width: "130px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  "& .MuiMenuItem-root": {
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.1)",
                    },
                  },
                },
              }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={(e) => {
                  handleCloseUserMenu();
                  handleOpen(e);
                }}
              >
                <Typography textAlign="center">
                  Profile
                  <Profile openModal={openModal} handleClose={handleClose} />
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseUserMenu();
                  loggedOut();
                }}
              >
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
