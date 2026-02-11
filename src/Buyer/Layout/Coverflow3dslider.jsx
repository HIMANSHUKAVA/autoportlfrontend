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
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

export default function Coverflow3dslider() {
  const carServices = [
    {
      id: 1,
      title: "Premium Car Wash",
      description: "Exterior foam wash, interior vacuum, tyre polish.",
      image: "/images/car_wash.jpg",
      price: "₹699",
    },
    {
      id: 2,
      title: "Full Service",
      description: "Engine oil, filter change, full health check-up.",
      image: "/images/3d_1.webp",
      price: "₹2,499",
    },
    {
      id: 3,
      title: "AC Service",
      description: "AC gas top-up, filter cleaning, cooling check.",
      image: "/images/ac_service_side.avif",
      price: "₹1,299",
    },
    {
      id: 4,
      title: "Detailing & Polishing",
      description: "Interior detailing, exterior polishing, waxing.",
      image: "/images/detailing.webp",
      price: "₹3,999",
    },
    {
      id: 5,
      title: "Scrab Car",
      description: "Your scrap car is Worth More Than You Think",
      image: "/images/scrab_car.webp",
      price: "₹3,999 up",
    },

    {
      id: 6,
      title: "Battery Check & Replacement",
      description:
        "Battery health check, jump-start service and genuine battery replacement with warranty.",
      image: "/images/batery.webp",
      price: "₹2250",
    },

    {
      id: 7,
      title: "Wheel Alignment & Balancing",
      description:
        "Computerized wheel alignment and balancing for smooth drive, better mileage and tyre life.",
      image: "/images/wheel.jpg",
      price: "₹1289",
    },

    {
      id: 8,
      title: "Break Service Repair",
      description:
        "Brake pad replacement, disc servicing and complete braking system safety check.",
      image: "/images/break.webp",
      price: "1100",
    },

    {
      id: 9,
      title: "Car Electrical Repair",
      description:
        "Power windows, lighting system, wiring, horn and central lock electrical troubleshooting.",
      image: "/images/electricrepair.jpg",
      price: "₹5,999",
    },

    {
      id: 10,
      title: "Roadside Assistance",
      description:
        "24x7 emergency towing, battery jump start, breakdown help and accident support.",
      image: "/images/roadside.webp",
      price: "₹2,599",
    },

    {
      id: 11,
      title: "Insurance & Claim Assistance",
      description:
        "Vehicle insurance renewal, accident claim filing and fast cashless repair support.",
      image: "/images/insurence.jpg",
      price: "₹120/Month",
    },

    {
      id: 12,
      title: "Interior Deep Cleaning",
      description:
        "Seat shampoo, roof cleaning, dashboard restoration and odor removal service.",
      image: "/images/depp_cleaning.jpeg",
      price: "₹760",
    },

    {
      id: 13,
      title: "Tyre Replacement & Puncture Service",
      description:
        "New tyre fitting, nitrogen air filling and instant puncture repair at affordable rates.",
      image: "/images/puncture.jpg",
      price: "₹2378",
    },

    {
      id: 14,
      title: "Scrap Car / Old Car Buyback",
      description:
        "Instant online valuation and best price buyback for old, damaged and scrap vehicles.",
      image: "/images/oldcar.jpg",
      price: "₹1679",
    },
  ];

  return (
    <>
      <Box
        sx={{
          py: 6,
          px: { xs: 6, md: 6 },
          background: "linear-gradient(135deg, #0f172a, #020617)",
          // minHeight: "100vh",
          color: "#fff",
        }}
      >
        {/* first contaianer is ttiel for card */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography variant="h2" sx={{ fontWeight: "12px" }}>
            Our Services
          </Typography>
        </Box>

        {/* like swiipper */}
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            depth: 100,
            rotate: 0,
            stretch: 0,
            modifier: 5,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[EffectCoverflow, Navigation, Pagination, Autoplay]}
        >
          {carServices.map((service) => (
            <SwiperSlide
              key={service.id}
              style={{
                width: "380px",
                maxWidth: "80vw",
              }}
            >
              <Card
                sx={{
                  borderRadius: 4,

                  backgroundColor: "#020617",
                  border: "1px solid rgba(148, 163, 184, 0.25)",
                  boxShadow:
                    "0 20px 40px rgba(15, 23, 42, 0.8), 0 0 0 1px rgba(148, 163, 184, 0.1)",
                }}
              >
                <CardMedia
                  component="img"
                  image={service.image}
                  sx={{
                    height: 220,
                    width: "100%",
                    objectFit: "cover",
                  }}
                  alt={service.title}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{
                      color: "white",
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: "white",
                    }}
                  >
                    {service.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      mt: 2,
                      color: "white",
                    }}
                  >
                    {service.price}
                  </Typography>
                </CardContent>

                <CardActions>
                  <Button
                    variant="outlined"
                    sx={{
                      display: "flex",
                      mx: "auto",
                    }}
                  >
                    Buy Now
                  </Button>
                </CardActions>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
}
