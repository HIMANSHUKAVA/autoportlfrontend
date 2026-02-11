import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { showErrorAlert, showSuccessAlert } from "../Util/Alert";
export default function Forgetotp() {
  const otp_length = 6;
  const navigate = useNavigate();
  const [otp, setotp] = useState(Array(6).fill(""));
  // each value is inpputbox
  const inputref = useRef([]);

  const [email, setemail] = useState("");

  const handlotp = (e, index) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const newotp = [...otp];
      newotp[index] = value;
      setotp(newotp);

      if (value && index < otp_length - 1) {
        inputref.current[index + 1].focus();
      }
    }
  };

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  useEffect(() => {
    const enteremail = query.get("email");

    if (enteremail) {
      setemail(enteremail);
    }
  }, [location.search]);

  const handlreset = async () => {
    const newotp = otp.join("");
    await axios
      .post(`http://localhost:3000/auth/varify-otp`, {
        otp: Number(newotp),
      })
      .then(() => {
        axios
          .post(`http://localhost:3000/auth/verify-reset-link`, {
            email: email,
            otp: Number(newotp),
          })
          .then(() => {
            showSuccessAlert(
              "Otp Varified And Password Update Link Sent Your Mail"
            );
            navigate("/reset-otp");
            setotp("");
          })
          .catch(() => {
            showErrorAlert("Otp Is Wrong Please Try Again");
            navigate("/reset-otp");
            setotp("");
          });
      })
      .catch((er) => {
        showErrorAlert("Something Wrong Please Check Your Connection", er);
      });
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
        }}
      >
        <video
          autoPlay
          loop
          playsInline
          muted
          style={{
            width: "100%",
            height: "100%",
            zIndex: -1,
            position: "fixed",
            top: 0,
            left: 0,
            objectFit: "cover",
          }}
        >
          <source src="/videos/login.mp4" />
        </video>

        <Box
          sx={{
            width: { xs: "85%", sm: "60%", md: "30% " },
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
            Verify Your OTP
          </Typography>

          <Typography component="div" sx={{ mb: 3 }}>
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 30,
                deleteSpeed: 20,
                strings: [
                  "Enter the 6-digit code we sent to your registered email.",
                ],
              }}
            />
          </Typography>

          {/* otp box */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "nowrap",
              gap: 2,
            }}
          >
            {Array.from({ length: otp_length }).map((_, index) => (
              <TextField
                key={index}
                value={otp[index]}
                onChange={(e) => handlotp(e, index)}
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    width: "45px",
                    height: "45px",
                    fontSize: "1.3rem",
                    color: "white",
                  },
                }}
                inputRef={(el) => (inputref.current[index] = el)}
                autoFocus={index === 0}
                sx={{
                  // 🔥 Added border & background styles
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#aaa",
                    },
                    "&:hover fieldset": {
                      borderColor: "#fff",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#fff",
                    },
                    backgroundColor: "rgba(255,255,255,0.1)",
                    borderRadius: "10px",
                  },
                  input: { color: "white" },
                }}
              />
            ))}
          </Box>

          <Button
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
            onClick={handlreset}
          >
            VERIFY OTP
          </Button>
        </Box>
      </Box>
    </>
  );
}
