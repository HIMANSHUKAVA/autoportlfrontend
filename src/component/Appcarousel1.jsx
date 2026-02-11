import { Box, Typography } from "@mui/material";
import { useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Appcarousel1() {
  // Create the Array Of Car
  const cardetail = [
    {
      id: 1,
      title: "Hyundai Verna",
      detail: "Latest Model Mileage",
      image: "/images/verna_car_images.jpeg",
    },
    {
      id: 2,
      title: "Tata Nexon Ev",
      detail: "Electric Power, Zero Emission",
      image: "/images/tata_neon_ev.jpeg",
    },
    {
      id: 3,
      title: "Maruti Swift",
      detail: "Most Trusted Hatchback",
      image: "/images/maruti_swift.jpeg",
    },
    {
      id: 4,
      title: "Mahindra Scorpio",
      detail: "Rugged SUV, Powerful Engine",
      image: "/images/Mahindra_scorpio.jpeg",
    },
    {
      id: 5,
      title: "Toyota Innova Hycross",
      detail: "Premium MPV, Hybrid Tech",
      image: "/images/toyoto.jpeg",
    },
  ];

  //   Create the state it's define which slide is active in carousel
  const [Activeindex, setActiveindex] = useState(0);

  return (
    <>
      {/*  this is first and main box of carousel */}

      <Box
        sx={{
          width: "100%",
          height: "70vh",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#000",
          mt: 4,
        }}
      >
        {/*  This is second box it's indicate backgraound images of slides */}

        <Box
          sx={{
            position: "absolute",
            backgroundImage: `url(${cardetail[Activeindex].image})`,
            inset: 0,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "background-image 1s ease-in-out",
            filter: "brightness(0.5)",
          }}
        >
          {/* foregin slide its define slide and tex boxes */}
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
            {/* Dynamic Text Content */}

            <Box
              sx={{
                flex: 1,
                pr: { xs: 0, md: 8 },
                textAlign: "left",
                transition: "all 0.5s ease",
              }}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  mb: 1,
                  textShadow: "0 5px 25px rgba(0,0,0,0.7)",
                }}
                variant="h2"
              >
                {cardetail[Activeindex].title}
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  opacity: 0.9,
                  textShadow: "0 4px 15px  rgba(0,0,0,0.6)",
                }}
              >
                {cardetail[Activeindex].detail}
              </Typography>
            </Box>

            <Box sx={{ width: { xs: "100%", md: "60%" } }}>
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={2.8}
                spaceBetween={25}
                centeredSlides
                loop
                autoplay={{
                  delay: 2000,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                navigation
                speed={700}
                onSlideChange={(swiper) => {
                  const newindex = swiper?.realIndex ?? 0;

                  if (newindex >= 0 && newindex < cardetail.length) {
                    setActiveindex(newindex);
                  }
                }}
                className="foreground-swiper"
              >
                {/* slider banana */}
                {cardetail.map((car) => (
                  <>
                    <SwiperSlide key={car.id}>
                      <Box
                        sx={{
                          height: 350,
                          borderRadius: 3,
                          backgroundImage: `url(${car.image})`,
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
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))",
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Typography
                            variant="caption"
                            sx={{
                              backgroundColor: "rgba(0,122,255,0.8)",
                              fontWeight: "bold",
                              px: 1,
                              py: 0.5,
                              display: "inline-block",
                              borderRadius: 3,
                            }}
                          >
                            {car.title}
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            {car.detail}
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
        <style>
          {`
        .foreground-swiper .swiper-slide{
           transorm : scale(0.8),
           opacity : 0.6,
           transition : all 0.8e ease
        }

        .foreground-swiper .swiper-slide-active {
             transform : scale(1);
             opacity:1;
             z-index : 10;
        }
        .swiper-button-next , swiper-button-prev {
         color : '#fff;
         text-shadow : 0 0 10px rgba(255 , 255 , 255 , 0.8);

        }

        .swiper-pagination-bullet {
  background: #fff;
  opacity: 0.7;
}
.swiper-pagination-bullet-active {
  background: #ffcc00;
  opacity: 1;
}

        `}
        </style>
      </Box>
    </>
  );
}
