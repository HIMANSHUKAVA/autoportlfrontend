import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useReducer, useRef, useState } from "react";
import Typewriter from "typewriter-effect";
import {showSuccessAlert , showErrorAlert} from "../Util/Alert"
import { useNavigate } from "react-router-dom";
const initialstate = {
  email : "",
  password : ""
}

const initialstate2 = {
  email : "",
  password : ""
}

const reducer = (deta , action)=>{

  switch (action.type) {
    case "change" :
       return {...deta , [action.field] : action.value }
    case "reset":
      return initialstate2
    default :
       return deta
  }
}

export default function AdminLogin() {

  const inputstyle = () => ({
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
  });

  const inputref = useRef();
  useEffect(() => {
    inputref.current.focus()
  }, [])

const navigate = useNavigate();

  const [state  , dispatch] = useReducer(reducer  , initialstate)
  const [pending, setpending] = useState(false)
  const handlsubmit = (e)=>{

    e.preventDefault();

    if(!state.email || !state.password)
    {
      alert("required fied");
      return;
    }
    setpending(true)

 axios.post(
  "https://autoportal.onrender.com/auth/login-check",
  null,
  {
    params: {
      email: state.email,
      password: state.password
    }
  }
).then((response) => {
  const { token, user } = response.data;

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));

  showSuccessAlert("Login Successful");
  dispatch({ type: "reset" });
  setpending(false);
  navigate("/admin/dash");
})
.catch((error) => {
  console.log(error);
  showErrorAlert("Invalid credentials");
  setpending(false);
});





  }
  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          objectFit: "cover",
          zIndex: 0,
        }}
      >
        <source src="/videos/login.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <Box
        sx={{
          // height: "100%",
          position: "absolute",
          width: { xs: "85%", sm: "60%", md: "35%" },
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
          textAlign: "center",
          boxShadow: "0 0 20px rgba(255,255,255,0.1)",
          backgroundColor: "rgba(0,0,0,0.6)",
          color: "white",
          p: 4,
          borderRadius: "15px",
        }}
      >
        <Typography variant="h4" sx={{ color: "white", fontWeight: "bold" }}>
          Welcome Back Admin
        </Typography>
        <Typography
          variant="h4"
          sx={{ color: "#aaa", fontWeight: "bold", mb: 1 }}
        >
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
              strings: [
                "Welcome Admin, please login to access the control panel",
                "Admin Access Only — Secure Login Required",
                "System Control Center — Admin Authentication Required",
              ],
            }}
          />
        </Typography>

        <form onSubmit={handlsubmit}>
          <TextField
            name="email"
            id="email"
            label="Enter The Email"
            type="email"
            fullWidth
            sx={inputstyle}
            inputRef={inputref}
            value={state.email}
            onChange={(e)=>dispatch({
              type : "change",
              field : "email" ,
              value:e.target.value
            })}
          />

          <TextField
            name="password"
            id="password"
            label="Enter The password"
            type="password"
            fullWidth
            value={state.password}
            sx={inputstyle}
            onChange={(e)=>dispatch({
              type : "change",
              field : "password" ,
              value:e.target.value
            })}
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
            disabled={pending}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
}
