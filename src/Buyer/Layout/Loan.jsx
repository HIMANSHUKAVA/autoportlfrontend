import {
  Box,
  Button,
  Card,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";

export default function Loan() {
  // create the state for loan amount
  const [loanamount, setloanamount] = useState(300000);
  //  create the state for interest rate
  const [interestrate, setinterestrate] = useState(10);
  // creatw the state for years state
  const [loanyear, setloanyear] = useState(5);

  const emi = useMemo(() => {
    const amount = loanamount;
    const month = loanyear * 12;
    const rate = interestrate / 12 / 100;

    const monthly_emi =
      (amount * rate * Math.pow(1 + rate, month)) /
      (Math.pow(1 + rate, month) - 1);

    return isFinite(monthly_emi) ? monthly_emi.toFixed(0) : 0;
  }, [loanamount, loanyear, interestrate]);
  return (
    <>
      <Box
        sx={{
          py: 6,
          px: 2,
          background: "linear-gradient(135deg, #0f172a, #020617)",
          minHeight: "100vh",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* create card */}

        <Card
          sx={{
            width: "100%",
            maxWidth: 430,
            borderRadius: 4,
            p: 3,
            border: "1px solid rgba(148, 163, 184, 0.25)",
            boxShadow:
              "0 20px 40px rgba(15, 23, 42, 0.8), 0 0 0 1px rgba(148, 163, 184, 0.1)",
            backgroundColor: "#020617",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: "white",
              mb: 3,
            }}
          >
            Loan Calculator
          </Typography>

          {/* Amount */}
          {/* <TextField label="Loan Amount(₹)" sx={{ color: "#cbd5f5" }} /> */}
          <Typography sx={{ color: "#cbd5f5" }}>Loan Amount(₹)</Typography>
          <TextField
            inputProps={{ style: { color: "white" } }}
            fullWidth
            sx={{ mt: 2 }}
            value={loanamount}
            onChange={(e) => setloanamount(Number(e.target.value))}
            type="number"
          />
          <Box sx={{ mt: 2 }}>
            <Slider
              value={loanamount}
              min={50000}
              max={1000000}
              step={10000}
              onChange={(e, value) => setloanamount(value)}
              fullWidth
            />
          </Box>

          {/* interest rate */}

          <Typography color="#cbd5f5" sx={{ mt: 2 }}>
            Interest Rate(%)
          </Typography>

          <TextField
            inputProps={{ style: { color: "white" } }}
            fullWidth
            sx={{ mt: 2 }}
            value={interestrate}
            onChange={(e) => setinterestrate(Number(e.target.value))}
            type="number"
          />
          <Box sx={{ mt: 2 }}>
            <Slider
              value={interestrate}
              min={5}
              max={25}
              step={2}
              onChange={(e, value) => setinterestrate(value)}
              fullWidth
            />
          </Box>

          {/* years */}

          <Typography color="#cbd5f5" sx={{ mt: 2 }}>
            Tenure(Years)
          </Typography>

          <TextField
            inputProps={{ style: { color: "white" } }}
            fullWidth
            sx={{ mt: 2 }}
            value={loanyear}
            onChange={(e) => setloanyear(Number(e.target.value))}
            type="number"
          />
          <Box sx={{ mt: 2 }}>
            <Slider
              value={loanyear}
              min={1}
              max={15}
              step={1}
              onChange={(e, value) => setloanyear(value)}
              fullWidth
            />
          </Box>

          {/* calculate emi */}
          <Box
            sx={{
              backgroundColor: "red",
              mt: 4,
              p: 4,
              borderRadius: 2,
              background: "linear-gradient(135deg, #1e3a8a, #020617)",
              border: "1px solid rgba(234, 179, 8, 0.4)",
              textAlign: "center",
            }}
          >
            <Typography sx={{ color: "#cbd5f5" }}>Monthly EMI</Typography>
            <Typography sx={{ color: "#eab308" }} variant="h3">
              {" "}
              ₹ {emi}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            sx={{
              mt: 3,
              color: "#eab308",
              borderColor: "#eab308",
              "&:hover": { background: "#eab308", color: "#000" },
            }}
            fullWidth
          >
            APPLY FOR LOAN
          </Button>
        </Card>
      </Box>
    </>
  );
}
