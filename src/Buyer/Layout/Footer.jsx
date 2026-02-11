import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CarRepairIcon from "@mui/icons-material/CarRepair";
import BuildIcon from "@mui/icons-material/Build";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import LocationIcon from "@mui/icons-material/LocationOn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
export default function Footer() {
  return (
    <>
      <Box
        sx={{
          background: "linear-gradient(135deg, #020617, #020617)",
          // minHeight: "100vh",
          color: "#cbd5f5",
          borderTop: "1px solid rgba(148,163,184,0.2)",
          py: 6,
          px: { xs: 2, md: 6 },
        }}
      >
        <Grid container spacing={6}>
          {/* autp portl area */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4">AUTO PORTAL</Typography>
            <Typography
              variant="body2"
              sx={{ lineHeight: 1.7, maxWidth: 320, mt: 1 }}
            >
              Premium Car Buying, Selling, Service and loak Solutions All In One
              Trusted Platform
            </Typography>
          </Grid>

          {/* Quick Links */}

          <Grid item xs={12} md={4}>
            <Typography variant="h4">Quick Links</Typography>
            <List>
              <ListItem
                sx={{
                  cursor: "pointer",
                  "&: hover": {
                    color: "#38bdf8",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText>DashBoard</ListItemText>
              </ListItem>

              <ListItem
                sx={{
                  cursor: "pointer",
                  "&: hover": {
                    color: "#38bdf8",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <DirectionsCarIcon />
                </ListItemIcon>
                <ListItemText>New Cars</ListItemText>
              </ListItem>

              <ListItem
                sx={{
                  cursor: "pointer",
                  "&: hover": {
                    color: "#38bdf8",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <CarRepairIcon />
                </ListItemIcon>
                <ListItemText>Old Cars</ListItemText>
              </ListItem>

              <ListItem
                sx={{
                  cursor: "pointer",
                  "&: hover": {
                    color: "#38bdf8",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <BuildIcon />
                </ListItemIcon>
                <ListItemText>Services</ListItemText>
              </ListItem>

              <ListItem
                sx={{
                  cursor: "pointer",
                  "&: hover": {
                    color: "#38bdf8",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <ContactMailIcon />
                </ListItemIcon>
                <ListItemText>Contact</ListItemText>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h4">Conact Us</Typography>
            <List>
              <ListItem
                sx={{
                  cursor: "pointer",
                  "&: hover": {
                    color: "#38bdf8",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <LocationIcon />
                </ListItemIcon>
                <ListItemText>Bhavnagar Gujrat</ListItemText>
              </ListItem>

              <ListItem
                sx={{
                  cursor: "pointer",
                  "&: hover": {
                    color: "#38bdf8",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <CallIcon />
                </ListItemIcon>
                <ListItemText>(+31) 9870542210</ListItemText>
              </ListItem>

              <ListItem
                sx={{
                  cursor: "pointer",
                  "&: hover": {
                    color: "#38bdf8",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>kavahimanshu24@gmail.com</ListItemText>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h4">Follow Us</Typography>
            <Box>
              <IconButton
                sx={{
                  color: "#38bdf8",
                  "&:hover": {
                    transform: "scale(1.2)",
                    boxShadow: "0 0 12px #38bdf8",
                  },
                }}
              >
                <FacebookIcon fontSize="large" />
              </IconButton>

              <IconButton
                sx={{
                  color: "#38bdf8",
                  "&:hover": {
                    transform: "scale(1.2)",
                    boxShadow: "0 0 12px #38bdf8",
                  },
                }}
              >
                <TwitterIcon fontSize="large" />
              </IconButton>
              <br />
              <IconButton
                sx={{
                  color: "#38bdf8",
                  "&:hover": {
                    transform: "scale(1.2)",
                    boxShadow: "0 0 12px #38bdf8",
                  },
                }}
              >
                <InstagramIcon fontSize="large" />
              </IconButton>

              <IconButton
                sx={{
                  color: "#38bdf8",
                  "&:hover": {
                    transform: "scale(1.2)",
                    boxShadow: "0 0 12px #38bdf8",
                  },
                }}
              >
                <YouTubeIcon fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            borderTop: "1px solid rgba(148,163,184,0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            py: 2,
          }}
        >
          <Typography
            sx={{
              mt: 2,
            }}
          >
            © 2024 Auto Portal. All Rights Reserved.
          </Typography>

          <Typography
            sx={{
              mt: 2,
            }}
          >
            Designed & Devloped By Himanshu Kava 🚀
          </Typography>
        </Box>
      </Box>
    </>
  );
}

// <Box
//   sx={{
//     textAlign: "center",
//     mt: 5,
//     pt: 3,
//     borderTop: "1px solid rgba(148,163,184,0.15)",
//     fontSize: "14px",
//     color: "rgba(226,232,240,0.7)",
//   }}
// >
//   © 2025 Auto Portal. All Rights Reserved.
// </Box>;
