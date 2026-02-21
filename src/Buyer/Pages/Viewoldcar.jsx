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
import { useNavigate, useSearchParams } from "react-router-dom";
import BuyNow from "../../Util/BuyNow";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";

export default function Viewoldcar() {
  const [cars, setCars] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const brand = searchParams.get("brand");
  const type = searchParams.get("type");
  const price = searchParams.get("price");

  useEffect(() => {
    fetchCars();
    // eslint-disable-next-line
  }, [brand, type, price]);

  const API = import.meta.env.VITE_API_BASE_URL;
  const fetchCars = async () => {
    try {
      let res;

      if (brand && type && price) {
        res = await axios.get(`${API}/buyer/oldcar/filter`, {
          params: { brand, type, pricelabel: price },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      } else if (brand && type) {
        res = await axios.get(`${API}/buyer/oldcar/brand/type`, {
          params: { brand, type },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      } else if (brand) {
        res = await axios.get(`${API}/buyer/oldcar/brand`, {
          params: { brand },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      } else if (type) {
        res = await axios.get(`${API}/buyer/oldcar/type`, {
          params: { type },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      } else if (price) {
        res = await axios.get(`${API}/buyer/oldcar/pricelabel`, {
          params: { price },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
      } else {
        setCars([]);
        return;
      }

      setCars(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("API ERROR:", error);
      setCars([]);
    }
  };

  const userId = localStorage.getItem("user_id");

  const handleCart = (carId) => {
    axios
      .post(`${API}/buyer/addtocart/add/${userId}/${carId}`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => navigate("/add-to-cart"))
      .catch(console.error);
  };
  const buynow = BuyNow();
  const handlpayment = async (car) => {
    if (!car) return;

    const totalamount = car.price;

    try {
      const user_id = localStorage.getItem("user_id");

      // const bookingAmount = 40000 * 0.1;

      const payload = {
        totalAmount: totalamount,
        paidBookingAmount: 40000,
        paymentMethod: "RAZORPAY",
      };

      const response = await axios.post(
        `${API}/buyer/oldcar/payment/add/${user_id}/${car.id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      );

      buynow.payNow(response.data.amount, response.data.razorpayOrderId);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };
  return (
    <>
      <Navbar />
      <Toolbar />

      <Box sx={{ px: 4, py: 6, backgroundColor: "#020617", color: "#cbd5f5" }}>
        <Typography
          variant="h3"
          sx={{ mb: 4, textAlign: "center", color: "#1e90ff" }}
        >
          Explore Old Cars
        </Typography>

        {/* EMPTY STATE */}
        {cars.length === 0 && (
          <Typography sx={{ textAlign: "center", mt: 4 }}>
            No cars found for selected filter
          </Typography>
        )}

        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid item xs={12} md={3} key={car.id}>
              <Card sx={{ backgroundColor: "#020617", borderRadius: 3 }}>
                <CardActionArea
                  onClick={() => navigate(`/oldcarshow/${car.id}`)}
                >
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
                  <CardContent sx={{ color: "white" }}>
                    <Typography>{car.brand || "N/A"}</Typography>
                    <Typography>{car.model || "N/A"}</Typography>
                    <Typography>
                      {car.description || "No description"}
                    </Typography>
                    <Typography>{car.carType || "No description"}</Typography>

                    <Typography>{car.priceLabel || "N/A"}</Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions>
                  <Button variant="outlined" onClick={() => handlpayment(car)}>
                    Buy Now
                  </Button>
                  <Button variant="outlined" onClick={() => handleCart(car.id)}>
                    Add To Cart
                  </Button>
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
