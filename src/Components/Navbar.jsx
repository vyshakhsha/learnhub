import * as React from "react";
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
import LocalLibrary from "@mui/icons-material/LocalLibrary";
import { useSelector } from "react-redux";
import CartIcon from "./CartIcon";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const auth = useSelector((state) => state.user.auth);
  const auth = getAuth();
  const navigate = useNavigate();
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
  const handleNavigateHome = () => {
    navigate("/Home");
  };
  const handleNavigateMycourses = () => {
    navigate("/MyCourses");
  };
  const handleLogout = async () => {
    try {
      console.log("I have clicked");
      await auth.signOut();
      console.log("User logout susccessfully !");
      window.location.href = "/Login";
    } catch (error) {
      console.log(error);
    }
  };
  const userData = useSelector((state) => state.user.userData);
  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalLibrary sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
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
            LearnHub
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", alignItems: "center" },
            }}
          >
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <MenuItem onClick={handleNavigateHome}>
                <Typography sx={{ textAlign: "center" }}>HOME</Typography>
              </MenuItem>
              <MenuItem onClick={handleNavigateMycourses}>
                <Typography sx={{ textAlign: "center" }}>MY COURSES</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <LocalLibrary sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" },
            }}
          >
            LearnHub
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={handleNavigateHome}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              HOME
            </Button>
            <Button
              onClick={handleNavigateMycourses}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              MY COURSES
            </Button>
          </Box>
          {userData.userType === "Student" ? (
            <div className="cart">
              <CartIcon sx={{ fontSize: "small" }} />
            </div>
          ) : null}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={userData.userName.toUpperCase()}
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: { xs: 30, sm: 40, md: 45 }, // Adjust for each breakpoint
                    height: { xs: 30, sm: 40, md: 45 },
                  }}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
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
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography sx={{ textAlign: "center" }} onClick={handleLogout}>
                  Logout
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
