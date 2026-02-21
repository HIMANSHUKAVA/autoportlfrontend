import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { showErrorAlert, showSuccessAlert } from "../Util/Alert";
export default function ResetPassword() {
  const [serchparm] = useSearchParams();

  const navigate = useNavigate();

  const email1 = serchparm.get("email");
  const [email, setemail] = useState(email1);

  const [password, setpassword] = useState("");
  const [conformpassword, setconformpassword] = useState("");

  const handlpassword = (e) => {
    const value = e.target.value;

    setconformpassword(value);
  };

  const API = import.meta.env.VITE_API_BASE_URL;
  const handlsubmitevent = async (e) => {
    e.preventDefault();

    if (conformpassword !== password) {
      showErrorAlert(
        "Password And Conform Password Did Not Matched Please Try Again",
      );

      setpassword("");
      setconformpassword("");
    } else {
      await axios
        .post(`${API}/auth/reset-password`, null, {
          params: { email, password },
        })
        .then(() => {
          showSuccessAlert("Password Updated Successfully");
          navigate("/");
          setconformpassword("");
          setpassword("");
        })
        .catch(() => {
          showErrorAlert("Something went wrong! Please check your connection.");
          setconformpassword("");
          setpassword("");
        });
    }
  };
  return (
    <Box position="relative" height="100vh">
      {/* Background Video */}
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
          boxShadow: "0 0 25px rgba(255,255,255,0.15)",
        }}
      >
        <Typography variant="h5" sx={{ color: "#aaa", mb: 2 }}>
          Reset Your Password
        </Typography>

        <Typography component="div" sx={{ mb: 3 }}>
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
              delay: 30,
              deleteSpeed: 20,
              strings: ["Enter your new password to secure your account."],
            }}
          />
        </Typography>

        <form onSubmit={handlsubmitevent}>
          <TextField
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
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
          />

          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            variant="outlined"
            value={conformpassword}
            onChange={handlpassword}
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
            RESET PASSWORD
          </Button>
        </form>
      </Box>
    </Box>
  );
}
