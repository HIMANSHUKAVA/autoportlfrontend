import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import { X } from "@mui/icons-material";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import BuyNow from "../../Util/BuyNow";

export default function Viewcar() {
  const [cars, setCars] = useState([]);
  const [searchParams] = useSearchParams();

  const buynow = BuyNow();
  const brand = searchParams.get("brand");
  const type = searchParams.get("type");
  const price = searchParams.get("price");

  const handlepayment = async (car) => {
    const totalamount = car.price;

    try {
      const user_id = localStorage.getItem("user_id");

      const payload = {
        totalAmount: totalamount,
        paidBookingAmount: 40000,
        paymentMethod: "RAZORPAY",
      };

const response = await axios.post(
  `https://autoportal.onrender.com/buyer/car/payment/add/${user_id}/${car.id}`,
  payload,
  {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  }
);


      buynow.payNow(response.data.amount, response.data.razorpayOrderId);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  // useeffeck hook

  useEffect(() => {
    fetchCars();
  }, [brand, type, price]);

  const fetchCars = async () => {
    try {
      if (brand && type && price) {
        const res = await axios.get("http://localhost:3000/buyer/car/filter", {
          params: { brand, type, pricelabel: price },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setCars(res.data);
      } else if (brand && type) {
        const res = await axios.get(
          "http://localhost:3000/buyer/cars/brand/type",
          {
            params: { brand, type },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setCars(res.data);
      } else if (brand) {
        const res = await axios.get("http://localhost:3000/buyer/cars/brand", {
          params: { brand },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setCars(res.data);
      } else if (type) {
        const res = await axios.get("http://localhost:3000/buyer/cars/type", {
          params: { type },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setCars(res.data);
      } else if (price) {
        const res = await axios.get(
          "http://localhost:3000/buyer/cars/price-label",
          {
            params: { pricelabel: price },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setCars(res.data);
      } else {
        //  IMPORTANT PART
        const res = await axios.get("http://localhost:3000/buyer/cars", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setCars(res.data);
      }
    } catch (error) {
      console.log("API ERROR:", error);
    }
  };

  const navigate = useNavigate();

  const neonBlue = "#1e90ff";

  const id1 = localStorage.getItem("user_id");
  const handlcart = (id) => {
    axios
      .post(`http://localhost:3000/buyer/addtocart/add/${id1}/${id}`)
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
                  height: "auto",
                  minHeight: 420,
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
                      image={car.image_url}
                      sx={{
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",

                        overflow: "hidden",
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
                    <Typography variant="h6"> {car.carType}</Typography>

                    <Typography variant="h6"> {car.price}</Typography>
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
                        console.log("clicked buy");
                        handlepayment(car);
                      }}
                    >
                      BuyNow
                    </Button>
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
