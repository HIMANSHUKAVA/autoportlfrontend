import React from "react";
import NavbarAndDrawer from "../layout/NavbarAndDrawer";
import { Box, Grid, Toolbar, Typography } from "@mui/material";
import Card1 from "../layout/Card1";
import Herosection from "../layout/Herosection";
import Vehicle from "../layout/Vehicle";
import Footer from "../../Buyer/Layout/Footer";
import Addcar from "./Addcar";
export default function SellarDashboard() {
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
        <Herosection />
        <Card1 />
        <Vehicle />
        <Footer />
        {/* <Addcar /> */}
      </Box>
    </>
  );
}
