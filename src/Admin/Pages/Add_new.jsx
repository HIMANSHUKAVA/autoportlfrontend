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
import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../Buyer/Layout/Footer";
import { showErrorAlert, showSuccessAlert } from "../../Util/Alert";
const initialstate = {
  brand: "",
  model: "",
  fuel: "",
  colour: "",
  transmission: "",
  type: "",
  price: "",
  pricerange: [],
  photo: null,
  priceRange: "",
};

const reinitialstate = {
  brand: "",
  model: "",
  fuel: "",
  colour: "",
  transmission: "",
  type: "",
  price: "",
  pricerange: [],
  photo: null,
  priceRange: "",
};

const API = import.meta.env.VITE_API_BASE_URL;

export default function Add_new() {
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch({
        type: "SET_PHOTO",
        payload: file,
      });
    }
  };

  const convettonumber = (text) => {
    if (text.toLowerCase().includes("above")) {
      const value = Number(text.replace(/[^\d.]/g, ""));
      return {
        min: value * 100,
        max: null,
      };
    }

    // const parts = text.split("-");/

    const toRupees = (value) => {
      if (value.toLowerCase().includes("cr")) {
        return Number(value.replace(/[^\d.]/g, "")) * 10000000;
      }
      return Number(value.replace(/[^\d.]/g, "")) * 100000;
    };

    if (text.includes("above")) {
      const min = toRupees(text);
      return { min, max: null };
    }

    const parts = text.split("-");

    if (parts.length !== 2) {
      return { min: null, max: null };
    }

    const min = toRupees(parts[0]);
    const max = toRupees(parts[1]);

    return { min, max };
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

  const cardeta = [
    {
      id: 1,
      name: "maruti",
      price: ["₹4-8 Lakh", "₹8-12 Lakh", "₹12-20 Lakh"],
    },
    {
      id: 2,
      name: "Hyundai",
      price: ["₹6-10 Lakh", "₹10-18 Lakh", "₹18-30 Lakh"],
    },
    {
      id: 3,
      name: "Tata",
      price: ["₹6-10 Lakh", "₹10-18 Lakh", "₹18-28 Lakh"],
    },
    {
      id: 4,
      name: "Kia",
      price: ["₹10-20 Lakh", "₹20-35 Lakh", "₹35-55 Lakh"],
    },
    {
      id: 5,
      name: "Toyota",
      price: ["₹10-20 Lakh", "₹20-35 Lakh", "₹35-55 Lakh"],
    },
    {
      id: 6,
      name: "honda",
      price: ["₹8-13 Lakh", "₹13-20 Lakh", "₹20-28 Lakh"],
    },
    {
      id: 7,
      name: "Mahindra",
      price: ["₹10-18 Lakh", "₹18-28 Lakh", "₹28-35 Lakh"],
    },
    {
      id: 8,
      name: "MG",
      price: ["₹12-20 Lakh", "₹20-30 Lakh", "₹30-40 Lakh"],
    },
    {
      id: 9,
      name: "Volkswagen",
      price: ["₹12-22 Lakh", "₹22-35 Lakh"],
    },
    {
      id: 10,
      name: "Skoda",
      price: ["₹12-22 Lakh", "₹22-35 Lakh"],
    },
    {
      id: 11,
      name: "BMW",
      price: ["₹50-70 Lakh", "₹70 Lakh-1 Cr", "Above ₹1 Cr"],
    },
    {
      id: 12,
      name: "Mercedes",
      price: ["₹55-80 Lakh", "₹80 Lakh-1.3 Cr", "Above ₹1.3 Cr"],
    },
  ];

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

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_BRAND": {
        const selectedCar = action.payload;
        return {
          ...state,
          brand: selectedCar.name,
          pricerange: selectedCar.price,
          priceRange: "",
        };
      }

      case "SET_PRICE_RANGE":
        return {
          ...state,
          priceRange: action.payload,
        };

      case "SET_PRICE":
        return {
          ...state,
          price: action.payload,
        };

      case "NORMAL_FIELD":
        return {
          ...state,
          [action.field]: action.value,
        };

      case "SET_PHOTO":
        return {
          ...state,
          photo: action.payload,
        };

      case "RESET": {
        return reinitialstate;
      }
      default:
        return state;
    }
  };

  const [validetion, setvalidetion] = useState({});

  const validate = () => {
    let min = null;
    let max = null;

    // price range convert only if selected
    if (state.priceRange) {
      ({ min, max } = convettonumber(state.priceRange));
    }

    const newError = {};

    // BRAND
    if (!state.brand.trim()) {
      newError.brand = "Brand is required";
    }

    // PRICE RANGE
    if (!state.priceRange) {
      newError.priceRange = "Price range is required";
    }

    // MODEL
    if (!state.model.trim()) {
      newError.model = "Model is required";
    }

    // FUEL
    if (!state.fuel.trim()) {
      newError.fuel = "Fuel type is required";
    }

    // COLOUR
    if (!state.colour.trim()) {
      newError.colour = "Colour is required";
    }

    // TRANSMISSION
    if (!state.transmission.trim()) {
      newError.transmission = "Transmission is required";
    }

    // CAR TYPE
    if (!state.type.trim()) {
      newError.type = "Car type is required";
    }

    // PHOTO
    if (!state.photo) {
      newError.photo = "Car photo is required";
    }

    // PRICE
    if (!state.price.trim()) {
      newError.price = "Price is required";
    } else if (isNaN(state.price)) {
      newError.price = "Price must be a number";
    } else if (
      min !== null &&
      max !== null &&
      (Number(state.price) < min || Number(state.price) > max)
    ) {
      newError.price = `Price should be between ${min} and ${max} Lakh`;
    } else if (min !== null && max === null && Number(state.price) < min) {
      newError.price = `Price should be above ${min} Lakh`;
    }

    return newError;
  };

  const [state, dispatch] = useReducer(reducer, initialstate);

  const handleSubmit = () => {
    const errors = validate();
    setvalidetion(errors);

    if (Object.keys(errors).length > 0) return;

    console.log(" READY TO SUBMIT", state);

    const { min, max } = convettonumber(state.priceRange);
    const payload = {
      brand: state.brand,
      model: state.model,
      fuel: state.fuel,
      transmission: state.transmission,
      color: state.colour,
      type: state.type,
      carType: "New",
      price: Number(state.price),
      priceMin: min,
      priceMax: max,
      priceLabel: state.priceRange,
      description: "this is best and wonderful car",
    };
    const formdeta = new FormData();

    formdeta.append(
      "cars",

      new Blob([JSON.stringify(payload)], { type: "application/json" }),
    );

    if (state.photo) {
      formdeta.append("photo", state.photo);
    }

    axios
      .post(`${API}/admin/add/newcar`, formdeta, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((Response) => {
        const id = Response.data.id;
        console.log(id);

        showSuccessAlert("Car Added Successfylly");
        navigate(`/admin/img/${id}`);
        dispatch({ type: "RESET" });
      })
      .catch((error) => {
        showErrorAlert(error);
      });
  };
  return (
    <>
      <Typography variant="h4" sx={{ p: 3, color: "white" }}>
        Add New Cars
      </Typography>
      <hr />
      {/* form main box */}
      <Box
        sx={{
          color: "white",
          mt: 6,
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" }, //  KEY
          gap: 4,
          px: { xs: 2, md: 10 },
          alignItems: "flex-start",
        }}
      >
        {/* img section */}
        <Box
          sx={{
            width: "90%",
            maxWidth: 550,

            height: 260,
            border:
              validetion.photo ?
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
              target="image/*"
              hidden
              onChange={handlePhotoChange}
            />

            {!state.photo ?
              <>
                <Typography variant="h5">⬆</Typography>
                <Typography variant="h4">upload Car Photo</Typography>{" "}
              </>
            : <>
                <img
                  src={URL.createObjectURL(state.photo)}
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

        {/* form section */}

        <Box
          sx={{
            width: { xs: "100%", md: "70%" },
            // bgcolor: "rebeccapurple",
            // display: "flex",
            mx: "auto",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              width: "90%",
              maxWidth: "500px",
              justifyContent: "flex-start",
            }}
          >
            <FormControl
              fullWidth
              error={!!validetion.brand}
              sx={selectStyle(!!validetion.brand)}
            >
              <InputLabel>Select The Brand</InputLabel>

              <Select
                value={state.brand}
                label="Select The Brand"
                onChange={(e) => {
                  const selectedcar = cardeta.find(
                    (c) => c.name === e.target.value,
                  );
                  dispatch({
                    type: "SET_BRAND",
                    payload: selectedcar,
                  });
                }}
              >
                {cardeta.map((c) => (
                  <MenuItem key={c.id} value={c.name}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>

              {validetion.brand && (
                <Typography variant="caption" color="error">
                  {validetion.brand}
                </Typography>
              )}
            </FormControl>

            {/* price range */}
            <FormControl
              fullWidth
              error={!!validetion.priceRange}
              sx={selectStyle(!!validetion.priceRange)}
            >
              <InputLabel>Select The Price Range</InputLabel>

              <Select
                disabled={!state.brand}
                value={state.priceRange}
                label="Select The Price Range"
                onChange={(e) =>
                  dispatch({
                    type: "SET_PRICE_RANGE",
                    payload: e.target.value,
                  })
                }
              >
                {state.pricerange.map((p, index) => (
                  <MenuItem key={index} value={p}>
                    {p}
                  </MenuItem>
                ))}
              </Select>

              {validetion.priceRange && (
                <Typography variant="caption" color="error">
                  {validetion.priceRange}
                </Typography>
              )}
            </FormControl>

            {/* model firld */}
            <TextField
              label="Enter The Model Name"
              value={state.model}
              name="model"
              onChange={(e) => {
                dispatch({
                  type: "NORMAL_FIELD",
                  value: e.target.value,
                  field: "model",
                });
              }}
              sx={inputStyle(!!validetion.model)}
              error={!!validetion.model}
              helperText={validetion.model}
            />

            <br />

            {/* fuel */}
            <FormControl
              sx={selectStyle(!!validetion.fuel)}
              error={!!validetion.fuel}
            >
              <InputLabel id="s">Select The Fuel Type</InputLabel>

              <Select
                onChange={(e) => {
                  dispatch({
                    type: "NORMAL_FIELD",
                    field: "fuel",
                    value: e.target.value,
                  });
                }}
                value={state.fuel}
                id="s"
                label="Select The Fuel Type"
              >
                <MenuItem value="Petrol">Petrol</MenuItem>
                <MenuItem value="Diesel">Diesel</MenuItem>
                <MenuItem value="CNG">CNG</MenuItem>
                <MenuItem value="EV">EV</MenuItem>
              </Select>
              {validetion.fuel && (
                <Typography variant="caption" color="error">
                  {validetion.fuel}
                </Typography>
              )}
            </FormControl>

            {/* transimission */}
            <TextField
              label="Enter The Transmission"
              id="transmission"
              value={state.transmission}
              onChange={(e) => {
                dispatch({
                  type: "NORMAL_FIELD",
                  value: e.target.value,
                  field: "transmission",
                });
              }}
              sx={inputStyle(!!validetion.transmission)}
              error={!!validetion.transmission}
              helperText={validetion.transmission}
            />
            <br />

            <TextField
              label="Enter The Color"
              id="color"
              name="color"
              value={state.colour}
              onChange={(e) => {
                dispatch({
                  type: "NORMAL_FIELD",
                  value: e.target.value,
                  field: "colour",
                });
              }}
              sx={inputStyle(!!validetion.colour)}
              error={!!validetion.colour}
              helperText={validetion.colour}
            />
            <br />
            <FormControl
              sx={selectStyle(!!validetion.type)}
              error={!!validetion.type}
            >
              <InputLabel id="s">Select The Car Type Type</InputLabel>

              <Select
                value={state.type}
                onChange={(e) => {
                  dispatch({
                    type: "NORMAL_FIELD",
                    field: "type",
                    value: e.target.value,
                  });
                }}
                id="s"
                label="Select The Fuel Type"
              >
                <MenuItem value="SUV">SUV</MenuItem>
                <MenuItem value="Hatchback">Hatchback</MenuItem>
                <MenuItem value="Sedan">Sedan</MenuItem>
              </Select>
              {validetion.type && (
                <Typography variant="caption" color="error">
                  {validetion.type}
                </Typography>
              )}
            </FormControl>
            <br />
            <TextField
              label="Enter The Price"
              id="price"
              value={state.price}
              onChange={(e) => {
                dispatch({
                  type: "NORMAL_FIELD",
                  value: e.target.value,
                  field: "price",
                });
              }}
              sx={inputStyle(!!validetion.price)}
              error={!!validetion.price}
              helperText={validetion.price}
            />
            <br />
          </form>

          <Button
            onClick={handleSubmit}
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
            ADD Car
          </Button>
          <Button
            type="reset"
            sx={{
              border: "1px solid white",
              borderRadius: 2,
              m: 2,
              color: "white",
              width: 100,
            }}
            onClick={() => {
              dispatch({ type: "RESET" });
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
