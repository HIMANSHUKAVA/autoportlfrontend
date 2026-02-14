import {
  Add,
  AddAPhotoOutlined,
  AssignmentTurnedIn,
  ExpandLess,
  ExpandMore,
  Settings,
  TimeToLeave,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Collapse,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import React, { useState } from "react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import PaymentIcon from "@mui/icons-material/Payment";
import CallIcon from "@mui/icons-material/Call";
export default function Layout() {
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
  const [buyer, setbuyer] = useState(null);
  const [old, setold] = useState(null);
  const [buyercollapse, setbuyercollapse] = useState(false);
  const [sellarcollapse, setsellarcollapse] = useState(false);
  const [admin, setadmin] = useState(false);

  const s = (
    <>
      <Menu
        anchorEl={buyer}
        open={buyer}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        onClose={() => {
          setbuyer(null);
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
        <MenuItem component={Link} to="/admin/add">
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText>Add New Car</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setbuyer(null)}>
          <ListItemIcon>
            <DirectionsCarIcon />
          </ListItemIcon>
          <ListItemText>View New Car</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setbuyer(null)} component={Link} to="/admin/view/Booking/list">
          <ListItemIcon>
            <TimeToLeave />
          </ListItemIcon>
          <ListItemText>Book Drive</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setbuyer(null)} component={Link} to="/admin/view/new/car/payment">
          <ListItemIcon>
            <PaymentIcon />
          </ListItemIcon>
          <ListItemText>Payment</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setbuyer(null)} component={Link} to="/admin/view/quary/buyer">
          <ListItemIcon>
            <CallIcon />
          </ListItemIcon>
          <ListItemText>Contect</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );

  const p = (
    <>
      <Menu
        anchorEl={old}
        open={old}
        onClose={() => {
          setold(null);
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
        <MenuItem onClick={() => setold(null)} component={Link} to="/admin/view/request/sellar" >
          <ListItemIcon>
            <AssignmentTurnedIn />
          </ListItemIcon>
          <ListItemText>Car request</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => setold(null)}>
          <ListItemIcon>
            <CallIcon />
          </ListItemIcon>
          <ListItemText>Contect</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
  const [open, setopen] = useState(null);
  const [mobaildrawer, setmobaildrawer] = useState(null);
  const [profile, setprofile] = useState(false);
  const [buttonprofile, setbuttonprofile] = useState(null);
  const draweritem = (
    <>
      {/* <Toolbar /> */}
      <Toolbar />
      <div
        style={{
          width: "220px",
          padding: "10px",
        }}
      >
        <List
        sx={{
          display:"flex",
          flexDirection:"column",
          mt:2 ,
          gap:1
        }}
        >
          <ListItemButton component={Link} to="/admin/dash">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText>Dashboard</ListItemText>
          </ListItemButton>

          <ListItemButton onClick={() => setbuyercollapse(!buyercollapse)}>
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText>Buyer Side</ListItemText>
            {buyercollapse ?
              <ExpandLess />
            : <ExpandMore />}
          </ListItemButton>
          <Collapse in={buyercollapse} timeout="auto" unmountOnExit>
            <List
              component="div"
              disablePadding
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: "column",
                mt: 2,
              }}
            >
              <ListItemButton sx={menuButtonStyle} component={Link} to="/admin/add">
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText>Add New Car</ListItemText>
              </ListItemButton>

              <ListItemButton sx={menuButtonStyle} component={Link}>
                <ListItemIcon>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText>View New Car</ListItemText>
              </ListItemButton>

              <ListItemButton sx={menuButtonStyle} component={Link} to="/admin/view/Booking/list">
                <ListItemIcon>
                  <AddAPhotoOutlined />
                </ListItemIcon>
                <ListItemText>Book Drive</ListItemText>
              </ListItemButton>

              <ListItemButton sx={menuButtonStyle} component={Link} to="/admin/view/new/car/payment">
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                <ListItemText>Payment</ListItemText>
              </ListItemButton>

              <ListItemButton sx={menuButtonStyle} component={Link} to="/admin/view/quary/buyer">
                <ListItemIcon>
                  <CallIcon />
                </ListItemIcon>
                <ListItemText>Contect</ListItemText>
              </ListItemButton>
            </List>
          </Collapse>

          <ListItemButton onClick={() => setsellarcollapse(!sellarcollapse)}>
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText>Sellar side</ListItemText>
            {sellarcollapse ?
              <ExpandLess />
            : <ExpandMore />}
          </ListItemButton>
          <Collapse in={sellarcollapse} unmountOnExit timeout="auto">
            <ListItemButton component={Link} to="/admin/view/request/sellar">
              <ListItemIcon>
                <AssignmentTurnedIn />
              </ListItemIcon>
              <ListItemText>Car request</ListItemText>
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <CallIcon />
              </ListItemIcon>
              <ListItemText>Contect</ListItemText>
            </ListItemButton>
          </Collapse>

          <ListItemButton onClick={() => setadmin(!admin)}>
            <ListItemIcon>
              <AddCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText>Admin</ListItemText>
            {admin ?
              <ExpandLess />
            : <ExpandMore />}
          </ListItemButton>
          <Collapse in={admin} unmountOnExit timeout="auto">
            <ListItemButton component={Link} to="/admin/add/admin">
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText>Add</ListItemText>
            </ListItemButton>

            <ListItemButton component={Link} to="/admin/view/admin/list">
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText>View Admin</ListItemText>
            </ListItemButton>
          </Collapse>

          <ListItemButton
            onClick={() => {
              setprofile(!profile);
            }}
          >
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
            {profile ?
              <ExpandLess />
            : <ExpandMore />}
          </ListItemButton>
          <Collapse in={profile} unmountOnExit timeout="auto">
            <ListItemButton>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText>Edit Profile</ListItemText>
            </ListItemButton>

            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText>Change Password</ListItemText>
            </ListItemButton>
          </Collapse>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </List>
      </div>
    </>
  );
  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          background: "linear-gradient(180deg, #0B1220 0%, #0E1A2B 100%)",
          color: "#FFFFFF",
          fontFamily: `'Inter', sans-serif`,
        }}
      >
        <AppBar
          sx={{
            background: "linear-gradient(90deg, #0B1220, #1A233A)",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ color: "#f5c46b", fontWeight: "bold", flexGrow: 1 }}
            >
              AUTO PORTAL
            </Typography>

            <IconButton>
              <Avatar
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: "#f5c46b",
                  color: "#0B1220",
                  fontWeight: "bold",
                }}
                src=""
              />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            position: "fixed",
            top: 67,
            left: 0,
            height: "2px",
            width: "100%",
            background:
              "linear-gradient(90deg, transparent, #f5c46b, #4fa3ff, transparent)",
            zIndex: (theme) => theme.zIndex.drawer + 2,
          }}
        />

        <AppBar
          sx={{
            top: 70,
            height: 70,
            background: "linear-gradient(90deg, #0B1220, #1A233A)",
            zIndex: (theme) => theme.zIndex.drawer + 2,
          }}
        >
          <Toolbar>
            {/* menu button */}
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

            {/* navbars */}
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                // flexGrow: 1,
              }}
            >
              <Button
                color="inherit"
                sx={menuButtonStyle}
                endIcon={<DashboardIcon sx={{ color: "#f5c46b" }} />}
                component={Link}
                to="/admin/dash"
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                sx={menuButtonStyle}
                onClick={(e) => {
                  setbuyer(e.currentTarget);
                }}
              >
                Buyer Side
                {buyer ?
                  <ExpandLess />
                : <ExpandMore />}

              </Button>
              {s}

              <Button
                color="inherit"
                sx={menuButtonStyle}
                onClick={(e) => setold(e.currentTarget)}
              >
                Sellar Side
                {old ?
                  <ExpandLess />
                : <ExpandMore />}
              </Button>
              {p}
              <Button
                color="inherit"
                sx={menuButtonStyle}
                startIcon={<PersonOutlineIcon sx={{ color: "#f5c46b" }} />}
                onClick={(e) => setbuttonprofile(e.currentTarget)}
              >
                Profile
                {buttonprofile ? <ExpandLess/> : <ExpandMore/>}
              </Button>

              <Menu
                anchorEl={buttonprofile}
                onClose={() => setbuttonprofile(null)}
                open={buttonprofile}
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
                <MenuItem onClick={() => setbuttonprofile(null)}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText>Edit Profile</ListItemText>
                </MenuItem>

                <MenuItem onClick={() => setbuttonprofile(null)}>
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText>Change password</ListItemText>
                </MenuItem>
              </Menu>



              <Button
                color="inherit"
                sx={menuButtonStyle}
                endIcon={<LogoutIcon sx={{ color: "#f5c46b" }} />}
              >
                Logout
              </Button>

            </Box>
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
            p: 3,
          }}
        >
          <Toolbar/>
          {draweritem}
        </Drawer>
<Box
        component="main"
        sx={{
          ml: { xs: 0, md: "220px" },
          mt: "140px", // 64 + 2 + 64 = ~130px
          px: { xs: 2, md: 3 },
          minHeight: "100vh",
        }}
      >
        <Outlet />
      </Box>
      </Box>

    </>
  );
}
