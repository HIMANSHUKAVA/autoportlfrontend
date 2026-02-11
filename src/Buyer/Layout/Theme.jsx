import { Box, Button, Typography } from "@mui/material";

export default function Theme() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        margin: "auto",
        height: "70vh",
        mt: 3,
        mb: 2,
        overflow: "hidden",
        borderRadius: 2,
        backgroundColor: "#000",
      }}
    >
      {/* Image - NO CROP + NO GAP */}
      <Box
        component="img"
        src="/images/themed.png"
        alt="Luxury Car"
        sx={{
          width: "105%", // slight zoom to avoid side gaps
          height: "105%",
          objectFit: "contain", // prevents crop
          objectPosition: "right", // keeps models visible
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)", // center image perfectly
          zIndex: 1,
        }}
      />

      {/* Text Content */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          color: "white",
          transform: "translateY(-50%)",
          // border: "1px solid red",
          width: { xs: "90%", md: "50%" },
          zIndex: 3,
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            lineHeight: 1.2,
            fontSize: { xs: "1.8rem", md: "2.8rem" },
          }}
        >
          A Car That Defines Luxury
        </Typography>

        <Typography
          sx={{
            my: 2,
            fontSize: { xs: "0.9rem", md: "1.1rem" },
            fontWeight: 300,
          }}
        >
          Experience the sophistication and elegance of our premium vehicles,
          where cutting-edge technology meets unparalleled comfort. Step into a
          world of refined style and exceptional performance.
        </Typography>

        <Button
          variant="outlined"
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: "30px",
            fontSize: "1.1rem",
            borderColor: "#3f8cff",
            color: "#fff",
            backdropFilter: "blur(4px)",
            borderWidth: "2px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "rgba(63,140,255,0.25)",
              borderColor: "#5ea0ff",
              boxShadow: "0 0 12px #3f8cff",
            },
          }}
        >
          Learn More
        </Button>
      </Box>
    </Box>
  );
}
