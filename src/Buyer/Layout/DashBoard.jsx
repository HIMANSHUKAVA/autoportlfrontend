import Navbar from "./Navbar";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Carousel from "./Carousel";
import Theme from "./Theme";
import Coverflow3dslider from "./Coverflow3dslider";
import S from "./S";
// import Loancalculator from "./LoanCalculator";
import Loan from "./Loan";
import Ourbrand from "./Ourbrand";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const navigate = useNavigate();
  useEffect(() => {
    const islogin = localStorage.getItem("islogin");
    if (!islogin) {
      navigate("/", { replace: true });
    }
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  return (
    <>
      <Box
        sx={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.06) 0%, #050B14 35%, #00040A 100%)",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Navbar />
        <Carousel />
        <Theme />
        <Coverflow3dslider />
        <Loan />
        <S />
        <Ourbrand />
        <Footer />
        {/* Card Themed Section */}
      </Box>
    </>
  );
}
