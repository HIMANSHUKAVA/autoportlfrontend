import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { showErrorAlert, showSuccessAlert } from "../Util/Alert";
export default function Otp() {
  // this are otpcode

  const otp_length = 6;

  const navigate = useNavigate();

  // store the otp
  const [otp, setotp] = useState(Array(6).fill(""));

  // each value is inpputbox

  const inputref = useRef([]);

  // get otp from url

  // timer
  const [counter, setcounter] = useState(59);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setcounter(counter - 1), 1000);

    return () => clearInterval(timer);
  }, [counter]);

  const location = useLocation();

  const [formdeta, setformdeta] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  useEffect(() => {
    const query = new URLSearchParams(location.search); // URL ke ?name=...&email=... ko todta hai
    setformdeta({
      username: query.get("name") || "",
      email: query.get("email") || "",
      password: query.get("password") || "",
      role: query.get("type") || "",
    });
  }, [location.search]);

  //    handl otp method

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

  const API = import.meta.env.VITE_API_BASE_URL;
  // verify otp and ragister
  const handlragister = async (e) => {
    e.preventDefault();

    const enterotp = otp.join("");

    try {
      // 1️⃣ Verify OTP
      const verifyOtp = await axios.post(`${API}/auth/varify-otp`, {
        otp: Number(enterotp),
      });

      if (verifyOtp.data.trim() === "Otp Varified Successfully") {
        try {
          const response = await axios.post(`${API}/auth/add`, formdeta);

          localStorage.setItem("user_id", response.data.id);
          localStorage.setItem("user_name", response.data.username);
          localStorage.setItem("user_role", response.data.role);

          showSuccessAlert("OTP Verified and User Registered Successfully!");
          navigate("/dashboard");
        } catch (error) {
          showErrorAlert(
            "Something went wrong! Please check your connection.",
            error,
          );
        }

        inputref.current.forEach((el) => {
          if (el) el.value = "";
        });
      } else {
        showErrorAlert("Invalid OTP! Please try again.");
      }
    } catch (err) {
      console.error(" OTP Verification Error:", err);
      showErrorAlert("Something went wrong! Please check your connection.");
    }
  };

  const handlresendotp = async () => {
    axios.get(`${API}/auth/generate-otp`, {
      params: { email: formdeta.email },
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
            onClick={handlragister}
          >
            VERIFY OTP
          </Button>

          {counter > 0 ?
            <Typography sx={{ mt: 2, color: "#ccc" }}>
              Resend Otp In : {counter}
            </Typography>
          : <Button
              sx={{ mt: 2, textTransform: "none", color: "#00bfff" }}
              onClick={handlresendotp}
            >
              Resend Otp
            </Button>
          }
        </Box>
      </Box>
    </>
  );
}
