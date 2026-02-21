import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Footer from "../../Buyer/Layout/Footer";
import NavbarAndDrawer from "../layout/NavbarAndDrawer";

import "swiper/css/bundle";
import { showConfirmAlert, showSuccessAlert } from "../../Util/Alert";
import { deletevehiclebyid } from "../../comoonfunction/Vehicledelete";

export default function Singlecarpage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);

  const API = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    axios
      .get(`${API}/seller/request/get/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setCar(res.data))
      .catch(console.error);
  }, [id]);

  if (!car) return null;

  const carDetails = [
    ["Car Name", car.brand],
    ["Model", car.model],
    ["Fuel Type", car.fuel],
    ["Colour", car.colour],
    ["Condition", car.condition],
    ["Transmission", car.transmission],
    ["KM Driven", car.km_driven],
    ["Price", car.price],
    ["Description", "Well maintained, single owner, no accident history."],
  ];

  const handldelete = (id) => {
    showConfirmAlert(
      "Delete Car",
      "This action cannot be undone!",
      "Delete",
      "Cancel",
    ).then((res) => {
      if (res.isConfirmed) {
        deletevehiclebyid(id).then(() => {
          showSuccessAlert("Car Has Been Deleted");

          navigate("/sellardashboard");
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
          mt: "140px",
          px: { xs: 2, md: 3 },
          background: "linear-gradient(180deg, #0B1220 0%, #0E1A2B 100%)",
          color: "#fff",
        }}
      >
        {/* HEADER */}
        <Box sx={{ ml: { md: "30px" }, mb: 4 }}>
          <Typography variant="h4">View Vehicle Details</Typography>
          <Typography variant="body2">
            Details Of Your Selected Vehicle
          </Typography>
          <hr />
        </Box>

        {/* MAIN CONTENT */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 6,
            alignItems: "flex-start",
          }}
        >
          {/* IMAGE — FIXED DESKTOP SIZE */}
          <Box
            sx={{
              width: { xs: "100%", md: "40%" },
              maxWidth: "520px", // 🔒 DESKTOP CONTROL
              flexShrink: 0,
            }}
          >
            {/* <Box
              component="img"
              src={car.photo}
              sx={{
                width: "100%",
                height: { xs: "auto", md: "520px" },
                objectFit: "cover",
                borderRadius: 2,
              }}
            /> */}

            <Swiper
              modules={[Navigation, Pagination]}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
            >
              {car.images && car.images.length > 0 ?
                car.images.map((c, index) => (
                  <SwiperSlide key={index}>
                    <Box
                      component="img"
                      src={`${API}/images/${c.photos}`}
                      sx={{
                        width: "100%",
                        height: { xs: "auto", md: "520px" },
                        objectFit: "cover",
                        borderRadius: 2,
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/mahindra-xuv.avif";
                      }}
                    />
                  </SwiperSlide>
                ))
              : <SwiperSlide>
                  <Box
                    component="img"
                    src={
                      car.photo && car.photo !== "null" ?
                        `${API}/images/${car.photo}`
                      : "/images/mahindra-xuv.avif"
                    }
                    sx={{
                      width: "100%",
                      height: { xs: "auto", md: "520px" },
                      objectFit: "cover",
                      borderRadius: 2,
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/mahindra-xuv.avif";
                    }}
                  />
                </SwiperSlide>
              }
            </Swiper>
          </Box>

          {/* DETAILS */}
          <Box sx={{ width: { xs: "100%", md: "60%" } }}>
            {carDetails.map(([label, value], index) => (
              <Grid
                container
                key={index}
                sx={{
                  py: 1.5,
                  borderBottom: "1px solid rgba(255,255,255,0.1)",
                }}
                spacing={3}
              >
                <Grid item xs={12} sm={5}>
                  <Typography
                    sx={{
                      color: "rgba(255,255,255,0.7)",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </Typography>
                </Grid>

                <Grid item xs={12} sm={7}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      textAlign: { xs: "left", sm: "right" },
                      mt: { xs: 0.5, sm: 0 },
                    }}
                  >
                    {value}
                  </Typography>
                </Grid>
              </Grid>
            ))}

            {/* BUTTONS */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
                mt: 4,
              }}
            >
              <Button
                sx={{
                  border: "1px solid #FACC15",
                  color: "#FACC15",
                }}
                onClick={() => {
                  navigate(`/edit/${id}`);
                }}
              >
                Edit
              </Button>

              <Button
                onClick={() => {
                  handldelete(id);
                }}
                sx={{
                  border: "1px solid #EF4444",
                  color: "#EF4444",
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>

        <Footer />
      </Box>
    </>
  );
}
