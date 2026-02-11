import {
  Box,
  Button,
  InputLabel,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NavbarAndDrawer from "../layout/NavbarAndDrawer";
import { BorderColor } from "@mui/icons-material";
import Footer from "../../Buyer/Layout/Footer";
import { showSuccessAlert, showErrorAlert } from "../../Util/Alert";
export default function Message() {
  const [form, setform] = useState({
    name: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    message: "",
  });

  const handlsubmit = (e) => {
    e.preventDefault();
    if (form.message == "") {
      // alert("message can not be empty");
      showErrorAlert("Message Can Not Be Empty");
    } else {
      showSuccessAlert("Message Sent Successfully");
      setform({
        message: "",
      });
    }
  };
  const makeStyle = () => ({
    "& .MuiOutlinedInput-root": {
      color: "#cbd5f5",

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
    mt: 2,

    "& .MuiInputLabel-root": {
      color: "rgba(203,213,245,0.7)",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: "#38bdf8",
    },
  });

  return (
    <>
      <NavbarAndDrawer />
      <Box
        component="main"
        sx={{
          ml: { xs: 0, md: "220px" },
          mt: "140px", // 2 AppBar height
          px: { xs: 0, md: 3 },
          width: "100%",
          background: "linear-gradient(180deg, #0B1220 0%, #0E1A2B 100%)",
          color: "#FFFFFF",
          fontFamily: `'Inter', sans-serif`,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ ml: { md: "30px" }, mb: 4 }}>
          <Typography variant="h4">Messages</Typography>
          <Typography variant="body2">Send A Message To Admin</Typography>
          <hr />
        </Box>

        {/* contect Box */}
        <Box
          sx={{
            width: "80%",
            height: "auto",
            border: "1px solid rgba(148,163,184,0.4)",
            // display: "flex",
            m: 3,
            p: 3,
          }}
        >
          <InputLabel sx={{ color: "white" }}>Name</InputLabel>
          <TextField
            name="name"
            // label="Enter Your Name"
            sx={makeStyle()}
            fullWidth
            value={form.name}
          />
          <br />
          <InputLabel sx={{ color: "white", mt: 1 }}>Email</InputLabel>
          <TextField
            name="email"
            // label="Enter Your Email"
            sx={makeStyle()}
            fullWidth
            value={form.email}
          />

          <br />
          <InputLabel sx={{ color: "white" }}>Message</InputLabel>
          <TextareaAutosize
            name="message"
            placeholder="Type Your Message Here...."
            value={form.message}
            onChange={(e) => {
              setform(e.target.value);
            }}
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
          <Typography variant="body2">
            Your Message Will Be Send To The Admin. Please Feel Free to Ask
            Questions Or Share Your Inquires About Vehicles
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
              // flexDirection: "column",
            }}
          >
            <Button
              sx={{
                color: "#38BDF8",
                "&:hover": {
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  borderColor: "#38BDF8",
                },
                px: 3,
                border: "1px solid #38BDF8",
                borderRadius: 2,
              }}
              type="submit"
              onClick={handlsubmit}
            >
              Send Message
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Typography variant="caption">
              We Will Responed As Soon As Posible
            </Typography>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
