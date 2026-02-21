import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";

export default function Discover() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const neonBlue = "#1e90ff";
  const userId = localStorage.getItem("user_id");

  // 🔹 Fetch featured cars
  useEffect(() => {
    axios
      .get("http://localhost:3000/buyer/cars/featured", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setCars(res.data);
      })
      .catch(console.log);
  }, []);

  const API = import.meta.env.VITE_API_BASE_URL;

  // 🔹 Add to cart
  const handleCart = (carId) => {
    axios
      .post(`${API}/buyer/addtocart/add/${userId}/${carId}`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => navigate("/add-to-cart"))
      .catch(console.log);
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
        }}
      >
        {/* 🔥 PAGE HEADING */}
        <Typography
          variant="h3"
          data-aos="fade-down"
          sx={{
            mb: 4,
            textAlign: "center",
            color: neonBlue,
          }}
        >
          Explore Featured Cars
        </Typography>

        {/* 🔥 CAR GRID */}
        <Grid container spacing={3}>
          {cars.map((car, index) => (
            <Grid
              item
              xs={12}
              md={3}
              key={car.id}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <Card
                sx={{
                  width: 320,
                  height: 480,
                  mx: "auto",
                  backgroundColor: "#020617",
                  borderRadius: 4,
                  boxShadow: "inset 0 -40px 60px rgba(0,0,0,0.6)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.02)",
                    boxShadow: "0 0 40px rgba(56,189,248,0.35)",
                  },
                }}
              >
                <CardActionArea onClick={() => navigate(`/carshow/${car.id}`)}>
                  <CardMedia
                    component="img"
                    image={car.image_url}
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                    }}
                  />

                  <CardContent sx={{ color: "#cbd5f5" }}>
                    <Typography variant="h6">{car.brand}</Typography>
                    <Typography variant="body2">{car.model}</Typography>
                    <Typography variant="body2">{car.description}</Typography>
                    <Typography variant="h6" sx={{ mt: 1 }}>
                      {car.priceLabel}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      ml: 2,
                      mb: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      data-aos="fade-up"
                      data-aos-delay="300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCart(car.id);
                      }}
                    >
                      Add To Cart
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Footer />
    </>
  );
}
