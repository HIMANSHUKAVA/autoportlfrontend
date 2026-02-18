import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function OldCarPaymentRemainder() {
  const [payment, setpayment] = useState(null);

  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const API = import.meta.env.VITE_API_BASE_URL;

  console.log(localStorage.getItem("token"));

  useEffect(() => {
    axios
      .get(`${API}/auth/fetch/oldcarlink/payment/${paymentId}`)
      .then((r) => {
        setpayment(r.data);
        console.log(r);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handlePay = async () => {
    try {
      console.log("STEP 1: Creating order from backend...");

      // 1️⃣ Create order with fixed ₹40000
      const orderResponse = await axios.post(
        `${API}/auth/create-oldcar-pending-order/${paymentId}`,
        null,
        {
          params: { amount: 40000 },
        },
      );

      const orderId = orderResponse.data;
      console.log("ORDER CREATED:", orderId);

      // 2️⃣ Razorpay options
      const options = {
        key: "rzp_test_S0XseAdZlcbad2",
        amount: 40000 * 100, // always in paisa
        currency: "INR",
        name: "AutoPortal",
        description: "Old Car Pending Payment",
        order_id: orderId,

        handler: async function (response) {
          console.log("RAZORPAY SUCCESS:", response);

          try {
            console.log("STEP 3: Updating DB...");

            await axios.put(
              `${API}/auth/update/oldcarpaidamount/${paymentId}`,
              null,
              {
                params: { amount: 40000 },
              },
            );

            console.log("DB UPDATED SUCCESSFULLY");
            alert("Payment Successful & DB Updated 🎉");

            window.location.reload();
          } catch (updateError) {
            console.log("UPDATE FAILED:", updateError);
            alert("Payment done but DB update failed");
          }
        },

        modal: {
          ondismiss: function () {
            console.log("PAYMENT POPUP CLOSED");
          },
        },

        theme: {
          color: "#f5c46b",
        },
      };

      console.log("STEP 2: Opening Razorpay...");
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log("ORDER CREATION FAILED:", error);
      alert("Payment Failed Before Opening Razorpay");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 420,
          borderRadius: 4,
          background: "linear-gradient(180deg, #0f172a, #020617)",
          color: "#fff",
          boxShadow: "0 30px 60px rgba(0,0,0,0.6)",
        }}
      >
        <CardContent>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Payment Summary
          </Typography>

          <Typography variant="body2" color="gray">
            Payment ID: {paymentId}
          </Typography>

          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

          {payment?.car && (
            <Stack spacing={1.2}>
              <Typography>
                🚗 <b>{payment.car.brand}</b> ({payment.car.model})
              </Typography>

              <Typography variant="body2">
                Total Amount: ₹{payment.totalAmount.toLocaleString()}
              </Typography>

              <Typography variant="body2">
                Paid Amount: ₹{payment.paidBookingAmount.toLocaleString()}
              </Typography>

              <Typography variant="h6" color="#f5c46b" fontWeight={700}>
                Pending: ₹{payment.pendingAmount.toLocaleString()}
              </Typography>
            </Stack>
          )}

          <Divider sx={{ my: 2, borderColor: "rgba(255,255,255,0.1)" }} />

          <Button
            fullWidth
            size="large"
            // onClick={handlePay}
            sx={{
              mt: 1,
              py: 1.2,
              fontWeight: 700,
              borderRadius: "999px",
              color: "#020617",
              background: "linear-gradient(135deg, #f5c46b, #eab308)",
              boxShadow: "0 8px 22px rgba(245,196,107,0.45)",
              "&:hover": {
                background: "linear-gradient(135deg, #facc15, #f59e0b)",
                boxShadow: "0 12px 30px rgba(245,196,107,0.6)",
              },
            }}
            onClick={() => {
              handlePay();
            }}
          >
            {payment ? "Pay ₹40,000" : "Loading payment..."}
          </Button>

          <Typography
            variant="caption"
            display="block"
            textAlign="center"
            mt={2}
            color="gray"
          >
            * Test mode payment (no real money deducted)
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
