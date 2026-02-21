import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
export default function Forget() {
  const API = import.meta.env.VITE_API_BASE_URL;
  const [email, setemail] = useState("");
  const navigate = useNavigate();

  const handlforgetevent = async (e) => {
    e.preventDefault();

    await axios.get(`${API}/generate-otp`, {
      params: { email: email },
    });

    navigate(`/reset-otp?email=${email}`);
  };
  return (
    <Box position="relative" height="100vh">
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
          zIndex: -1,
        }}
      >
        <source src="/videos/login.mp4" />
      </video>

      <Box
        sx={{
          width: { xs: "85%", sm: "60%", md: "25%" },
          position: "absolute",
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
        <Typography variant="h5" sx={{ color: "#aaa", mb: 3 }}>
          Forgot Your Password?
        </Typography>

        <Typography component="div">
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              strings: [
                "Enter Your Registered Email -we'll send You A One-Time Password",
              ],
              delay: 30,
              deleteSpeed: 20,
            }}
          />
        </Typography>

        <form onSubmit={handlforgetevent}>
          <TextField
            label="Enter Your Email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
            }}
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
            name="email"
          />

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
            SEND OTP
          </Button>
        </form>
      </Box>
    </Box>
  );
}
