import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../Buyer/Layout/Footer";
import {
  showConfirmAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../../Util/Alert";
import NavbarAndDrawer from "../layout/NavbarAndDrawer";
export default function Changepass() {
  const [currentpass, setcurrentpass] = useState("");
  const [newpass, setnewpass] = useState("");
  const [conformpass, setconformpass] = useState("");
  const navigate = useNavigate();
  const id = localStorage.getItem("user_id");

  const inputStyle = {
    "& .MuiOutlinedInput-root": {
      color: "#cbd5f5",
      "& fieldset": {
        borderColor: "rgba(148,163,184,0.4)",
      },
      "&:hover fieldset": {
        borderColor: "#38bdf8",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#38bdf8",
      },
    },
    "& .MuiInputLabel-root": {
      color: "#94a3b8",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#38bdf8",
    },
    mt: 1,
  };

  const condition = {
    length: newpass.length > 8,
    upprcase: /[A-Z]/.test(newpass),
    number: /[0-9]/.test(newpass),
    special: /[^A-Za-z0-9]/.test(newpass),
  };

  const API = import.meta.env.VITE_API_BASE_URL;
  const handlsubmit = (e) => {
    e.preventDefault();

    if (conformpass !== newpass) {
      showErrorAlert("Conform Password Did Not Matched");
      return;
    }

    axios
      .put(`${API}/sellar/editpassword/${id}`, null, {
        params: { currentpassword: currentpass, newpassword: newpass },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        showSuccessAlert("Password Update Successfully");
        setcurrentpass("");
        setnewpass("");
        setconformpass("");
      })
      .catch((error) => {
        showErrorAlert(error.response.data.message);
      });
  };

  const Checkcondition = ({ label, value }) => (
    <Box
      sx={{
        display: "flex",
        mt: 1,
        alignItems: "center",
      }}
    >
      {value ?
        <CheckCircleIcon sx={{ color: "#22c55e" }} />
      : <CancelIcon sx={{ color: "#64748b" }} />}
      <Typography variant="body2" sx={{ color: value ? "#22c55e" : "#94a3b8" }}>
        {label}
      </Typography>
    </Box>
  );
  const Confrompass = ({ label, newpass, conformpass }) => {
    const isMatch =
      newpass.length > 0 && conformpass.length > 0 && newpass === conformpass;

    return (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {isMatch ?
            <CheckCircleIcon sx={{ color: "#22c55e" }} />
          : <CancelIcon sx={{ color: "#64748b" }} />}

          <Typography
            variant="body2"
            sx={{ color: isMatch ? "#22c55e" : "#94a3b8" }}
          >
            {label}
          </Typography>
        </Box>
      </>
    );
  };

  const handldelete = () => {
    showConfirmAlert(
      "Change Password?",
      "Are you sure you want to update your password?",
      "Update",
      "Cancel",
    ).then(() => {
      navigate("/sellardashboard");
    });
  };
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
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            position: "relative",
            // mt: { xs: 2 },
            ml: { xs: 0, md: "30px" },
            px: { xs: 1, sm: 0 },
            top: { xs: 0, md: 24 },
          }}
        >
          <Typography variant="h4">Change Password</Typography>
          <Typography variant="body2">Update Your Password</Typography>
          <hr />
        </Box>

        <Box
          sx={{
            // bgcolor: "rebeccapurple",

            width: "70%",
            m: 3,
            mt: 7,
            p: 4,
            border: "1px solid rgba(148,163,184,0.4)",
          }}
        >
          <InputLabel sx={{ color: "white" }}>Current Password</InputLabel>
          <TextField
            name="password"
            id="password"
            label="Enter The Current Password"
            value={currentpass}
            onChange={(e) => {
              setcurrentpass(e.target.value);
            }}
            sx={inputStyle}
            fullWidth
          />

          <InputLabel sx={{ color: "white", mt: 1 }}>New Password</InputLabel>
          <TextField
            type="password"
            name="newpassword"
            id="newpassword"
            label="Enter The New Password"
            value={newpass}
            onChange={(e) => {
              setnewpass(e.target.value);
            }}
            sx={inputStyle}
            fullWidth
          />

          <Box
            sx={{
              mb: 1,
            }}
          >
            <Checkcondition
              label="At Leat 8 Cherector"
              value={condition.length}
            />

            <Checkcondition
              label="One Upparcase Lettar"
              value={condition.upprcase}
            />

            <Checkcondition label="One Number" value={condition.number} />

            <Checkcondition
              label="One Special Cherector"
              value={condition.special}
            />
          </Box>

          <TextField
            type="password"
            label="Conform Password"
            name="conform"
            value={conformpass}
            onChange={(e) => {
              setconformpass(e.target.value);
            }}
            sx={inputStyle}
            fullWidth
          />
          <Box>
            <Confrompass
              label="Password & Confirm Password Match"
              conformpass={conformpass}
              newpass={newpass}
            />
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: "rgba(148,163,184,0.4)",
            }}
          >
            Make Sure To Save Youe Changes
          </Typography>

          <Box
            sx={{
              display: "flex",
              mt: 2,
              gap: 3,
              m: 3,
            }}
          >
            <Button
              type="submit"
              onClick={handlsubmit}
              sx={{
                border: "1px solid #38BDF8",
                color: "#38BDF8",
                borderRadius: 2,
                p: 1,
                "&:hover": {
                  backgroundColor: "rgba(56, 189, 248, 0.15)",
                  borderColor: "#38BDF8",
                },
              }}
            >
              Update Password
            </Button>
            <Button
              sx={{
                border: "1px solid #EF4444",
                color: "#EF4444",
                px: 6,
                "&:hover": {
                  backgroundColor: "rgba(239,68,68,0.15)",
                },
              }}
              onClick={handldelete}
            >
              Cancel
            </Button>
          </Box>
          <Typography
            sx={{
              color: "white",
              mt: 2,
              textDecoration: "none",
              "&:hover": {
                color: "#38BDF8",
                textDecoration: "underline",
              },
              cursor: "pointer",
            }}
            component={Link}
          >
            Forget Your Password
          </Typography>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
