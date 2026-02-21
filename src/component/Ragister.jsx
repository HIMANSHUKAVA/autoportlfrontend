import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { showErrorAlert } from "../Util/Alert";

export default function Ragister() {
  const [formdeta, setformdeta] = useState({
    username: "",
    email: "",
    Password: "",
    type: "",
  });

  const [validetion, setvalidetion] = useState({});
  const API = import.meta.env.VITE_API_BASE_URL;
  const validetions = () => {
    const newerror = {};

    if (!formdeta.username.trim()) newerror.username = "Name is required";

    if (!formdeta.email) newerror.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formdeta.email))
      newerror.email = "Email is invalid";

    if (!formdeta.Password) newerror.password = "Password is required";
    else if (formdeta.Password.length < 6)
      newerror.password = "Password must be at least 6 characters";

    if (!formdeta.type) newerror.type = "Please select a user type";

    return newerror;
  };

  const handlnamedeta = (e) => {
    setformdeta({ ...formdeta, [e.target.name]: e.target.value });
  };

  // console.log(formdeta);

  const navigate = useNavigate();

  const handlsubmit = async (e) => {
    e.preventDefault();

    const errors = validetions();
    if (Object.keys(errors).length > 0) {
      setvalidetion(errors);
      return; // stop submission
    }
    setvalidetion({});

    try {
      const verify = await axios.post(`${API}/auth/check-email`, null, {
        params: { email: formdeta.email },
        validateStatus: () => true,
      });

      if (
        verify.status === 409 ||
        verify.data.trim() === "User Already Registered"
      ) {
        showErrorAlert(
          "User Already Registered! Please use a different Email ID.",
        );
        return;
      }

      await axios.get(`${API}/auth/generate-otp`, {
        params: { email: formdeta.email },
      });

      navigate(
        `/otp?name=${encodeURIComponent(
          formdeta.username,
        )}&email=${encodeURIComponent(
          formdeta.email,
        )}&password=${encodeURIComponent(
          formdeta.Password,
        )}&type=${encodeURIComponent(formdeta.type)}`,
      );
    } catch (error) {
      console.error("Error while checking email:", error);
      showErrorAlert("Something went wrong! Please check your connection.");
    }
  };

  return (
    <>
      <Box sx={{ position: "relative", height: "100vh" }}>
        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src="/videos/login.mp4" type="video/mp4" />
        </video>
      </Box>

      {/* Form container */}
      <Box
        sx={{
          position: "absolute",
          width: { xs: "85%", sm: "60%", md: "40%" },
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          p: 4,
          borderRadius: "15px",

          textAlign: "center",
          boxShadow: "0 0 20px rgba(255,255,255,0.1)",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>
          Register
        </Typography>

        <form onSubmit={handlsubmit}>
          {/* Name */}
          <TextField
            label="Enter Your Name"
            fullWidth
            variant="outlined"
            value={formdeta.username}
            sx={{
              mt: 2,
              "& .MuiInputLabel-root": { color: "#aaa" },
              "& .MuiOutlinedInput-root": {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "#fff",
                },
              },
            }}
            onChange={handlnamedeta}
            name="username"
            error={!!validetion.username}
            helperText={validetion.username}
          />

          {/* Email */}
          <TextField
            label="Enter Your Email"
            fullWidth
            variant="outlined"
            value={formdeta.email}
            sx={{
              mt: 2,
              "& .MuiInputLabel-root": { color: "#aaa" },
              "& .MuiOutlinedInput-root": {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "#fff",
                },
              },
            }}
            onChange={handlnamedeta}
            name="email"
            error={!!validetion.email}
            helperText={validetion.email}
          />

          {/* Password */}
          <TextField
            label="Enter The Password"
            type="password"
            fullWidth
            variant="outlined"
            value={formdeta.Password}
            sx={{
              mt: 2,
              "& .MuiInputLabel-root": { color: "#aaa" },
              "& .MuiOutlinedInput-root": {
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.3)",
                },
                "&:hover fieldset": {
                  borderColor: "#fff",
                },
              },
            }}
            onChange={handlnamedeta}
            name="Password"
            error={!!validetion.password}
            helperText={validetion.password}
          />

          {/* Select */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel sx={{ color: "white" }}>Select Your Type</InputLabel>
            <Select
              value={formdeta.type}
              label="Select Your Type"
              sx={{
                color: "white",
                backgroundColor: "rgba(255,255,255,0.1)",
                borderRadius: "8px",
                "& .MuiSelect-icon": { color: "white" },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(255,255,255,0.3)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#fff",
                },
              }}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: "rgba(0,0,0,0.85)",
                    color: "white",
                  },
                },
              }}
              onChange={handlnamedeta}
              name="type"
            >
              <MenuItem value="">
                <em>Select Your Type</em>
              </MenuItem>
              <MenuItem value="BUYER">BUYER</MenuItem>
              <MenuItem value="SELLER">SELLER</MenuItem>
            </Select>
            {validetion.type && (
              <Typography color="error" sx={{ fontSize: 13, mt: 0.5 }}>
                {validetion.type}
              </Typography>
            )}
          </FormControl>

          {/* Button */}
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 3,
              background: "linear-gradient(90deg, #007BFF, #FF4D4D)",
              color: "#fff",
              fontWeight: "bold",
              py: 1.2,
              borderRadius: "8px",
              letterSpacing: "1px",
              "&:hover": {
                background: "linear-gradient(90deg, #005BEA, #FF1E56)",
              },
            }}
          >
            REGISTER
          </Button>

          <Typography
            sx={{
              color: "#4da6ff",
              mt: 2,
              "&:hover": { textDecoration: "underline", cursor: "pointer" },
            }}
            component={Link}
            to="/"
          >
            Already have an account? Login
          </Typography>
        </form>
      </Box>
    </>
  );
}
