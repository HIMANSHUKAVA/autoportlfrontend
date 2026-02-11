import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BuyNow from "../../Util/BuyNow";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
export default function Addtocart() {
  // http://localhost:3000/addtocart/

  const [cart, setcart] = useState([]);
  const neonBlue = "#1e90ff";
  const buynow = BuyNow();
  const handldelete = (id) => {
    axios
      .delete(`http://localhost:3000/buyer/addtocart/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setcart((prev) => prev.filter((item) => item.cart_id !== id));
      })
      .catch(console.log);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/buyer/addtocart/view`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((Response) => {
        console.log(Response.data);

        setcart(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();
  const total_price = cart.reduce((sum, cart) => sum + cart.car.price, 0);

  const handlepayment = async (car) => {
    const totalamount = car.price;
    const user_id = localStorage.getItem("user_id");
    const token = localStorage.getItem("token");

    const payload = {
      totalAmount: totalamount,
      paidBookingAmount: 40000,
      paymentMethod: "RAZORPAY",
    };

    try {
      let url = "";

      //  IMPORTANT PART
      if (car.carType === "NEW") {
        url = `http://localhost:3000/buyer/car/payment/add/${user_id}/${car.id}`;
      } else if (car.carType === "OLD") {
        url = `http://localhost:3000/buyer/oldcar/payment/add/${user_id}/${car.id}`;
      } else {
        alert("Unknown car type");
        return;
      }

      const response = await axios.post(url, payload, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      // Razorpay open
      buynow.payNow(response.data.amount, response.data.razorpayOrderId);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };
  return (
    <>
      <Navbar />
      <Toolbar />
      <Box
        sx={{
          background: "linear-gradient(135deg, #020617, #020617)",
          minHeight: "90vh",
          color: "#cbd5f5",
          py: 3,
          px: { xs: 2, md: 6 },
          mt: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h3">Add To Cart</Typography>
        </Box>

        <Grid container spacing={3}>
          {cart.map((item) => (
            <Grid item xs={12} md={3} key={item.cart_id}>
              <Card
                sx={{
                  overflow: "hidden",
                  position: "relative",
                  width: 320,
                  height: "auto",
                  minHeight: 420,
                  mt: 5,
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
                <CardActionArea
                  onClick={() => {
                    navigate(`/carshow/${item.car.id}`);
                  }}
                >
                  <CardMedia
                    component="img"
                    image={item.car.image_url}
                    sx={{
                      objectFit: "cover",
                      width: "100%",
                      height: 220,
                    }}
                  />

                  <CardContent
                    sx={{
                      color: "#cbd5f5",
                    }}
                  >
                    <Typography variant="h6">{}</Typography>

                    <Typography variant="h6">{item.car.brand}</Typography>
                    <Typography variant="h6">{item.car.description}</Typography>
                    <Typography variant="h6">{item.car.price}</Typography>
                    <Typography variant="h6">{item.car.carType}</Typography>
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
                        handlepayment(item.car);
                      }}
                    >
                      Buy Now
                    </Button>

                    <IconButton
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handldelete(item.cart_id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box
          sx={{
            mt: 6,
            p: 3,
            maxWidth: 400,
            ml: "auto",
            backgroundColor: "#020617",
            border: "1px solid #22D3EE",
            borderRadius: 3,
            boxShadow: "0 0 20px rgba(56,189,248,0.25)",
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, color: "#22D3EE" }}>
            Cart Summary
          </Typography>

          <Typography variant="h6">Total Cars: {cart.length}</Typography>

          <Typography variant="h4" sx={{ mt: 2 }}>
            Total Price: ₹{total_price.toLocaleString("en-IN")}
          </Typography>

          {/* <Button
            fullWidth
            sx={{
              mt: 3,
              background: "linear-gradient(90deg, #007BFF, #FF4D4D)",
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                background: "linear-gradient(90deg, #005BEA, #FF1E56)",
              },
            }}
          >
            Proceed to Checkout
          </Button> */}
        </Box>
      </Box>
      <Footer />
    </>
  );
}
