import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Buyer/Layout/Footer";
import { showErrorAlert, showSuccessAlert } from "../../Util/Alert";
import NavbarAndDrawer from "../layout/NavbarAndDrawer";
export default function Addcar() {
  const [photo, setPhoto] = useState(null);
  const API = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };
  const convettonumber = (text) => {
    if (!text) return { min: null, max: null };

    const toRupees = (value) => {
      if (value.toLowerCase().includes("cr")) {
        return Number(value.replace(/[^\d.]/g, "")) * 10000000;
      }
      return Number(value.replace(/[^\d.]/g, "")) * 100000;
    };

    if (text.toLowerCase().includes("above")) {
      return { min: toRupees(text), max: null };
    }

    const parts = text.split("-");
    if (parts.length !== 2) return { min: null, max: null };

    return {
      min: toRupees(parts[0]),
      max: toRupees(parts[1]),
    };
  };

  const oldcardeta = [
    {
      id: 1,
      brand: "Maruti",
      price: ["₹2-4 Lakh", "₹4-6 Lakh", "₹6-9 Lakh"],
    },

    {
      id: 2,
      brand: "Hyundai",
      price: ["₹3-6 Lakh", "₹6-9 Lakh", "₹9-13 Lakh"],
    },

    {
      id: 3,
      brand: "Tata",
      price: ["₹3-5 Lakh", "₹5-8 Lakh", "₹8-12 Lakh"],
    },
    {
      id: 4,
      brand: "Kia",
      price: ["₹6-10 Lakh", "₹10-14 Lakh", "₹14-20 Lakh"],
    },

    {
      id: 5,
      brand: "Toyota",
      price: ["₹6-12 Lakh", "₹12-18 Lakh", "₹18-28 Lakh"],
    },
    {
      id: 6,
      brand: "Honda",
      price: ["₹4-7 Lakh", "₹7-11 Lakh", "₹11-16 Lakh"],
    },
    {
      id: 7,
      brand: "Mahindra",
      price: ["₹6-11 Lakh", "₹11-16 Lakh", "₹16-22 Lakh"],
    },
    {
      id: 8,
      brand: "MG",
      price: ["₹8-13 Lakh", "₹13-18 Lakh", "₹18-25 Lakh"],
    },
    {
      id: 9,
      brand: "Volkswagen",
      price: ["₹6-10 Lakh", "₹10-16 Lakh", "₹16-22 Lakh"],
    },

    {
      id: 10,
      brand: "Skoda",
      price: ["₹6-10 Lakh", "₹10-16 Lakh", "₹16-22 Lakh"],
    },

    {
      id: 11,
      brand: "BMW",
      price: ["₹20-30 Lakh", "₹30-45 Lakh", "Above ₹45 Lakh"],
    },

    {
      id: 12,
      brand: "Mercedes",
      price: ["₹22-35 Lakh", "₹35-50 Lakh", "Above ₹50 Lakh"],
    },
  ];

  const [selectedBrand, setSelectedBrand] = useState("");
  const [priceOptions, setPriceOptions] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState("");

  const handlBrandChange = (e) => {
    const brand = e.target.value;
    setSelectedBrand(brand);

    const selectedbrand = oldcardeta.find((car) => car.brand === brand);

    setPriceOptions(selectedbrand ? selectedbrand.price : []);
    setSelectedPrice("");
  };

  const [car, setcar] = useState({
    model: "",
    // Purchase_year: "",
    fuel: "",
    colour: "",
    condition: "",
    transmission: "",
    km_driven: "",
    photo: photo,
    price: "",
    year: "",
    type: "",
  });

  const [validate, setValidate] = useState({});

  const validation = () => {
    const newError = {};
    let min = null;
    let max = null;

    if (!selectedPrice) {
      newError.priceRange = "Price range is required";
    } else {
      ({ min, max } = convettonumber(selectedPrice));
    }

    if (!selectedBrand) {
      newError.brand = "Brand is required";
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
    if (!car.type.trim()) {
      newError.type = "Type is required";
    }

    if (!car.year.trim()) {
      newError.year = "Year is required";
    } else if (isNaN(car.year)) {
      newError.year = "Year must be a number";
    }

    if (!car.km_driven.trim()) {
      newError.km_driven = "KM Driven is required";
    } else if (isNaN(car.km_driven)) {
      newError.km_driven = "KM Driven must be a number";
    }

    if (!photo) {
      newError.photo = "Car photo is required";
    }
    if (!car.price.trim()) {
      newError.price = "Price is required";
    } else if (isNaN(car.price)) {
      newError.price = "Price must be a number";
    } else if (
      min !== null &&
      max !== null &&
      (Number(car.price) < min || Number(car.price) > max)
    ) {
      newError.price = `Price should be between ${min} and ${max} Lakh`;
    } else if (min !== null && max === null && Number(car.price) < min) {
      newError.price = `Price should be above ${min}`;
    }

    setValidate(newError);

    // agar koi error nahi hai
    return Object.keys(newError).length === 0;
  };

  const handlevent = (e) => {
    setcar({ ...car, [e.target.name]: e.target.value });
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = validation();

    if (!isValid) {
      return;
    }

    const { min, max } = convettonumber(selectedPrice);
    const formdeta = new FormData();

    const payload = {
      brand: selectedBrand,
      model: car.model,
      fuel: car.fuel,
      colour: car.colour,
      condition: car.condition,
      transmission: car.transmission,
      km_driven: Number(car.km_driven),
      price: Number(car.price),
      priceLabel: selectedPrice,
      priceMin: min,
      priceMax: max,
      type: car.type,
      year: Number(car.year),
    };

    formdeta.append(
      "car",

      new Blob([JSON.stringify(payload)], { type: "application/json" }),
    );

    formdeta.append("photo", photo);
    axios
      .post(
        `${API}/sellar/request/add/${localStorage.getItem("user_id")}`,
        formdeta,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        },
      )
      .then((response) => {
        showSuccessAlert("Your Request Has Been Submitted");
        const car_id = response.data.sellarcarid;

        navigate(`/img/${car_id}`);
        console.log(car_id);

        setcar({
          model: "",
          fuel: "",
          colour: "",
          condition: "",
          transmission: "",
          km_driven: "",
          price: "",
          year: "",
          type: "",
        });

        setSelectedBrand("");
        setSelectedPrice("");
        setPriceOptions([]);
        setPhoto(null);

        console.log(response.data);
      })
      .catch((error) => {
        console.error("ERROR =>", error.response || error);
        showErrorAlert("Something Went Wrong");
      });
  };

  const selectStyle = (hasError = false) => ({
    mb: 2,

    "& .MuiOutlinedInput-root": {
      color: "#e5e7eb",

      "& fieldset": {
        borderColor:
          hasError ?
            "#ef4444" // 🔴 error border
          : "rgba(148,163,184,0.4)",
      },

      "&:hover fieldset": {
        borderColor: hasError ? "#ef4444" : "#38bdf8",
      },

      "&.Mui-focused fieldset": {
        borderColor: hasError ? "#ef4444" : "#38bdf8",
      },
    },

    // Selected value text color
    "& .MuiSelect-select": {
      color: "#e5e7eb",
    },

    // Label color
    "& .MuiInputLabel-root": {
      color: hasError ? "#ef4444" : "#94a3b8",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color: hasError ? "#ef4444" : "#38bdf8",
    },

    //  Error helper text (agar use kare)
    "& .MuiFormHelperText-root": {
      color: "#ef4444",
      fontSize: "0.75rem",
      marginLeft: "4px",
    },
  });

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
        <Box
          sx={{
            position: "relative",
            // mt: { xs: 2 },
            ml: { xs: 0, md: "30px" },
            px: { xs: 1, sm: 0 },
            top: { xs: 0, md: 24 },
          }}
        >
          <Typography variant="h4">Add New Vehicle</Typography>
          <Typography variant="body2">
            Enter The Detail Of The Vehicle You Would Like To Add
          </Typography>
          <hr style={{ color: "white" }} />
        </Box>

        {/* form main box */}
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
                onChange={handlePhotoChange}
              />

              {/* photo preview */}

              {!photo ?
                <>
                  <Typography variant="h5">⬆</Typography>
                  <Typography variant="h4">upload Car Photo</Typography>{" "}
                </>
              : <>
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
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
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                width: "90%",
                maxWidth: "500px",
                justifyContent: "center",
              }}
            >
              <FormControl
                sx={selectStyle(!!validate.brand)}
                fullWidth
                error={!!validate.brand}
              >
                <InputLabel id="s1">Select The Brand</InputLabel>

                <Select
                  label="Select The Brand"
                  id="s1"
                  value={selectedBrand}
                  onChange={handlBrandChange}
                >
                  {oldcardeta.map((c) => (
                    <MenuItem key={c.id} value={c.brand}>
                      {c.brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl
                sx={selectStyle(!!validate.priceRange)}
                fullWidth
                error={!!validate.priceRange}
              >
                <InputLabel id="price-label">Select The Price Range</InputLabel>

                <Select
                  labelId="price-label"
                  value={selectedPrice}
                  label="Select The Price Range"
                  disabled={!selectedBrand}
                  onChange={(e) => setSelectedPrice(e.target.value)}
                >
                  {priceOptions.map((p, index) => (
                    <MenuItem key={index} value={p}>
                      {p}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <br />
              <TextField
                label="Enter The Model Name"
                name="model"
                id="model"
                value={car.model}
                onChange={handlevent}
                sx={inputStyle(Boolean(validate.model))}
                error={Boolean(validate.model)}
                helperText={validate.model}
              />
              <br />
              <TextField
                label="Enter The fuel type"
                name="fuel"
                id="fuel"
                value={car.fuel}
                onChange={handlevent}
                sx={inputStyle(Boolean(validate.fuel))}
                error={Boolean(validate.fuel)}
                helperText={validate.fuel}
              />
              <br />
              <TextField
                label="Enter The colour"
                name="colour"
                id="colour"
                value={car.colour}
                onChange={handlevent}
                // sx={inputStyle}
                sx={inputStyle(Boolean(validate.colour))}
                error={Boolean(validate.colour)}
                helperText={validate.colour}
              />
              <br />
              <TextField
                label="Enter The condition of grade"
                name="condition"
                id="condition"
                value={car.condition}
                onChange={handlevent}
                sx={inputStyle(Boolean(validate.condition))}
                error={Boolean(validate.condition)}
                helperText={validate.condition}
              />
              <br />

              <TextField
                label="Enter The Transmision"
                name="transmission"
                id="transmission"
                value={car.transmission}
                onChange={handlevent}
                sx={inputStyle(Boolean(validate.transmission))}
                error={Boolean(validate.transmission)}
                helperText={validate.transmission}
              />
              <br />
              <TextField
                label="Enter The km_drive"
                name="km_driven"
                id="km_driven"
                value={car.km_driven}
                onChange={handlevent}
                sx={inputStyle(Boolean(validate.km_driven))}
                error={Boolean(validate.km_driven)}
                helperText={validate.km_driven}
              />

              <TextField
                type="number"
                label="Enter The Model Year"
                name="year"
                id="year"
                value={car.year}
                onChange={handlevent}
                sx={inputStyle(Boolean(validate.year))}
                error={Boolean(validate.year)}
                helperText={validate.year}
              />
              <br />

              <TextField
                label="Enter The Car Type"
                name="type"
                id="type"
                value={car.type}
                onChange={handlevent}
                sx={inputStyle(Boolean(validate.type))}
                error={Boolean(validate.type)}
                helperText={validate.type}
              />
              <br />

              <TextField
                label="Enter The Expected Price"
                name="price"
                id="price"
                value={car.price}
                onChange={handlevent}
                sx={inputStyle(Boolean(validate.price))}
                error={Boolean(validate.price)}
                helperText={validate.price}
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
                  Submit
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

//
