import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  Avatar,
  Button,
  Drawer,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "./Sidebar.scss";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/LoginSlice";

const Sidebar: React.FC<{
  userName: string;
  userAvatar?: string;
}> = ({ userName, userAvatar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSignOut = () => {
    dispatch(logout());
    navigate("/");
  };
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <div className="SidebarContainer" onClick={toggleDrawer(false)}>
      <div className="container">
        <div className="UserInfoContainer">
          <Avatar alt={userName} src={userAvatar} className="UserAvatar" />
          <div className="UserName">{userName}</div>
        </div>
        <List component="nav">
          <div className="nav-side">
            <ListItem className="sidebar-item" component={Link} to="/dashboard">
              <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem
              className="sidebar-item"
              component={Link}
              to="/dashboard/developers">
              <ListItemText primary="Developers" />
            </ListItem>
            <ListItem
              className="sidebar-item"
              component={Link}
              to="/dashboard/programs">
              <ListItemText primary="Programs" />
            </ListItem>
            <ListItem
              className="sidebar-item"
              component={Link}
              to="/dashboard/projects">
              <ListItemText primary="Projects" />
            </ListItem>
            <ListItem
              className="sidebar-item"
              component={Link}
              to="/dashboard/customers">
              <ListItemText primary="Customers" />
            </ListItem>
            <ListItem
              className="sidebar-item"
              component={Link}
              to="/dashboard/sales">
              <ListItemText primary="Sales" />
            </ListItem>
          </div>
        </List>
      </div>
      <Button fullWidth variant="outlined" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuOutlinedIcon />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default Sidebar;
