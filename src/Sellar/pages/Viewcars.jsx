import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Buyer/Layout/Footer";
import { showConfirmAlert, showSuccessAlert } from "../../Util/Alert";
import { deletevehiclebyid } from "../../comoonfunction/Vehicledelete";
import NavbarAndDrawer from "../layout/NavbarAndDrawer";
export default function Viewcars() {
  const [car, setcar] = useState([]);
  const API = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API}/seller/request/view`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })
      .then((Response) => {
        console.log(Response.data);

        setcar(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handeldelete = (id) => {
    showConfirmAlert(
      "Delete Car",
      "This action cannot be undone!",
      "Delete",
      "Cancel",
    ).then((res) => {
      if (res.isConfirmed) {
        deletevehiclebyid(id).then(() => {
          setcar((prev) => prev.filter((c) => c.sellarcarid !== id));
        });
      }
    });
  };
  return (
    <>
      <NavbarAndDrawer />
      <Box
        component="main"
        sx={{
          ml: { xs: 0, md: "220px" },
          mt: "140px", // 2 AppBar height
          px: { xs: 0, md: 3 },
          width: "100%",
          background: "linear-gradient(180deg, #0B1220 0%, #0E1A2B 100%)",
          color: "#FFFFFF",
          fontFamily: `'Inter', sans-serif`,
          // minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            position: "relative",
            ml: { xs: 0, md: "30px" },
            px: { xs: 1, sm: 0 },
            top: { xs: 0, md: 24 },
          }}
        >
          <Typography variant="h4">My Vehicles</Typography>
          <Typography variant="body2">All Vehicles Added By You</Typography>

          <hr style={{ color: "white", marginTop: "15px" }} />
        </Box>

        <Grid
          container
          spacing={3}
          sx={{
            marginTop: 8,
            px: 5,
            maxWidth: "1300px",
          }}
        >
          {car.map((c, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  overflow: "hidden",
                  position: "relative",
                  width: "100%",
                  // height: { xs: 0, md: 470 },
                  // minHeight: 420,
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
                    navigate(`/singlepage/${c.sellarcarid}`);
                    console.log("clicked");
                  }}
                >
                  <CardMedia
                    component="img"
                    src={
                      c.photo ? `${API}/images/${c.photo}` : "/images/bmw.avif"
                    }
                    sx={{
                      objectFit: "cover",
                      height: { xs: 220, md: 300 },
                      minWidth: 500,
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/bmw.avif";
                    }}
                  />
                  <CardContent
                    sx={{
                      color: "white",
                      flexGrow: 1,
                    }}
                  >
                    <Typography variant="h6">
                      {c.name} {c.model}
                    </Typography>
                    <Typography variant="body1">
                      {c.colour} <br /> {c.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>

                <CardActions
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mb: 3,
                  }}
                >
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/edit/${c.sellarcarid}`);
                    }}
                    sx={{
                      border: "1px solid",
                      borderRadius: 2,
                      borderColor: "#FACC15",
                      color: "#FACC15",
                      "&:hover": {
                        backgroundColor: "rgba(250,204,21,0.15)",
                      },
                      px: 2,
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handeldelete(c.sellarcarid);
                    }}
                    sx={{
                      border: "1px solid",
                      borderRadius: 2,
                      px: 2,
                      borderColor: "#EF4444",
                      color: "#EF4444",
                      "&:hover": {
                        backgroundColor: "rgba(239,68,68,0.15)",
                      },
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Footer />
      </Box>
    </>
  );
}
