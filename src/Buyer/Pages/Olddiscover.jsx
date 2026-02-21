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

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API}/buyer/oldcars/featured`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((Response) => {
        console.log(Response.data);
        setCars(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const neonBlue = "#1e90ff";

  const id1 = localStorage.getItem("user_id");

  const handlcart = (id) => {
    axios
      .post(`${API}/buyer/addtocart/add/${id1}/${id}`, null, {
        headers: {
          Authorization: "Beared " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        console.log("Cart Added");
        navigate("/add-to-cart");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Navbar />
      <Toolbar />
      <Box
        sx={{
          background: "linear-gradient(135deg, #020617, #020617)",
          // minHeight: "100vh",
          color: "#cbd5f5",
          py: 6,
          px: { xs: 2, md: 6 },
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mb: 4,
            textAlign: "center",
            color: neonBlue,
          }}
        >
          Explore All Cars
        </Typography>

        <Grid container spacing={3}>
          {cars.map((car, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Card
                className="card"
                sx={{
                  overflow: "hidden",
                  position: "relative",
                  width: 320,
                  height: 480,

                  // backgroundcolor: "#020617",
                  backgroundColor: "#020617",
                  mx: "auto",
                  borderRadius: 4,
                  transform: "translateY(-6px)",
                  boxShadow: "inset 0 -40px 60px rgba(0,0,0,0.6)",
                  "&:hover": {
                    transform: "translateY(-10px) scale(1.02)",
                    boxShadow: "0 0 40px rgba(56,189,248,0.35)",
                    transition: "all 0.3s ease",
                  },
                  borderColor: "#22D3EE",
                }}
              >
                <CardActionArea onClick={() => navigate(`/carshow/${car.id}`)}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "200px",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        car.image_url ?
                          `${API}/images/${car.image_url}`
                        : "/images/bmw.avif"
                      }
                      sx={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",

                        overflow: "hidden",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/bmw.avif";
                      }}
                    />
                  </Box>
                  <CardContent
                    className="s1"
                    sx={{
                      color: "#cbd5f5",
                    }}
                  >
                    <Typography variant="h6">{car.brand}</Typography>

                    <Typography variant="h6">{car.model}</Typography>

                    <Typography variant="h6">{car.description}</Typography>

                    <Typography variant="h6"> {car.priceLabel}</Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Box
                    sx={{
                      mb: 2,
                      ml: 2,
                      display: "flex",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlcart(car.id);
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
