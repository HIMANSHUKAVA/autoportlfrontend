import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { showErrorAlert, showSuccessAlert } from "../Util/Alert";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const API = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const handlloginsubmitevent = async (e) => {
    e.preventDefault();

    await axios
      .post(`${API}/auth/login-person?email=${email}&password=${password}`)
      .then((Response) => {
        const { user, token } = Response.data;
        console.log(Response.data);

        showSuccessAlert(`Welcome Back ${user.username}`);
        localStorage.setItem("user_id", user.id);
        localStorage.setItem("username", user.username);
        localStorage.setItem("email", user.email);
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role);
        localStorage.setItem("islogin", "true");
        localStorage.setItem("password", user.password);
        localStorage.setItem("photo", user.photo);

        if (user.role == "BUYER") {
          navigate("/dashboard");
        }
        if (user.role == "SELLER") {
          navigate("/sellardashboard");
        }

        setemail("");
        setpassword("");
      })
      .catch((error) => {
        showErrorAlert("Invalid Login Or Password Please Try Again");
        navigate("/");
        setemail("");
        setpassword("");
        // console.log(error);
      });
  };
  return (
    <>
      <Box sx={{ position: "relative", height: "100vh" }}>
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
          id="login-portl-compnent"
          sx={{
            width: { xs: "85%", sm: "60%", md: "35%" },
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
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            Welcome Back
          </Typography>
          <Typography variant="h5" sx={{ color: "#aaa", mb: 3 }}>
            Login
          </Typography>

          <Typography
            sx={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "0.9rem",
              mb: 2,
              letterSpacing: "0.5px",
            }}
          >
            <Typewriter
              options={{
                autoStart: true,
                loop: true,
                delay: 30,
                deleteSpeed: 20,
                strings: ["Secure access to your Auto Portal account"],
              }}
            />
          </Typography>

          <form onSubmit={handlloginsubmitevent}>
            {/* email */}

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

            <TextField
              type="password"
              label="Enter Your Password"
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
              name="paassword"
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
              LOGIN
            </Button>

            <Typography
              sx={{
                color: "#66b2ff",
                mt: 2,
                fontSize: "0.9rem",
                textDecoration: "none",

                "&:hover": { textDecoration: "underline", cursor: "pointer" },
              }}
              component={Link}
              to="/Ragister"
            >
              Don't have an account? Register
            </Typography>

            <br />

            <Typography
              sx={{
                color: "#66b2ff",
                textDecoration: "none",
                mt: 1,
                fontSize: "0.9rem",
                "&:hover": { textDecoration: "underline", cursor: "pointer" },
              }}
              component={Link}
              to="/forget"
            >
              Forget Pssword
            </Typography>
          </form>
        </Box>
      </Box>
    </>
  );
}
