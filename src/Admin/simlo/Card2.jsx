import { Box, Card, Grid, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { Grid3x3, Person } from "@mui/icons-material";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckIcon from "@mui/icons-material/Check";
import PersonIcon from "@mui/icons-material/Person";
export default function Card2() {
  const cardetail = [
    {
      id: 1,
      icon: <DirectionsCarIcon/>,
      title: "Total Car Request",
      count: 152,
    },
    {
      id: 2,
      icon: <PendingActionsIcon />,
      title: "Pending Requests",
      count: 35,
    },

    {
      id: 3,
      icon: <CheckIcon />,
      title: "Approved Requests",
      count: 89,
    },
  ];
  return (
    <Box
      sx={{
        width: "100%",
        // background: "linear-gradient(180deg, #0B1220 0%, #0E1A2B 100%)",
        color: "#FFFFFF",
        // boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        // minHeight: "100vh",
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ color: "white", p: 3 }}>
          Admin Dashboard
        </Typography>
        <hr />
      </Box>


  <Grid container spacing={{xs:4 , md:15}} sx={{ p: 2 ,}}>
  {cardetail.map((card) => (
    <Grid
      item
      xs={12}
      sm={6}
      md={3}
      key={card.id}
      sx={{

      }}
    >
      <Card
  sx={{
width: "100%",
    p: 4,
    borderRadius: 3,
    background: "linear-gradient(135deg, #1A233A, #0B1220)",
    color: "#FFFFFF",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
    transition: "0.3s",
    "&:hover": {
      transition:"all 0.3s",
      transform: "translateY(-6px)",
      boxShadow: "0 15px 35px rgba(0,0,0,0.6)",
    },

  }}
>
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      mb: 1,
    }}
  >
    <Box
      sx={{
        color: "#0B1220",
        backgroundColor: "#f5c46b",
        borderRadius: "50%",
        width: 32,
        height: 32,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {card.icon}
    </Box>

    <Typography variant="h6" fontWeight={600}>
      {card.title}
    </Typography>
  </Box>

  <Typography variant="h4" fontWeight="bold">
    {card.count}
  </Typography>
</Card>

      </Grid>
  ))}
</Grid>

      </Box>

  );
}
