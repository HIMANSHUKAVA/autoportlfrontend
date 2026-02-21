import DeleteIcon from "@mui/icons-material/Delete";
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
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyNow from "../../Util/BuyNow";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";

export default function Wishlist() {
  const [cars, setcars] = useState([]);

  const API = import.meta.env.VITE_API_BASE_URL;
  const buynow = BuyNow();
  useEffect(() => {
    axios
      .get(`${API}/buyer/wishlist/view`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),

          // Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((Response) => {
        setcars(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handldelete = (id) => {
    axios
      .delete(`${API}/wishlist/delete/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        setcars((prev) => prev.filter((item) => item.wishlist_id !== id));
        console.log("deleted");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const navigate = useNavigate();

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
        url = `${API}/buyer/car/payment/add/${user_id}/${car.id}`;
      } else if (car.carType === "OLD") {
        url = `${API}/buyer/oldcar/payment/add/${user_id}/${car.id}`;
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
            alignItems: "center",
          }}
        >
          <Typography variant="h4">Wishlist ❤️</Typography>
        </Box>
        <Grid container spacing={3}>
          {cars.map((item) => (
            <Grid item xs={12} md={3} key={item.wishlist_id}>
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
                    navigate(`/carshow/${item.c.id}`);
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      item.c.image_url ?
                        `${API}/images/${item.c.image_url}`
                      : "/images/bmw.avif"
                    }
                    sx={{
                      height: 220,
                      width: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/bmw.avif";
                    }}
                  />

                  <CardContent
                    sx={{
                      color: "#cbd5f5",
                    }}
                  >
                    <Typography variant="h6">{item.c.brand}</Typography>

                    <Typography variant="h6">{item.c.description}</Typography>

                    <Typography variant="h6">{item.c.type}</Typography>

                    <Typography variant="h6">{item.c.carType}</Typography>

                    <Typography variant="h6">{item.c.price}</Typography>
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
                        handlepayment(item.c);
                      }}
                    >
                      Buy Now
                    </Button>

                    <IconButton
                      color="error"
                      onClick={() => handldelete(item.wishlist_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
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
