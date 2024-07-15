import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const Navbar = () => {
  const handleNotificationsClick = () => {
    console.log("Notifications clicked");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logo
        </Typography>
        <Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={handleNotificationsClick}>
            <NotificationsIcon />
          </IconButton>
          <IconButton
            component={Link}
            to="/dashboard/profile"
            size="large"
            edge="end"
            color="inherit">
            <AccountCircle />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
