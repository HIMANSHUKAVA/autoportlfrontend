import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Buyer/Layout/Footer";
import {
  showConfirmAlert,
  showErrorAlert,
  showSuccessAlert,
} from "../../Util/Alert";
import NavbarAndDrawer from "../layout/NavbarAndDrawer";
export default function Editprofile() {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const API = import.meta.env.VITE_API_BASE_URL;

  const photourl = photo ? `http://localhost:3000/images/${photo}` : "";

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(file);
  };
  const navigate = useNavigate();

  const [update, setupdate] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
    photo: "",
  });

  const [oldpassword, setoldpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");

  useEffect(() => {
    axios
      .get(`${API}/sellar/get/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setupdate({
          username: res.data.username || "",
          email: res.data.email || "",
          role: res.data.role || "",
          photo: res.data.photo ? `${API}/images/${res.data.photo}` : "",
          password: "",
        });
      });
  }, [id]);

  const handleUpdateChange = (e) => {
    setupdate({ ...update, [e.target.name]: e.target.value });
  };

  const handlupdate = (e) => {
    e.preventDefault();

    const profilepayload = {
      username: update.username,
      password: newpassword,
      email: update.email,
      role: update.role,
    };

    const formdeta = new FormData();
    formdeta.append(
      "profile",
      new Blob([JSON.stringify(profilepayload)], { type: "application/json" }),
    );

    formdeta.append("old_password", oldpassword);
    if (photo) {
      formdeta.append("photo", photo);
    }
    if (newpassword && !oldpassword) {
      showErrorAlert("Old password required to change password");
      return;
    }

    axios
      .put(`${API}/sellar/editprofile/${id}`, formdeta, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        showSuccessAlert("Profile Update Successfully");
        setnewpassword("");
        setoldpassword("");
        setupdate({ ...update, password: "" });
      })
      .catch((error) => {
        showErrorAlert(error.response.data.message);
      });
  };

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

  return (
    <>
      <NavbarAndDrawer />

      <Box
        component="main"
        sx={{
          ml: { xs: 0, md: "220px" },
          mt: "140px",
          px: { xs: 1, md: 3 },
          width: "100%",
          background: "linear-gradient(180deg, #0B1220 0%, #0E1A2B 100%)",
          color: "#fff",
          // minHeight: "100vh",
        }}
      >
        <Box sx={{ ml: { md: "30px" }, mb: 4 }}>
          <Typography variant="h4">Edit Profile</Typography>
          <Typography variant="body2">
            Update Your Profile Information
          </Typography>
          <hr />
        </Box>

        {/* MAIN CONTAINER */}
        <Box
          sx={{
            width: "90%",
            border: "1px solid rgba(148,163,184,0.4)",
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
            p: 3,
          }}
        >
          {/* IMAGE — FIRST ON MOBILE */}
          <Box
            sx={{
              width: { xs: "100%", md: "20%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              order: { xs: 1, md: 1 },
            }}
          >
            <Button component="label" sx={{ textTransform: "none" }}>
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlePhotoChange}
              />

              {photo || update.photo ?
                <Box
                  sx={{
                    width: 160,
                    height: 160,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1px solid white",
                  }}
                >
                  <img
                    src={photo ? URL.createObjectURL(photo) : update.photo}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/noperson.png"; // public folder wali default image
                    }}
                  />
                </Box>
              : <Typography>⬆ Upload Profile Photo</Typography>}
            </Button>
          </Box>

          {/* FIELDS — SECOND ON MOBILE */}
          <Box
            sx={{
              width: { xs: "100%", md: "65%" },
              order: { xs: 2, md: 2 },
            }}
          >
            <InputLabel sx={{ color: "white" }}>Name</InputLabel>
            <TextField
              fullWidth
              name="username"
              value={update.username}
              onChange={handleUpdateChange}
              sx={inputStyle}
            />

            <InputLabel sx={{ color: "white" }}>Email</InputLabel>
            <TextField
              fullWidth
              name="email"
              value={update.email}
              onChange={handleUpdateChange}
              sx={inputStyle}
            />

            <InputLabel sx={{ color: "white" }}>Old Password</InputLabel>
            <TextField
              fullWidth
              type="password"
              name="oldpassword"
              value={oldpassword}
              onChange={(e) => {
                setoldpassword(e.target.value);
              }}
              sx={inputStyle}
            />

            <InputLabel sx={{ color: "white" }}>New Password</InputLabel>
            <TextField
              fullWidth
              type="password"
              name="newpassword"
              value={newpassword}
              onChange={(e) => {
                setnewpassword(e.target.value);
              }}
              sx={inputStyle}
            />

            <InputLabel sx={{ color: "white" }}>Role</InputLabel>
            <TextField fullWidth value={update.role} sx={inputStyle} />

            {/* BUTTONS — LAST ON MOBILE */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                mt: 4,
                order: { xs: 3, md: 3 },
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <Button
                type="submit"
                sx={{
                  border: "1px solid #38BDF8",
                  color: "#38BDF8",
                }}
                onClick={handlupdate}
              >
                Save Change
              </Button>

              <Button
                sx={{
                  border: "1px solid #EF4444",
                  color: "#EF4444",
                }}
                onClick={() => {
                  showConfirmAlert(
                    "Edit Profile?",
                    "Are you sure you do not want to update your password?",
                    "Update",
                    "Cancel",
                  ).then(() => {
                    navigate("/sellardashboard");
                  });
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
