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
    if (!payment) {
      alert("Payment data not loaded yet");
      return;
    }

    try {
      const userId = searchParams.get("userId");
      const paymentId = searchParams.get("paymentId");

      console.log("UserId:", userId);
      console.log("PaymentId:", paymentId);

      // 1️ Validate payment from backend
      const response = await axios.get(
        `${API}/auth/payment/linkbymobail/${paymentId}/${userId}`,
      );

      const validatedPayment = response.data;

      console.log(validatedPayment.razorpayOrderId);

      // 2️ Open Razorpay using validated data
      const options = {
        key: "rzp_test_S0XseAdZlcbad2",
        amount: 40000 * 100,
        currency: "INR",
        name: "AutoPortal",
        description: "Pending Payment",
        order_id: validatedPayment.razorpayOrderId,

        handler: async function (razorResponse) {
          try {
            await axios.put(
              `${API}/auth/update/oldcarpaidamount/${validatedPayment.paymentId}`,
              null,
              {
                params: {
                  amount: 40000,
                },
              },
            );
            alert("Payment Successful 🎉");
            window.location.reload();
          } catch (err) {
            console.log("Update Failed:", err);
            alert("Payment done but update failed");
          }
        },

        theme: { color: "#f5c46b" },
      };

      new window.Razorpay(options).open();
    } catch (error) {
      console.log(error);
      alert("Payment validation failed");
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
