import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import EmailIcon from "@mui/icons-material/Email";
import { ExpandLess, ExpandMore, Mail, Settings } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import {
  showConfirmAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../../Util/Alert";
import axios from "axios";
export default function NavbarAndDrawer() {
  const menuButtonStyle = {
    position: "relative",
    overflow: "visible",
    textTransform: "none",
    fontWeight: 500,
    mx: 1,

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      bottom: -6,
      width: "0%",
      height: "2px",
      backgroundColor: "#f5c46b",
      transition: "width 0.3s ease",
    },

    "&:hover::after": {
      width: "100%",
    },

    "&:hover": {
      backgroundColor: "transparent",
      color: "#f5c46b",
    },
  };

  const handllogout = () => {
    showConfirmAlert(
      "Logout",
      "Do you really want to logout?",
      "Logout",
      "Stay"
    ).then((res) => {
      if (res.isConfirmed) {
        navigate("/");
      }
    });
  };
  // create the open drawer state

  const [open, setopen] = useState(null);
  const [mobaildrawer, setmobaildrawer] = useState(null);

  // submenu state
  const [profile, setprofile] = useState(false);
  const handlopen = () => {
    setprofile(!profile);
  };
  const [buttonprofile, setbuttonprofile] = useState(null);

  const photo = localStorage.getItem("photo");

  console.log(photo);

  const username = localStorage.getItem("username");

  const photourl = photo ? `http://localhost:3000/images/${photo}` : "";

  const draweritem = (
    <>
      <Toolbar />
      <Toolbar />
      <div style={{ width: 220, padding: "10px" }}>
        <List
          sx={{
            display: "flex",
            gap: 1,
            flexDirection: "column",
            mt: 2,
          }}
        >
          <ListItemButton
            sx={menuButtonStyle}
            component={Link}
            to="/sellardashboard"
          >
            <ListItemIcon color="white">
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton sx={menuButtonStyle} component={Link} to="/addcar">
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Add Vehicle" />
          </ListItemButton>

          <ListItemButton sx={menuButtonStyle} component={Link} to="/viewcar">
            <ListItemIcon>
              <DirectionsCarIcon />
            </ListItemIcon>
            <ListItemText primary="My Vehicle" />
          </ListItemButton>

          <ListItemButton sx={menuButtonStyle} component={Link} to="/message">
            <ListItemIcon>
              <Mail />
            </ListItemIcon>
            <ListItemText primary="Message" />
          </ListItemButton>

          <ListItemButton onClick={handlopen} sx={menuButtonStyle}>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
            {profile ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={profile} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {/* <SubMenuItem icon={<EditIcon />} text="Edit Profile" />
              <SubMenuItem icon={<LockResetIcon />} text="Change Password" /> */}

              <ListItemButton
                sx={menuButtonStyle}
                onClick={() => {
                  setopen(false);
                  navigate(`/editprofile/${localStorage.getItem("user_id")}`);
                }}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>

              <ListItemButton
                sx={menuButtonStyle}
                onClick={() => {
                  setopen(false);
                  navigate("/changepass");
                }}
              >
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText primary="Change Password" />
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton sx={menuButtonStyle} onClick={handllogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </div>
    </>
  );

  const navigate = useNavigate();
  return (
    <Box
      sx={{
        // minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(180deg, #0B1220 0%, #0E1A2B 100%)",
        color: "#FFFFFF",
        fontFamily: `'Inter', sans-serif`,
      }}
    >
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          height: 70,
          justifyContent: "center",
          background: "linear-gradient(90deg, #0B1220, #1A233A)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            sx={{ color: "#f5c46b", fontWeight: "bold", flexGrow: 1 }}
          >
            AUTO PORTAL
          </Typography>
          <Typography variant="body1">
            Welcome {localStorage.getItem("username")}
            <br />
            Role : {localStorage.getItem("role")}
          </Typography>
          <IconButton
            component={Link}
            to={`/editprofile/${localStorage.getItem("user_id")}`}
          >
            <Avatar
              sx={{
                bgcolor: "#f5c46b",
                color: "#0B1220",
                fontWeight: "bold",
                height: 46,
                width: 46,
              }}
              src={photourl}
              // src={localStorage.getItem("username").charAt(0)}
            >
              {!photo && username?.charAt(0).toUpperCase()}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          position: "fixed",
          top: 70,
          left: 0,
          height: "2px",
          width: "100%",
          background:
            "linear-gradient(90deg, transparent, #f5c46b, #4fa3ff, transparent)",
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      />

      <AppBar
        position="fixed"
        sx={{
          top: 70,
          height: 70,
          background: "linear-gradient(90deg, #0B1220, #1A233A)",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
            sx={{
              display: { xs: "flex", md: "none" },

              mr: 2,
            }}
            onClick={() => {
              setmobaildrawer(true);
            }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              color="inherit"
              className="navbar_button"
              sx={menuButtonStyle}
              onClick={() => {
                navigate("/sellardashboard");
              }}
            >
              Dashboard
            </Button>
            <Button
              sx={menuButtonStyle}
              color="inherit"
              onClick={() => {
                navigate("/addcar");
              }}
            >
              Add Vehicle
            </Button>
            <Button
              color="inherit"
              sx={menuButtonStyle}
              onClick={() => {
                navigate("/viewcar");
              }}
            >
              My Vehicles
            </Button>
            <Button
              color="inherit"
              sx={menuButtonStyle}
              onClick={() => {
                navigate("/message");
              }}
            >
              Message
            </Button>
            <Button
              color="inherit"
              sx={menuButtonStyle}
              onClick={(e) => setbuttonprofile(e.currentTarget)}
            >
              Profile
            </Button>
            <Menu
              anchorEl={buttonprofile}
              open={buttonprofile}
              onClose={() => {
                setbuttonprofile(null);
              }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "#0B1220",
                  color: "#ffffff",
                },
                "& .MuiListItemIcon-root": {
                  color: "#f5c46b",
                  minWidth: 40,
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  setbuttonprofile(null);
                  navigate(`/editprofile/${localStorage.getItem("user_id")}`);
                }}
              >
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText>Edit Profile</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  setbuttonprofile(null);

                  navigate("/changepass");
                }}
              >
                <ListItemIcon>
                  <Settings />
                </ListItemIcon>
                <ListItemText>Change Password</ListItemText>
              </MenuItem>
            </Menu>
            <Button color="inherit" sx={menuButtonStyle} onClick={handllogout}>
              Logout
            </Button>
          </Box>

          {/* <Box
            sx={{
              display: "flex",
              ml: "auto",
            }}
          >
            <IconButton>
              <NotificationsIcon sx={{ color: "yellow" }} fontSize="large" />
            </IconButton>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: "1px solid white",
                width: 200,
                justifyContent: "center",
                borderRadius: "4px",
              }}
            >
              <Typography
                sx={{
                  color: "white",
                }}
              >
                Ankit
              </Typography>
            </Box>
          </Box> */}
        </Toolbar>
      </AppBar>
      <Drawer
        open={open}
        onClose={() => {
          setopen(null);
        }}
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            background: "linear-gradient(180deg, #0B1220 0%, #0E1A2B 100%)",
            color: "#fff",
          },
          "& .MuiListItemIcon-root": {
            color: "#f5c46b",
            minWidth: 40,
          },
        }}
      >
        {draweritem}
      </Drawer>

      <Drawer
        open={mobaildrawer}
        onClose={() => setmobaildrawer(false)}
        sx={{
          display: { xs: "flex", md: "none" },
          "& .MuiDrawer-paper": {
            background: "linear-gradient(180deg, #0B1220 0%, #0E1A2B 100%)",
            color: "#fff",
          },
          "& .MuiListItemIcon-root": {
            color: "#f5c46b",
            minWidth: 40,
          },
        }}
      >
        {draweritem}
      </Drawer>
    </Box>
  );
}
