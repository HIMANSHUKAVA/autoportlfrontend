import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../Buyer/Layout/Footer";
import { showSuccessAlert } from "../../Util/Alert";
import NavbarAndDrawer from "../layout/NavbarAndDrawer";

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [photo, setPhoto] = useState(null);
  const [car, setcar] = useState({
    name: "",
    model: "",
    fuel: "",
    colour: "",
    condition: "",
    transmission: "",
    km_driven: "",
    price: "",
    photo: "",
  });

  const handlevent = (e) => {
    setcar({
      ...car,
      [e.target.name]: e.target.value,
    });
  };

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API}/seller/request/get/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((Response) => {
        console.log(Response.data);
        setcar(Response.data);
      });
  }, [id]);

  const [photofile, setphotofile] = useState(null);
  const [photopreview, setphotopreview] = useState("");

  const handlphotochange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setphotofile(file);
      setphotopreview(URL.createObjectURL(file));
    }
  };
  const inputStyle = (hasError) => ({
    "& .MuiOutlinedInput-root": {
      color: "#cbd5f5",

      "& fieldset": {
        borderColor:
          hasError ?
            "#ef4444" // 🔴 error
          : "rgba(148,163,184,0.4)", // normal
      },

      "&:hover fieldset": {
        borderColor: hasError ? "#ef4444" : "#38bdf8",
      },

      "&.Mui-focused fieldset": {
        borderColor: hasError ? "#ef4444" : "#38bdf8",
      },
    },

    "& .MuiInputLabel-root": {
      color: hasError ? "#ef4444" : "#94a3b8",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: hasError ? "#ef4444" : "#38bdf8",
    },

    mb: 2,
  });

  const [validate, setValidate] = useState({});

  const validation = () => {
    const newError = {};

    if (!car.name.trim()) {
      newError.name = "Car Name is required";
    }

    if (!car.model.trim()) {
      newError.model = "Model Name is required";
    }

    if (!car.fuel.trim()) {
      newError.fuel = "Fuel type is required";
    }

    if (!car.colour.trim()) {
      newError.colour = "Colour is required";
    }

    if (!car.condition.trim()) {
      newError.condition = "Condition is required";
    }

    if (!car.transmission.trim()) {
      newError.transmission = "Transmission is required";
    }

    if (!car.km_driven.toString().trim()) {
      newError.km_driven = "KM Driven is required";
    } else if (isNaN(car.km_driven)) {
      newError.km_driven = "KM Driven must be a number";
    }

    if (!car.photo && !photofile) {
      newError.photo = "Car photo is required";
    }
    if (!car.price.toString().trim()) {
      newError.price = "Price is required";
    } else if (isNaN(car.price)) {
      newError.price = "Price must be a number";
    }

    setValidate(newError);

    // agar koi error nahi hai
    return Object.keys(newError).length === 0;
  };

  const handlsubmit = (e) => {
    e.preventDefault();
    const isvalid = validation();

    if (!isvalid) {
      return;
    }
    const formdeta = new FormData();

    formdeta.append(
      "car",
      new Blob([JSON.stringify(car)], { type: "application/json" }),
    );

    if (photofile) {
      formdeta.append("photo", photofile);
    }

    axios
      .put(`${API}/seller/request/update/model/${id}`, formdeta, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        showSuccessAlert("Car Update Successfully");
        navigate("/sellardashboard");
      })
      .catch((error) => {
        console.log(error);
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
          <Typography variant="h4" sx={{ color: "white" }}>
            Edit Car Data
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Upload Your Latest Detail Abour Car
          </Typography>
          <hr />
        </Box>

        <Box
          sx={{
            color: "white",
            mt: 10,
            width: "100%",
            display: "flex",
            flexDirection: { xs: "column", md: "row" }, //  FIX
            gap: { xs: 3, md: 4 },
            px: { xs: 2, md: 10 }, //  mobile padding kam
            // alignItems: "center",
            alignItems: { xs: "stretch", md: "center" },
          }}
        >
          <Box
            sx={{
              // width: { xs: "100%", md: "40%" },
              width: "90%",
              maxWidth: 550,
              height: 260,
              border:
                validate.photo ?
                  "2px dotted #ef4444" //  error
                : "2px dotted rgba(148,163,184,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "10px",
              // m: 2,
              m: { xs: 0, md: 2 },
              flexWrap: "wrap",
            }}
          >
            <Button
              component="label"
              sx={{
                width: "100%",
                height: "100%",
                color: "white",
                textTransform: "none",
              }}
            >
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handlphotochange}
              />

              {/* photo preview */}

              {photopreview ?
                <img
                  src={photopreview}
                  alt="preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              : car.photo ?
                <img
                  src={car.photo}
                  alt="existing"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              : <>
                  <Typography variant="h5">⬆</Typography>
                  <Typography variant="h4">upload Car Photo</Typography>{" "}
                </>
              }
            </Button>
          </Box>

          <Box
            sx={{
              width: { xs: "100%", md: "70%" },
              // bgcolor: "rebeccapurple",
              display: "flex",
              mx: "auto",
            }}
          >
            <form
              onSubmit={handlsubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
                maxWidth: "500px",
                justifyContent: "center",
              }}
            >
              <TextField
                label="Enter The Car Name"
                InputLabelProps={{ shrink: true }}
                name="name"
                id="name"
                value={car.name}
                sx={inputStyle(Boolean(validate.name))}
                onChange={handlevent}
                error={Boolean(validate.name)}
                helperText={validate.name}
              />
              <br />
              <TextField
                label="Enter The Model Name"
                name="model"
                id="model"
                InputLabelProps={{ shrink: true }}
                value={car.model}
                sx={inputStyle(Boolean(validate.model))}
                onChange={handlevent}
                error={Boolean(validate.model)}
                helperText={validate.model}
              />
              <br />

              <TextField
                label="Enter The fuel type"
                InputLabelProps={{ shrink: true }}
                name="fuel"
                id="fuel"
                value={car.fuel}
                sx={inputStyle(Boolean(validate.fuel))}
                onChange={handlevent}
                error={Boolean(validate.fuel)}
                helperText={validate.fuel}
              />
              <br />
              <TextField
                label="Enter The colour"
                name="colour"
                id="colour"
                value={car.colour}
                // sx={inputStyle()}
                InputLabelProps={{ shrink: true }}
                sx={inputStyle(Boolean(validate.colour))}
                onChange={handlevent}
                error={Boolean(validate.colour)}
                helperText={validate.colour}
              />
              <br />
              <TextField
                label="Enter The condition of grade"
                name="condition"
                id="condition"
                sx={inputStyle(Boolean(validate.condition))}
                onChange={handlevent}
                error={Boolean(validate.condition)}
                helperText={validate.condition}
                value={car.condition}
                InputLabelProps={{ shrink: true }}
              />
              <br />

              <TextField
                label="Enter The Transmision"
                name="transmission"
                id="transmission"
                sx={inputStyle(Boolean(validate.transmission))}
                onChange={handlevent}
                error={Boolean(validate.transmission)}
                helperText={validate.transmission}
                value={car.transmission}
                InputLabelProps={{ shrink: true }}
              />
              <br />
              <TextField
                label="Enter The km_drive"
                InputLabelProps={{ shrink: true }}
                name="km_driven"
                id="km_driven"
                sx={inputStyle(Boolean(validate.km_driven))}
                onChange={handlevent}
                error={Boolean(validate.km_driven)}
                helperText={validate.km_driven}
                value={car.km_driven}
              />

              <TextField
                label="Enter The Expected Price"
                // variant=""
                name="price"
                id="price"
                sx={inputStyle(Boolean(validate.price))}
                onChange={handlevent}
                error={Boolean(validate.price)}
                helperText={validate.price}
                InputLabelProps={{ shrink: true }}
                value={car.price}
              />
              <br />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: {
                    xs: "center",
                    sm: "center",
                    md: "flex-end",
                  },
                  gap: 2,
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Button
                  type="submit"
                  size="large"
                  sx={{
                    backgroundColor: "#D4AF37",
                    color: "black",
                    px: 3,
                    borderRadius: "10px",
                    "&:hover": {
                      backgroundColor: "#E6C55F",
                    },
                  }}
                >
                  Update
                </Button>
                <Button
                  type="reset"
                  sx={{
                    border: "1px solid white",
                    borderRadius: 2,
                    color: "white",
                    width: 100,
                  }}
                >
                  Reset
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
