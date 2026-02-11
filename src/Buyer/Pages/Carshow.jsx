import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ExploreIcon from "@mui/icons-material/Explore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SpeedIcon from "@mui/icons-material/Speed";
import StarsIcon from "@mui/icons-material/Stars";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/bundle";

import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import BuyNow from "../../Util/BuyNow";
import { showSuccessAlert } from "../../Util/Alert";

export default function Oldcarshow() {
  const neonBlue = "#1e90ff";
  const navigate = useNavigate();
  const { id } = useParams();
  const [car, setCar] = useState(null);

  const user_id = localStorage.getItem("user_id");
  const buynow = BuyNow();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/buyer/car/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => setCar(res.data))
      .catch((err) => console.log("API ERROR:", err));
  }, [id]);

  const handleWishlist = () => {
    axios
      .post(`http://localhost:3000/buyer/wishlist/add/${user_id}/${id}`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => navigate("/wishlist"))
      .catch(console.log);
  };

  const handleBookDrive = () => {
    navigate(`/drive/${id}`);
  };

  const handlcart = () => {
    axios
      .post(
        `http://localhost:3000/buyer/addtocart/add/${user_id}/${id}`,
        null,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((Response) => {
        showSuccessAlert("Add to Cart this item");
        console.log(Response.data);
        navigate("/add-to-cart");
      });
  };

  const handlepayment = async () => {
    if (!car) return; // safety

    const totalamount = car.price;

    try {
      const user_id = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");

      const payload = {
        totalAmount: totalamount,
        paidBookingAmount: 40000,
        paymentMethod: "RAZORPAY",
      };

      const response = await axios.post(
        `http://localhost:3000/buyer/car/payment/add/${user_id}/${id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Payment initiated:", response.data);

      //  Razorpay only after backend success

      buynow.payNow(response.data.amount, response.data.razorpayOrderId);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  if (!car) {
    return (
      <>
        <Navbar />
        <Toolbar />
        <Typography align="center" sx={{ mt: 6 }}>
          Loading...
        </Typography>
        <Footer />
      </>
    );
  }

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
        {/* TOP CHIPS */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Chip
            icon={<FlashOnIcon />}
            label="TurboCharge"
            sx={{ color: neonBlue }}
          />
          <Chip
            icon={<StarsIcon />}
            label="5-Star Safety"
            sx={{ color: neonBlue }}
          />
          <Chip
            icon={<HeadsetMicIcon />}
            label="Smart Infotainment"
            sx={{ color: neonBlue }}
          />
        </Box>

        <Typography align="center" sx={{ mt: 2 }}>
          CRAFTED FOR PERFORMANCE & COMFORT
        </Typography>

        {/* MAIN GRID */}
        <Grid
          container
          spacing={6}
          mt={4}
          alignItems="center"
          justifyContent="center"
        >
          {/* IMAGE SECTION */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box
              sx={{
                width: "100%",
                maxWidth: 600,
                height: { xs: 260, md: 420 },
                borderRadius: 4,
                overflow: "hidden",
                boxShadow: "0 20px 60px rgba(30,144,255,0.4)",
                backgroundColor: "#000",
              }}
            >
              <Swiper
                modules={[Navigation, Pagination]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                navigation
              >
                {car.images && car.images.length > 0 ? (
                  car.images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <Box
                        component="img"
                        src={img.url}
                        alt={`car-${index}`}
                        sx={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <Box
                      component="img"
                      src={car.image_url || "/no-image.png"}
                      sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </SwiperSlide>
                )}
              </Swiper>
            </Box>
          </Grid>

          {/* DETAILS SECTION */}
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ color: neonBlue }}>
              {car.brand}
            </Typography>

            <Typography variant="h4" sx={{ color: "#4dbaff", mb: 2 }}>
              {car.model}
            </Typography>

            <Typography variant="h4" sx={{ color: "#4dbaff", mb: 2 }}>
              {car.price}
            </Typography>

            <Typography variant="h4" sx={{ color: "#4dbaff", mb: 2 }}>
              {car.carType}
            </Typography>

            <Box
              sx={{
                border: "1px solid #fff",
                borderRadius: 2,
                p: 2,
                display: "flex",
                flexWrap: "wrap",
                gap: 2,
                mb: 3,
              }}
            >
              <Box sx={{ width: "50%", display: "flex", gap: 1 }}>
                <CalendarTodayIcon sx={{ color: neonBlue }} />
                <Typography>{car.year}</Typography>
              </Box>

              <Box sx={{ width: "50%", display: "flex", gap: 1 }}>
                <SpeedIcon sx={{ color: neonBlue }} />
                <Typography>{car.km_driven} km</Typography>
              </Box>

              <Box sx={{ width: "50%", display: "flex", gap: 1 }}>
                <SettingsSuggestIcon sx={{ color: neonBlue }} />
                <Typography>{car.transmission}</Typography>
              </Box>

              <Box sx={{ width: "50%", display: "flex", gap: 1 }}>
                <ExploreIcon sx={{ color: neonBlue }} />
                <Typography>{car.type}</Typography>
              </Box>
            </Box>

            <Typography variant="h4">DESCRIPTION</Typography>
            <Typography sx={{ mb: 3 }}>{car.description}</Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <IconButton sx={{ color: "red" }} onClick={handleWishlist}>
                <FavoriteIcon />
              </IconButton>
              <IconButton sx={{ color: neonBlue }} onClick={handlcart}>
                <ShoppingCartIcon />
              </IconButton>
            </Box>

            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                variant="outlined"
                sx={{ width: "50%" }}
                onClick={handlepayment}
              >
                BUY NOW
              </Button>

              <Button
                variant="outlined"
                sx={{ width: "50%" }}
                onClick={handleBookDrive}
              >
                BOOK DRIVE
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </>
  );
}
