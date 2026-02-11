import { Box, Typography } from "@mui/material";
import { useState } from "react";

import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Navigation, Pagination } from "swiper/modules";

export default function Carousel() {
  const carSliderData = [
    // Maruti
    {
      id: 1,
      brand: "Maruti",
      title: "Maruti eVitara",
      detail: "Premium Hybrid SUV with Smart Drive",
      image: "/images/Maruti.avif",
    },

    // Hyundai
    {
      id: 2,
      brand: "Hyundai",
      title: "Hyundai New Santa Fe",
      detail: "Luxury 7-Seater SUV with Hybrid Tech",
      image: "/images/hyundai.avif",
    },

    // Tata
    {
      id: 3,
      brand: "Tata",
      title: "Tata Curvv EV",
      detail: "Stylish Electric SUV with Next-Gen Features",
      image: "/images/tata-curv.jpg",
    },

    // Kia
    {
      id: 4,
      brand: "Kia",
      title: "Kia EV9",
      detail: "Premium 7-Seater Electric SUV",
      image: "/images/kia-ev9.jpg",
    },

    // Toyota
    {
      id: 5,
      brand: "Toyota",
      title: "Toyota Urban Cruiser Taisor",
      detail: "Sporty, Powerful Compact SUV",
      image: "/images/toyota-urban.jpg",
    },

    // Honda
    {
      id: 6,
      brand: "Honda",
      title: "Honda Elevate",
      detail: "Strong, Stylish SUV for City & Highway",
      image: "/images/honda-elevate.avif",
    },

    // Mahindra
    {
      id: 7,
      brand: "Mahindra",
      title: "Mahindra XUV700 AX7",
      detail: "ADAS Safety, Powerful Performance",
      image: "/images/mahindra-xuv.avif",
    },

    // MG
    {
      id: 8,
      brand: "MG",
      title: "MG Hector 2024",
      detail: "Bold Design, Advanced Tech SUV",
      image: "/images/MG-hector.avif",
    },

    // Volkswagen
    {
      id: 9,
      brand: "Volkswagen",
      title: "Volkswagen Taigun GT Plus",
      detail: "German Engineering, Turbo Power",
      image: "/images/volkswagen-taigun-gt-plus-.jpg",
    },

    // Skoda
    {
      id: 10,
      brand: "Skoda",
      title: "Skoda Kushaq Monte Carlo",
      detail: "Premium SUV with Class & Safety",
      image: "/images/skod.avif",
    },

    // BMW
    {
      id: 11,
      brand: "BMW",
      title: "BMW iX",
      detail: "Pure Electric Luxury SUV",
      image: "/images/bmw.avif",
    },

    // Mercedes
    {
      id: 12,
      brand: "Mercedes",
      title: "Mercedes EQE SUV",
      detail: "Luxury Electric SUV with Advanced Tech",
      image: "/images/mercedez.webp",
    },
  ];

  const [Activeindex, setActiveindex] = useState(0);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "70vh",
          position: "relative",
          overflow: "hidden",
          background: "#000",
          mt: 4,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            backgroundImage: `url(${carSliderData[Activeindex].image})`,
            inset: 0,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 1s ease-in-out",
            filter: "brightness(0.5)",
          }}
        >
          <Box
            sx={{
              position: "relative",
              zIndex: 5,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
              px: { xs: 3, md: 10 },
              color: "white",
            }}
          >
            {/* Dynamic Contex  */}
            <Box
              sx={{
                flex: 1,
                pr: { xs: 0, md: 8 },
                textAlign: "left",
                transition: "all 0.5s ease",

                mt: { xs: 5, sm: 10, md: 18, lg: 28 },
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  mb: 1,
                  textShadow: "0 5px 25px rgba(0,0,0,0.7)",
                }}
              >
                {carSliderData[Activeindex].title}
              </Typography>

              <Typography
                variant="h5"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  mb: 1,
                  textShadow: "0 5px 25px rgba(0,0,0,0.7)",
                }}
              >
                {carSliderData[Activeindex].detail}
              </Typography>
            </Box>

            <Box
              sx={{
                width: { xs: "100%", sm: "80%", md: 600, lg: 650 },
                height: {
                  xs: 250,
                  sm: 300,
                  md: 330,
                  lg: 350,
                },
              }}
            >
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                breakpoints={{
                  0: { slidesPerView: 1.1 },
                  480: { slidesPerView: 1.5 },
                  768: { slidesPerView: 2.2 },
                  1024: { slidesPerView: 2.8 },
                }}
                spaceBetween={25}
                centeredSlides
                loop
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                Navigation
                speed={600}
                onSlideChange={(Swiper) => {
                  const newindex = Swiper?.realIndex ?? 0;

                  if (newindex >= 0 && newindex < carSliderData.length)
                    setActiveindex(newindex);
                }}
                className="foreground-swiper"
              >
                {/* slider slide */}
                {carSliderData.map((item) => (
                  <>
                    <SwiperSlide key={item.id}>
                      <Box
                        sx={{
                          height: 350,
                          borderRadius: 3,
                          backgroundImage: `url(${item.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          transition: "all 0.6s ease",
                          position: "relative",
                        }}
                      >
                        <Box
                          sx={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            flexDirection: "column",
                            p: 3,

                            justifyContent: "flex-end",
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              backgroundColor: "rgba(117, 174, 234, 0.8)",
                              fontWeight: "bold",
                              px: 1,
                              py: 0.5,
                              display: "inline-block",
                              borderRadius: 3,
                            }}
                          >
                            {item.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              fontWeight: "bold",
                              px: 1,
                              py: 0.5,
                              display: "inline-block",
                              borderRadius: 3,
                            }}
                          >
                            {item.detail}
                          </Typography>
                        </Box>
                      </Box>
                    </SwiperSlide>
                  </>
                ))}
              </Swiper>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
