import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function S() {
  const reviews = [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Car Owner",
      rating: 5,
      comment:
        "Premium car wash and detailing service is outstanding. Car bilkul showroom jaisi lag rahi thi!",
      avatar: "/images/avtar_boy.jpeg",
    },
    {
      id: 2,
      name: "Priya Verma",
      role: "Regular Customer",
      rating: 4.5,
      comment:
        "Fast service, friendly staff and honest suggestions. Full service package value for money hai.",
      avatar: "/images/avtargrl.jpeg",
    },
    {
      id: 3,
      name: "Aman Gupta",
      role: "Business Owner",
      rating: 4,
      comment:
        "AC service aur brake check ke baad drive smooth ho gayi. Definitely recommend for regular maintenance.",
      avatar: "/images/avtargirl4.jpeg",
    },
    {
      id: 4,
      name: "Sneha Patel",
      role: "New Car Owner",
      rating: 5,
      comment:
        "Interior deep cleaning ne puri car ki feel change kar di. Bahut hi professional work.",
      avatar: "/images/avtar1.avif",
    },

    {
      id: 5,
      name: "Sneha Patel",
      role: "New Car Owner",
      rating: 5,
      comment:
        "Interior deep cleaning ne puri car ki feel change kar di. Bahut hi professional work.",
      avatar: "/images/avtar_boy.jpeg.jpg",
    },

    {
      id: 6,
      name: "Sneha Sharma",
      role: "New Car Owner",
      rating: 4,
      comment:
        "Interior deep cleaning ne puri car ki feel change kar di. Bahut hi professional work.",
      avatar: "/images/avtar_boy.jpg",
    },
  ];
  return (
    <>
      <Box
        sx={{
          py: 6,
          px: { xs: 2, md: 6 },
          background: "linear-gradient(135deg, #020617, #020617)",
          color: "#fff",
          // minHeight: "100vh",
        }}
      >
        {/* title of section */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ mb: 3 }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Customer Review
          </Typography>
        </Box>

        {/* create a slider */}
        <Swiper
          // effect="slide"
          loop
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          centeredSlides={true}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((r) => (
            <SwiperSlide>
              <Card
                sx={{
                  width: 320,
                  height: "auto",
                  minHeight: 420,
                  mx: "auto",
                  borderRadius: 4,
                  border: "1px solid rgba(148, 163, 184, 0.3)",
                  boxShadow:
                    "0 20px 40px rgba(15, 23, 42, 0.8), 0 0 0 1px rgba(148, 163, 184, 0.1)",
                  backgroundColor: "#020617",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Avatar
                    src={r.avatar}
                    sx={{
                      width: 120,
                      height: 120,
                      mt: 3,
                      mb: 1,
                      borderRadius: "50%",
                      alignSelf: "center",
                      border: "4px solid #38bdf8",
                      boxShadow: "0 0 18px rgba(56,189,248,0.8)",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    sx={{
                      mt: 2,
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {r.name}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        color: "white",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {r.role}
                    </Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "center", mt: 2 }}
                  >
                    <Rating
                      value={r.rating}
                      precision={0.5}
                      readOnly
                      sx={{ mb: 2 }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "rgba(226,232,240,0.95)", lineHeight: 1.6 }}
                    >
                      “{r.comment}”
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
