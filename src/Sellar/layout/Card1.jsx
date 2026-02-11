import React from "react";
import { Box, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import GroupIcon from "@mui/icons-material/Group";

const data = [
  {
    top: "Total",
    title: "Vehicles",
    value: 8,
    icon: <DirectionsCarIcon />,
    rightIcon: <GroupIcon sx={{ color: "#6bb6ff" }} />,
  },
  {
    top: "Total",
    title: "Views",
    value: "12,345",
    icon: <DirectionsCarIcon />,
    rightIcon: <ChatBubbleOutlineIcon sx={{ color: "#6bb6ff" }} />,
  },
  {
    top: "Messages",
    title: "",
    value: 5,
    icon: <ChatBubbleOutlineIcon />,
    rightIcon: <GroupIcon sx={{ color: "#ccc" }} />,
  },
  {
    top: "Active",
    title: "Ads",
    value: 7,
    icon: <CheckCircleIcon />,
    rightIcon: <CheckCircleIcon sx={{ color: "#f5c46b" }} />,
  },
];

export default function Card() {
  return (
    <Box
      data-aos="fade-down"
      sx={{
        mt: 2,
        maxWidth: 1000,

        ml: { xs: 0, md: 6 }, // 📱 mobile pe left margin hataya
        mr: "auto",

        px: { xs: 1, sm: 2 },

        display: "grid",
        gridTemplateColumns: {
          xs: "1fr", // 📱 mobile: 1 card
          sm: "1fr 1fr", // 🖥 tablet/desktop: 2 cards
        },
        gap: { xs: 2, md: 3 },

        position: "relative",
        zIndex: 10,
      }}
    >
      {data.map((card, i) => (
        <Box
          key={i}
          sx={{
            minHeight: { xs: "auto", sm: 120 },
            py: { xs: 2, sm: 0 },
            px: 3,

            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",

            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 0 },

            borderRadius: 2,
            background: "linear-gradient(135deg,#0d1b2f,#0a1424)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
          }}
        >
          {/* LEFT SECTION */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                border: "2px solid #f5c46b",
                color: "#f5c46b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {card.icon}
            </Box>

            <Box>
              <Typography sx={{ color: "#bfc9d9", fontSize: 14 }}>
                {card.top}
              </Typography>
              {card.title && (
                <Typography
                  sx={{
                    color: "white",
                    fontSize: 18,
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  {card.title}
                </Typography>
              )}
            </Box>
          </Box>

          {/* DIVIDER (mobile pe hidden) */}
          <Box
            sx={{
              mx: 3,
              width: "1px",
              height: "60%",
              background: "rgba(255,255,255,0.15)",
              display: { xs: "none", sm: "block" },
            }}
          />

          {/* RIGHT SECTION */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            <Typography
              sx={{
                color: "white",
                fontSize: 24,
                fontWeight: 700,
              }}
            >
              {card.value}
            </Typography>
            {card.rightIcon}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
