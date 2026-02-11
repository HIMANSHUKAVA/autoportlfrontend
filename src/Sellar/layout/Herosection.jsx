import { Box, Typography } from "@mui/material";
import React from "react";

export default function Herosection() {
  return (
    <Box
      data-aos="fade-up"
      sx={{
        width: "100%",
        height: 320,
        position: "relative",
        overflow: "hidden",
        borderRadius: 2,
        mb: 4,
      }}
    >
      {/* IMAGE */}
      <Box
        component="img"
        src="/sellarimage/sop.png"
        alt="Car"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* DARK OVERLAY (text clearly dikhne ke liye) */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.2) 100%)",
        }}
      />

      {/* TEXT */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "5%",
          transform: "translateY(-50%)",
          zIndex: 2,
        }}
      >
        <Typography variant="h3" color="white" fontWeight="bold">
          Hello {localStorage.getItem("username")}
        </Typography>

        <Typography color="#ddd" mt={1}>
          Welcome to your seller dashboard
        </Typography>
      </Box>
    </Box>
  );
}
