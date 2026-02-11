import { Box, Typography } from "@mui/material";
import React from "react";

export default function Ourbrand() {
  return (
    <>
      <Box
        sx={{
          py: 6,
          px: { xs: 2, md: 6 },
          background: "linear-gradient(135deg, #020617, #020617)",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            color: "#cbd5f5",
            mb: 2,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Our Brands
          </Typography>
        </Box>
        <Box>
          <img
            src="/images/our_brand.webp"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              maxHeight: 450,
            }}
          />
        </Box>
      </Box>
    </>
  );
}
