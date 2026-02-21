import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import InsertInvitationIcon from "@mui/icons-material/InsertInvitation";
import LocationIcone from "@mui/icons-material/LocationOn";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextareaAutosize,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { showErrorAlert, showSuccessAlert } from "../../Util/Alert";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
export default function Contect() {
  // create state for

  const email = localStorage.getItem("email");
  const name = localStorage.getItem("username");

  const [contect, setcontect] = useState({
    name: name,
    email: email,
    subject: "",
    message: "",
  });

  const handlevent = (e) => {
    const { name, value } = e.target;
    setcontect((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_BASE_URL;

  const handlsubmitevent = (e) => {
    e.preventDefault();

    if (!contect.subject || !contect.message) {
      showErrorAlert("Please Fill the Subject and Message");
      return;
    }

    axios
      .post(`${API}/buyer/contect/save`, contect, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        showSuccessAlert("We will your contect soon..");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        showErrorAlert("Something went wrong");
      });
  };

  return (
    <>
      <Navbar />
      <Toolbar />
      <Box
        sx={{
          background: "linear-gradient(135deg, #020617, #020617)",
          // minHeight: "100vh",
          color: "#cbd5f5",
          pt: 8,
          py: 6,
          px: { xs: 2, md: 6 },
        }}
      >
        <Box data-aos="fade-down">
          <Typography variant="h3">CONTACT US</Typography>
          <Typography variant="body2" sx={{ fontWeight: "bold", mt: 2 }}>
            We Would Love To Hear From You. Please Fill Out This Form
          </Typography>
        </Box>

        <Grid container sx={{ mt: 6 }} spacing={{ xs: 0, md: 40 }}>
          <Grid item xs={12} md={6} sx={{}} data-aos="fade-right">
            <List>
              <ListItem>
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <LocationIcone />
                </ListItemIcon>
                <ListItemText>Bhavnagar Gujrat</ListItemText>
              </ListItem>

              <ListItem>
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <CallIcon />
                </ListItemIcon>
                <ListItemText>(+31) 9870542210</ListItemText>
              </ListItem>

              <ListItem>
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText>kavahimanshu24@gmail.com</ListItemText>
              </ListItem>

              <ListItem>
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <WatchLaterIcon />
                </ListItemIcon>
                <ListItemText>
                  Mon-Fri <br /> 9:00am To 6:00pm
                </ListItemText>
              </ListItem>

              <ListItem>
                <ListItemIcon sx={{ color: "#38bdf8" }}>
                  <InsertInvitationIcon />
                </ListItemIcon>
                <ListItemText>Working Hours</ListItemText>
              </ListItem>
            </List>
          </Grid>

          {/* outler grid */}
          <Grid item xs={12} md={6} data-aos="fade-left">
            {/* inner grid */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={5}>
                <TextField
                  value={contect.name}
                  fullWidth
                  label="Name"
                  variant="outlined"
                  InputProps={{
                    sx: { color: "#cbd5f5" },
                    readOnly: true,
                  }}
                  InputLabelProps={{
                    sx: { color: "#94a3b8" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(148,163,184,0.4)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#38bdf8",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#38bdf8",
                      },
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={7}>
                <TextField
                  value={email}
                  label="Email"
                  type="email"
                  InputLabelProps={{
                    shrink: true,
                    sx: { color: "#94a3b8" },
                  }}
                  InputProps={{
                    sx: { color: "#cbd5f5" },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "rgba(148,163,184,0.4)",
                      },
                      "&:hover fieldset": {
                        borderColor: "#38bdf8",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#38bdf8",
                      },
                    },
                    width: 250,
                  }}
                />
              </Grid>
            </Grid>

            {/* subject */}
            <TextField
              InputProps={{
                sx: {
                  color: "#cbd5f5",
                },
              }}
              InputLabelProps={{
                sx: {
                  color: "#94a3b8",
                },
              }}
              name="subject"
              value={contect.subject}
              onChange={handlevent}
              label="subject"
              fullWidth
              sx={{
                mt: 1,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(148,163,184,0.4)",
                  },
                  "&:hover fieldset": {
                    borderColor: "#38bff8",
                  },
                  "& .Mui-focused fieldset": {
                    borderColor: "#38bdf8",
                  },
                },
              }}
            />

            <TextareaAutosize
              name="message"
              value={contect.message}
              onChange={handlevent}
              placeholder="Message"
              minRows={5}
              style={{
                width: "100%",
                marginTop: "16px",
                color: "#cbd5f5",
                borderRadius: 4,
                border: "1px solid rgba(148,163,184,0.4)",
                outline: "none",
                background: "linear-gradient(135deg, #020617, #020617)",
              }}
            />

            <Button
              variant="outlined"
              fullWidth
              type="submit"
              sx={{
                mt: 2,
                borderColor: "linear-gradient(135deg, #38bdf8, #0284c7)",
                color: "#cbd5f5",
                "&:hover": {
                  background: "linear-gradient(135deg, #38bdf8, #0284c7)",
                },
                boxShadow: "0 0 12px rgba(56,189,248,0.6)",
              }}
              onClick={handlsubmitevent}
            >
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}
