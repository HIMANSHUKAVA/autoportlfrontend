import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import VerifiedIcon from "@mui/icons-material/Verified";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
export default function About() {
  const carddeta = [
    { title: "10,000+", desc: "Cars Listed" },
    { title: "5,000+", desc: "Happy Users" },
    { title: "Verified", desc: "Dealers" },
    { title: "4.9", desc: "Rating" },
  ];
  const car2deta = [
    {
      title: <VerifiedIcon sx={{ color: "#38bdf8", fontSize: 40 }} />,
      des: "Verified Dealers",
    },
    {
      title: <VerifiedUserIcon sx={{ color: "#38bdf8", fontSize: 40 }} />,
      des: "Best Price Gurantee",
    },
    {
      title: <VerifiedUserIcon sx={{ color: "#38bdf8", fontSize: 40 }} />,
      des: "Zero Hidden charges",
    },

    {
      title: <SupportAgentIcon sx={{ color: "#38bdf8", fontSize: 40 }} />,
      des: "24*7 Support",
    },
  ];
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <Box
        sx={{
          background: "linear-gradient(135deg, #020617, #020617)",
          // minHeight: "90vh",
          color: "#cbd5f5",
          py: 3,
          px: { xs: 2, md: 6 },
        }}
      >
        <Container>
          <Grid container justifyContent="space-between">
            <Grid
              item
              xs={12}
              md={6}
              alignContent="center"
              data-aos="fade-right"
            >
              <Typography variant="h3">
                ABOUT <br /> AUTO PORTAL
              </Typography>
              <Typography variant="body2">
                Indiais Most Trusted Car Buying & Selling Platform
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  sx={{
                    color: "#38bdf8",
                    borderColor: "#38bdf8",
                    mr: 2,
                    borderRadius: 2,
                  }}
                  onClick={() => {
                    navigate("/cars");
                  }}
                >
                  Explore More
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    color: "#38bdf8",
                    borderColor: "#38bdf8",
                    mr: 2,
                    borderRadius: 2,
                  }}
                  onClick={() => {
                    navigate("/contect");
                  }}
                >
                  Contect us
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={6} data-aos="fade-left">
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <img
                  src="/images/about2.jpeg"
                  style={{
                    width: "100%",
                    maxHeight: "320px",
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Container>
          <Grid container justifyContent="space-between">
            <Grid
              item
              xs={12}
              md={6}
              alignContent="center"
              data-aos="zoom-in-up"
            >
              <Typography variant="h3">WHO WE ARE</Typography>
              <Typography variant="body2" sx={{ mt: 1, textAlign: "justify" }}>
                Auto Portal Is A Cutting-Edge Platform That
                <br /> Offers New Cars , Old Cars , And Car Services <br /> All
                In One Place
              </Typography>
            </Grid>

            <Grid item xs={12} md={6} data-aos="zoom-in-up">
              <Box
                sx={{
                  background:
                    "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(2,6,23,0.9))",
                  border: "1px solid rgba(56,189,248,0.4)",
                  borderRadius: "18px",
                  p: "28px",
                  boxShadow: "0 0 25px rgba(56,189,248,0.35)",
                  backdropFilter: "blur(12px)",
                  color: "#e5e7eb",
                  maxWidth: "520px",
                  marginLeft: "auto",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#38bdf8",
                    mb: 1,
                  }}
                >
                  Who We Are
                </Typography>

                <Typography
                  sx={{ fontSize: "15px", lineHeight: 1.7, color: "#cbd5f5" }}
                >
                  Auto Portal is a cutting-edge platform that offers new cars,
                  old cars, and trusted car services all in one place. We make
                  car buying simple, safe, and transparent for everyone.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <Container>
          <Grid container justifyContent="center" spacing={4} mt={4}>
            {carddeta.map((car, i) => (
              <Grid
                item
                xs={12}
                md={3}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <Card
                  sx={{
                    background: "#020617",
                    border: "1px solid rgba(148,163,184,0.2)",
                    textAlign: "center",
                    color: "#cbd5f5",
                    borderRadius: 3,
                    maxWidth: 320,
                    minWidth: 230,
                    boxShadow: "0 0 30px rgba(56,189,248,0.25)",
                    backdropFilter: "blur(10px)",
                    transition: "0.6s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 0 35px rgba(56,189,248,0.45)",
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h3">{car.title}</Typography>
                    <Typography variant="body1">{car.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container>
          <Typography variant="h4" sx={{ mt: 3 }}>
            WHY CHOOSE US
          </Typography>
          <Grid container justifyContent="center" spacing={4} mt={4}>
            {car2deta.map((car, i) => (
              <Grid
                item
                xs={12}
                md={3}
                data-aos="flip-left"
                data-aos-delay={i * 100}
              >
                <Card
                  sx={{
                    background: "#020617",
                    border: "1px solid rgba(148,163,184,0.2)",
                    textAlign: "center",
                    color: "#cbd5f5",
                    borderRadius: 3,
                    maxWidth: 320,
                    minWidth: 230,
                    minHeight: 100,
                    boxShadow: "0 0 30px rgba(56,189,248,0.25)",
                    backdropFilter: "blur(10px)",
                    transition: "0.6s",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 0 35px rgba(56,189,248,0.45)",
                    },
                  }}
                >
                  <CardContent>
                    {car.title}
                    <br />
                    {car.des}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        <Container>
          <Grid container spacing={4} mt={4} justifyContent="center">
            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  background: "#020617",
                  border: "1px solid rgba(148,163,184,0.2)",
                  textAlign: "center",
                  color: "#cbd5f5",
                  borderRadius: 3,
                  width: "100%",
                  minHeight: 160,

                  boxShadow: "0 0 30px rgba(56,189,248,0.25)",
                  backdropFilter: "blur(10px)",
                  transition: "0.6s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 0 35px rgba(56,189,248,0.45)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5">OUR MISSION</Typography>
                  <Typography variant="body2">
                    To Provaide A Seamless And Trustworthy Car Buying And
                    Selling Experience.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card
                sx={{
                  background: "#020617",
                  border: "1px solid rgba(148,163,184,0.2)",
                  textAlign: "center",
                  color: "#cbd5f5",
                  borderRadius: 3,
                  width: "100%",
                  minHeight: 160,
                  boxShadow: "0 0 30px rgba(56,189,248,0.25)",
                  backdropFilter: "blur(10px)",
                  transition: "0.6s",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 0 35px rgba(56,189,248,0.45)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5">OUR VISSION</Typography>
                  <Typography variant="body2">
                    To Be The Leading Online Marketplace For AutoMotivee Needs.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>

        <Typography variant="h5" sx={{ textAlign: "center", mt: 2 }}>
          Ready To Find Your Dream Car
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 0,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "#38bdf8",
              borderColor: "#38bdf8",
              mr: 2,
              borderRadius: 2,
            }}
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            GetStarted
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#38bdf8",
              borderColor: "#38bdf8",
              mr: 2,
              borderRadius: 2,
            }}
            onClick={() => {
              navigate("/contect");
            }}
          >
            Contect Us
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
