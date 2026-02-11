import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";

export default function Cars() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        // minHeight: "100vh",
        background: "linear-gradient(135deg, #020617, #020617)",
        color: "#cbd5f5",
        px: { xs: 2, md: 8 },
        py: 10,
      }}
    >
      <Navbar />
      {/* Heading */}
      <Typography variant="h3" align="center" sx={{ mt: 4 }}>
        Discover Cars
      </Typography>

      <Typography
        align="center"
        sx={{ mt: 2, color: "#94a3b8", maxWidth: 600, mx: "auto" }}
      >
        Browse our wide range of cars. Filter and compare cars by brand, price
        and features on the next step.
      </Typography>

      {/* Cards */}
      <Grid container spacing={6} justifyContent="center" sx={{ mt: 6 }}>
        {/* New Cars */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: "1px solid rgba(56,189,248,0.4)",
              borderRadius: 4,
              p: 4,
              textAlign: "center",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 0 25px rgba(56,189,248,0.4)",
                transform: "translateY(-5px)",
              },
            }}
          >
            <Typography variant="h5">🚗 New Cars</Typography>

            <Typography sx={{ mt: 2, color: "#94a3b8" }}>
              Explore latest models with advanced features and best offers.
            </Typography>

            <Button
              variant="outlined"
              sx={{ mt: 3 }}
              onClick={() => navigate("/discovernewcar")}
            >
              Browse New Cars
            </Button>
          </Box>
        </Grid>

        {/* Old Cars */}
        <Grid item xs={12} md={4}>
          <Box
            sx={{
              border: "1px solid rgba(56,189,248,0.4)",
              borderRadius: 4,
              p: 4,
              textAlign: "center",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 0 25px rgba(56,189,248,0.4)",
                transform: "translateY(-5px)",
              },
            }}
          >
            <Typography variant="h5">🚙 Used Cars</Typography>

            <Typography sx={{ mt: 2, color: "#94a3b8" }}>
              Find certified used cars filtered by brand, price and condition.
            </Typography>

            <Button
              variant="outlined"
              sx={{ mt: 3 }}
              onClick={() => navigate("/oldcardisover")}
            >
              Browse Used Cars
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}
