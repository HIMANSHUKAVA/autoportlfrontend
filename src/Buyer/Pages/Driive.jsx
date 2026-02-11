import {
  Box,
  Button,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { useNavigate, useParams } from "react-router-dom";
import axios, { Axios } from "axios";
import { showErrorAlert, showSuccessAlert } from "../../Util/Alert";

export default function Driive() {
  const { id } = useParams();

  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");
  const user_id = localStorage.getItem("user_id");

  const navigate = useNavigate();
  const [book, setbook] = useState({
    name: username,
    email: email,
    date: "",
    city: "",
  });

  const handlsubmitevent = async (e) => {
    e.preventDefault();

    if (!book.city || !book.date) {
      showErrorAlert("Please select city and date");
      return;
    } else {
      const payload = {
        date: book.date,
        city: book.city,
      };

      await axios
        .post(
          `http://localhost:3000/buyer/booking/add/${user_id}/${id}`,
          payload,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(() => {
          showSuccessAlert("Booked Successful");
          navigate("/dashboard");
          setbook({
            name: username,
            email: email,
            city: "",
            date: "",
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handlevent = (e) => {
    setbook({ ...book, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Navbar />
      <Toolbar />
      <Box
        sx={{
          background: "linear-gradient(135deg, #020617, #020617)",
          color: "#cbd5f5",
          py: 6,
          px: { xs: 2, md: 6 },
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h4">Book Drive</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            mx: "auto",
            mt: 5,
            width: {
              xs: "100%",
              sm: "80%",
              md: "45%",
              lg: "40%",
            },
            background: "rgba(2,6,23,0.75)",
            backdropFilter: "blur(14px)",

            /* Border */
            border: "1px solid rgba(56,189,248,0.35)",

            /* Glow shadow */
            boxShadow: `
           0 0 20px rgba(56,189,248,0.15),
           inset 0 0 25px rgba(255,255,255,0.05)
    `,
            borderRadius: 3,
          }}
        >
          <form
            style={{
              width: "80%",
              padding: "20px",
            }}
            onSubmit={handlsubmitevent}
          >
            <TextField
              fullWidth
              variant="outlined"
              value={username}
              label="UserName"
              name="username"
              id="username"
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
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(148,163,184,0.4)",
                  },
                  "&: hover fieldset": {
                    borderColor: "#38bdf8",
                  },
                  "& .Mui-focused fieldset": {
                    borderColor: "#38bdf8",
                  },
                },
              }}
            />

            {/* email */}

            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              name="email"
              value={email}
              id="email"
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
              sx={{
                mt: 3,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(148,163,184,0.4)",
                  },
                  "&: hover fieldset": {
                    borderColor: "#38bdf8",
                  },
                  "& .Mui-focused fieldset": {
                    borderColor: "#38bdf8",
                  },
                },
              }}
            />

            {/* city */}
            <TextField
              select
              fullWidth
              onChange={handlevent}
              value={book.city}
              label="Select City"
              name="city"
              InputLabelProps={{ sx: { color: "#94a3b8" } }}
              sx={{
                mt: 3,
                "& .MuiOutlinedInput-root": {
                  color: "#cbd5f5",
                  "& fieldset": { borderColor: "rgba(148,163,184,0.4)" },
                  "&:hover fieldset": { borderColor: "#38bdf8" },
                  "&.Mui-focused fieldset": { borderColor: "#38bdf8" },
                },
              }}
            >
              <MenuItem value="Ahmedabad">Ahmedabad</MenuItem>
              <MenuItem value="Surat">Surat</MenuItem>
              <MenuItem value="Vadodara">Vadodara</MenuItem>
              <MenuItem value="Rajkot">Rajkot</MenuItem>
              <MenuItem value="Mumbai">Mumbai</MenuItem>
              <MenuItem value="Delhi">Delhi</MenuItem>
              <MenuItem value="Bengaluru">Bengaluru</MenuItem>
            </TextField>

            {/* date */}
            <TextField
              value={book.date}
              onChange={handlevent}
              type="date"
              fullWidth
              variant="outlined"
              name="date"
              id="date"
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
              sx={{
                mt: 3,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(148,163,184,0.4)",
                  },
                  "&: hover fieldset": {
                    borderColor: "#38bdf8",
                  },
                  "& .Mui-focused fieldset": {
                    borderColor: "#38bdf8",
                  },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,

                borderColor: "linear-gradient(135deg, #38bdf8, #0284c7)",
                color: "#cbd5f5",
                "&:hover": {
                  background: "linear-gradient(135deg, #38bdf8, #0284c7)",
                },
                boxShadow: "0 0 12px rgba(56,189,248,0.6)",
              }}
            >
              Book Drive
            </Button>
          </form>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
