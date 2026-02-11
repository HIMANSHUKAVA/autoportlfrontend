import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { showSuccessAlert, showErrorAlert } from "../../Util/Alert";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { forwardRef, useMemo, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useNavigate } from "react-router-dom";

/* -------------------- Shared Styles -------------------- */
const navItemStyle = {
  color: "#E6E6E6",
  textTransform: "none",
  fontSize: "0.95rem",
  fontWeight: 500,
  "&:hover": { color: "#D4AF37" },
};
const glassPaper = {
  mt: 1,
  p: 2.5,
  width: 650,
  borderRadius: "14px",
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(12px)",
  border: "1px solid rgba(255,255,255,0.15)",
  boxShadow: "0 4px 20px rgba(0,0,0,0.40)",
  zIndex: 10,
};

const inputSx = {
  mb: 1,
  input: { color: "#fff" },
  "& .MuiOutlinedInput-root": {
    background: "rgba(255,255,255,0.07)",
    "& fieldset": { borderColor: "rgba(255,255,255,0.2)" },
    "&:hover fieldset": { borderColor: "#D4AF37" },
    "&.Mui-focused fieldset": { borderColor: "#D4AF37" },
  },
};

/* -------------------- Static Data -------------------- */
const carData = {
  Maruti: {
    types: ["Hatchback", "Sedan", "SUV"],
    prices: ["₹4-8 Lakh", "₹8-12 Lakh", "₹12-20 Lakh"],
  },
  Hyundai: {
    types: ["Hatchback", "Sedan", "SUV", "EV"],
    prices: ["₹6-10 Lakh", "₹10-18 Lakh", "₹18-30 Lakh"],
  },
  Tata: {
    types: ["Hatchback", "Sedan", "SUV", "EV"],
    prices: ["₹6-10 Lakh", "₹10-18 Lakh", "₹18-28 Lakh"],
  },
  Kia: {
    types: ["Sedan", "SUV", "MPV", "EV"],
    prices: ["₹8-14 Lakh", "₹14-25 Lakh", "₹25-35 Lakh"],
  },
  Toyota: {
    types: ["Sedan", "SUV", "MPV", "Hybrid"],
    prices: ["₹10-20 Lakh", "₹20-35 Lakh", "₹35-55 Lakh"],
  },
  Honda: {
    types: ["Sedan", "SUV"],
    prices: ["₹8-13 Lakh", "₹13-20 Lakh", "₹20-28 Lakh"],
  },
  Mahindra: {
    types: ["SUV", "Electric"],
    prices: ["₹10-18 Lakh", "₹18-28 Lakh", "₹28-35 Lakh"],
  },
  MG: {
    types: ["SUV", "EV"],
    prices: ["₹12-20 Lakh", "₹20-30 Lakh", "₹30-40 Lakh"],
  },
  Volkswagen: {
    types: ["Sedan", "SUV"],
    prices: ["₹12-22 Lakh", "₹22-35 Lakh"],
  },
  Skoda: { types: ["Sedan", "SUV"], prices: ["₹12-22 Lakh", "₹22-35 Lakh"] },
  BMW: {
    types: ["Sedan", "SUV", "EV"],
    prices: ["₹50-70 Lakh", "₹70 Lakh-1 Cr", "Above ₹1 Cr"],
  },
  Mercedes: {
    types: ["Sedan", "SUV", "EV"],
    prices: ["₹55-80 Lakh", "₹80 Lakh-1.3 Cr", "Above ₹1.3 Cr"],
  },
};

const oldCarData = {
  Maruti: {
    types: ["Hatchback", "Sedan", "SUV"],
    prices: ["₹2-4 Lakh", "₹4-6 Lakh", "₹6-9 Lakh"],
  },
  Hyundai: {
    types: ["Hatchback", "Sedan", "SUV"],
    prices: ["₹3-6 Lakh", "₹6-9 Lakh", "₹9-13 Lakh"],
  },
  Tata: {
    types: ["Hatchback", "Sedan", "SUV", "EV"],
    prices: ["₹3-5 Lakh", "₹5-8 Lakh", "₹8-12 Lakh"],
  },
  Kia: {
    types: ["Sedan", "SUV", "MPV"],
    prices: ["₹6-10 Lakh", "₹10-14 Lakh", "₹14-20 Lakh"],
  },
  Toyota: {
    types: ["Sedan", "SUV", "MPV", "Hybrid"],
    prices: ["₹6-12 Lakh", "₹12-18 Lakh", "₹18-28 Lakh"],
  },
  Honda: {
    types: ["Sedan", "SUV"],
    prices: ["₹4-7 Lakh", "₹7-11 Lakh", "₹11-16 Lakh"],
  },
  Mahindra: {
    types: ["SUV", "Electric"],
    prices: ["₹6-11 Lakh", "₹11-16 Lakh", "₹16-22 Lakh"],
  },
  MG: {
    types: ["SUV", "EV"],
    prices: ["₹8-13 Lakh", "₹13-18 Lakh", "₹18-25 Lakh"],
  },
  Volkswagen: {
    types: ["Sedan", "SUV"],
    prices: ["₹6-10 Lakh", "₹10-16 Lakh", "₹16-22 Lakh"],
  },
  Skoda: {
    types: ["Sedan", "SUV"],
    prices: ["₹6-10 Lakh", "₹10-16 Lakh", "₹16-22 Lakh"],
  },
  BMW: {
    types: ["Sedan", "SUV", "EV"],
    prices: ["₹20-30 Lakh", "₹30-45 Lakh", "Above ₹45 Lakh"],
  },
  Mercedes: {
    types: ["Sedan", "SUV", "EV"],
    prices: ["₹22-35 Lakh", "₹35-50 Lakh", "Above ₹50 Lakh"],
  },
};


/* -------------------- Fullscreen Filters Modal (Mobile/Tablet) -------------------- */
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FiltersModal({
  open,
  onClose,
  title,
  data,
  selectedBrand,
  setSelectedBrand,
  selectedTypes,
  setSelectedTypes,
  selectedPrices,
  setSelectedPrices,
}) {
  const [search, setSearch] = useState("");

  const brands = useMemo(
    () =>
      Object.keys(data).filter((b) =>
        b.toLowerCase().includes(search.toLowerCase())
      ),
    [data, search]
  );

  const clearAll = () => {
    setSelectedBrand("");
    setSelectedTypes([]);
    setSelectedPrices([]);
    setSearch("");
  };

  const apply = () => {
    // TODO: यहाँ API call / navigation कर सकते हो
    onClose();
  };

  const brandPlaceholder = selectedBrand || "Search brand...";

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperProps={{
        sx: { background: "rgba(10,14,20,0.9)", backdropFilter: "blur(8px)" },
      }}
    >
      <AppBar
        sx={{
          position: "fixed",
          background: "rgba(5,11,20,0.75)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography
            sx={{ ml: 2, flex: 1, fontWeight: 600, color: "#D4AF37" }}
            variant="h6"
          >
            {title}
          </Typography>
          <Button color="inherit" onClick={clearAll}>
            Clear
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 1, background: "#D4AF37", color: "#000" }}
            onClick={apply}
          >
            Apply
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: 900, mx: "auto" }}>
        <Grid container spacing={3}>
          {/* Brand */}
          <Grid item xs={12} sm={4}>
            <TextField
              placeholder={brandPlaceholder}
              fullWidth
              size="small"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={inputSx}
            />
            <Box sx={{ maxHeight: 260, overflowY: "auto", pr: 1 }}>
              {brands.map((b) => (
                <MenuItem
                  key={b}
                  onClick={() => {
                    setSelectedBrand(b);
                    setSelectedTypes([]);
                    setSelectedPrices([]);
                  }}
                  sx={{
                    fontSize: "0.95rem",
                    color: selectedBrand === b ? "#D4AF37" : "#E6E6E6",
                    background:
                      selectedBrand === b
                        ? "rgba(255,255,255,0.12)"
                        : "transparent",
                    borderRadius: "8px",
                    "&:hover": {
                      background: "rgba(255,255,255,0.10)",
                      color: "#D4AF37",
                    },
                  }}
                >
                  {b}
                </MenuItem>
              ))}
              {brands.length === 0 && (
                <Typography sx={{ fontSize: "0.85rem", opacity: 0.7, mt: 1 }}>
                  No brand found
                </Typography>
              )}
            </Box>
          </Grid>

          {/* Types */}
          <Grid item xs={12} sm={4}>
            <Typography sx={{ color: "#D4AF37", fontWeight: 600, mb: 1 }}>
              Type
            </Typography>
            {selectedBrand ? (
              data[selectedBrand]?.types?.map((t) => (
                <MenuItem
                  key={t}
                  onClick={() =>
                    setSelectedTypes((prev) =>
                      prev.includes(t)
                        ? prev.filter((x) => x !== t)
                        : [...prev, t]
                    )
                  }
                  sx={{
                    fontSize: "0.95rem",
                    color: selectedTypes.includes(t) ? "#D4AF37" : "#E6E6E6",
                    background: selectedTypes.includes(t)
                      ? "rgba(255,255,255,0.12)"
                      : "transparent",
                    borderRadius: "8px",
                    "&:hover": {
                      background: "rgba(255,255,255,0.10)",
                      color: "#D4AF37",
                    },
                  }}
                >
                  {t}
                </MenuItem>
              ))
            ) : (
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Select Brand First
              </Typography>
            )}
          </Grid>

          {/* Prices */}
          <Grid item xs={12} sm={4}>
            <Typography sx={{ color: "#D4AF37", fontWeight: 600, mb: 1 }}>
              Price
            </Typography>
            {selectedBrand ? (
              data[selectedBrand]?.prices?.map((p) => (
                <MenuItem
                  key={p}
                  onClick={() =>
                    setSelectedPrices((prev) =>
                      prev.includes(p)
                        ? prev.filter((x) => x !== p)
                        : [...prev, p]
                    )
                  }
                  sx={{
                    fontSize: "0.95rem",
                    color: selectedPrices.includes(p) ? "#D4AF37" : "#E6E6E6",
                    background: selectedPrices.includes(p)
                      ? "rgba(255,255,255,0.12)"
                      : "transparent",
                    borderRadius: "8px",
                    "&:hover": {
                      background: "rgba(255,255,255,0.10)",
                      color: "#D4AF37",
                    },
                  }}
                >
                  {p}
                </MenuItem>
              ))
            ) : (
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                Select Brand First
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
    </Dialog>
  );
}

/* -------------------- Main Navbar -------------------- */
export default function Navbar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  // Shared delay timer for hover close
  let closetimeout;

  const handllogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("islogin");

    showSuccessAlert("Successfully Logout");
    navigate("/"), { replace: true };
  };
  const name = localStorage.getItem("username");
  /* ------------ Desktop: New Cars -------------- */
  const [menu, setmenu] = useState(null);
  const [serchbrand, setserchbrand] = useState("");
  const [selectedbrand, setselectedbrand] = useState("");
  const [selectedtype, setselectedtype] = useState([]);
  const [selectedprice, setselectedprice] = useState([]);

  const openNew = (name) => {
    clearTimeout(closetimeout);
    setmenu(name);
    setoldcarmenu(null); // close other menu
  };
  const closeNew = () => {
    closetimeout = setTimeout(() => {
      setmenu(null);
      setselectedbrand("");
      setselectedtype([]);
      setselectedprice([]);
      setserchbrand("");
    }, 300);
  };

  const filterbrand = useMemo(
    () =>
      Object.keys(carData).filter((b) =>
        b.toLowerCase().includes(serchbrand.toLowerCase())
      ),
    [serchbrand]
  );

  const navigate = useNavigate();

  const applynewcarsdata = () => {
    let query = [];

    if (selectedbrand) query.push(`brand=${selectedbrand}`);
    if (selectedtype.length > 0) query.push(`type=${selectedtype[0]}`);
    if (selectedprice.length > 0) query.push(`price=${selectedprice[0]}`);

    if (query.length === 0) {
      alert("Please select at least one filter");
      return;
    }

    navigate(`/viewcars?${query.join("&")}`);
  };

  /* ------------ Desktop: Old Cars -------------- */
  const [oldcarmenu, setoldcarmenu] = useState(null);
  const [sercholdcar, setsercholdcar] = useState("");
  const [oldcarselectedbrand, setoldcarselectedbrand] = useState("");
  const [oldcarselectedtype, setoldcarselectedtype] = useState([]);
  const [oldcarselectedprice, setoldcarselectedprice] = useState([]);
  const applyoldcarsdata = () => {
    let query = [];

    if (oldcarselectedbrand)
      query.push(`brand=${encodeURIComponent(oldcarselectedbrand)}`);

    if (oldcarselectedtype.length > 0)
      query.push(`type=${encodeURIComponent(oldcarselectedtype[0])}`);

    if (oldcarselectedprice.length > 0)
      query.push(`price=${encodeURIComponent(oldcarselectedprice[0])}`);

    if (query.length === 0) {
      alert("please select at least one filter");
      return;
    }

    navigate(`/viewoldcar?${query.join("&")}`);
  };

  const openOld = (name) => {
    clearTimeout(closetimeout);
    setoldcarmenu(name);
    setmenu(null); // close other menu
  };
  const closeOld = () => {
    closetimeout = setTimeout(() => {
      setoldcarmenu(null);
      setoldcarselectedbrand("");
      setoldcarselectedtype([]);
      setoldcarselectedprice([]);
      setsercholdcar("");
    }, 300);
  };

  const oldcarfilterbrand = useMemo(
    () =>
      Object.keys(oldCarData).filter((b) =>
        b.toLowerCase().includes(sercholdcar.toLowerCase())
      ),
    [sercholdcar]
  );

  /* ------------ Mobile/Tablet -------------- */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState({ open: false, which: "new" });

  const openFilters = (which) => setFiltersOpen({ open: true, which });
  const closeFilters = () => setFiltersOpen({ open: false, which: "new" });

  const whichData = filtersOpen.which === "new" ? carData : oldCarData;

  // Pointers for mobile modal states (we reuse desktop states to keep selections consistent)
  const mobileBrand =
    filtersOpen.which === "new" ? selectedbrand : oldcarselectedbrand;
  const setMobileBrand =
    filtersOpen.which === "new" ? setselectedbrand : setoldcarselectedbrand;
  const mobileTypes =
    filtersOpen.which === "new" ? selectedtype : oldcarselectedtype;
  const setMobileTypes =
    filtersOpen.which === "new" ? setselectedtype : setoldcarselectedtype;
  const mobilePrices =
    filtersOpen.which === "new" ? selectedprice : oldcarselectedprice;
  const setMobilePrices =
    filtersOpen.which === "new" ? setselectedprice : setoldcarselectedprice;

  const neonBlue = "#1e90ff";
  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(5,11,20,0.55)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          py: 1,
        }}
      >
        <Toolbar
          sx={{
            width: "90%",
            mx: "auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Brand */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#D4AF37",
              letterSpacing: "1px",
              cursor: "pointer",
            }}
          >
            AUTO PORTAL
          </Typography>

          {/* Desktop Menu */}
          {isDesktop ? (
            <Box sx={{ display: "flex", gap: 4, alignItems: "center" }}>
              <Button sx={navItemStyle} component={Link} to="/dashboard">
                Dashboard
              </Button>

              {/* New Cars (hover) */}
              <Box
                onMouseEnter={() => openNew("new cars")}
                onMouseLeave={closeNew}
                sx={{ position: "relative" }}
              >
                <Button sx={navItemStyle}>New Cars</Button>
                {menu === "new cars" && (
                  <Paper
                    sx={{
                      ...glassPaper,
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      transform: "none",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <TextField
                          placeholder={selectedbrand || "Search brand..."}
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={serchbrand}
                          onChange={(e) => setserchbrand(e.target.value)}
                          sx={inputSx}
                        />
                        {serchbrand && (
                          <Box
                            sx={{ maxHeight: 180, overflowY: "auto", pr: 1 }}
                          >
                            {filterbrand.length > 0 ? (
                              filterbrand.map((brand) => (
                                <MenuItem
                                  key={brand}
                                  onClick={() => {
                                    setselectedbrand(brand);
                                    setselectedtype([]);
                                    setselectedprice([]);
                                  }}
                                  sx={{
                                    fontSize: "0.9rem",
                                    color:
                                      selectedbrand === brand
                                        ? "#D4AF37"
                                        : "#E6E6E6",
                                    background:
                                      selectedbrand === brand
                                        ? "rgba(255,255,255,0.12)"
                                        : "transparent",
                                    borderRadius: "6px",
                                    "&:hover": {
                                      background: "rgba(255,255,255,0.10)",
                                      color: "#D4AF37",
                                    },
                                  }}
                                >
                                  {brand}
                                </MenuItem>
                              ))
                            ) : (
                              <Typography
                                sx={{ fontSize: "0.8rem", opacity: 0.7 }}
                              >
                                No brand found
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Grid>

                      <Grid item xs={4} sx={{ mt: 5 }}>
                        <Typography
                          sx={{ color: "#D4AF37", fontWeight: 600, mb: 1 }}
                        >
                          Types
                        </Typography>
                        {selectedbrand ? (
                          carData[selectedbrand]?.types?.map((type) => (
                            <MenuItem
                              key={type}
                              onClick={() =>
                                setselectedtype((prev) =>
                                  prev.includes(type)
                                    ? prev.filter((t) => t !== type)
                                    : [...prev, type]
                                )
                              }
                              sx={{
                                fontSize: "0.9rem",
                                color: selectedtype.includes(type)
                                  ? "#D4AF37"
                                  : "#E6E6E6",
                                background: selectedtype.includes(type)
                                  ? "rgba(255,255,255,0.12)"
                                  : "transparent",
                                "&:hover": {
                                  background: "rgba(255,255,255,0.10)",
                                  color: "#D4AF37",
                                },
                              }}
                            >
                              {type}
                            </MenuItem>
                          ))
                        ) : (
                          <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Select Brand First
                          </Typography>
                        )}
                      </Grid>

                      <Grid item xs={4} sx={{ mt: 5 }}>
                        <Typography
                          sx={{ color: "#D4AF37", fontWeight: 600, mb: 1 }}
                        >
                          Price Range
                        </Typography>
                        {selectedbrand ? (
                          carData[selectedbrand]?.prices?.map((price) => (
                            <MenuItem
                              key={price}
                              onClick={() =>
                                setselectedprice((prev) =>
                                  prev.includes(price)
                                    ? prev.filter((p) => p !== price)
                                    : [...prev, price]
                                )
                              }
                              sx={{
                                fontSize: "0.9rem",
                                color: selectedprice.includes(price)
                                  ? "#D4AF37"
                                  : "#E6E6E6",
                                background: selectedprice.includes(price)
                                  ? "rgba(255,255,255,0.12)"
                                  : "transparent",
                                "&:hover": {
                                  background: "rgba(255,255,255,0.10)",
                                  color: "#D4AF37",
                                },
                              }}
                            >
                              {price}
                            </MenuItem>
                          ))
                        ) : (
                          <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Select Brand First
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: 2,
                        background: "#D4AF37",
                        color: "#000",
                        fontWeight: 600,
                      }}
                      onClick={applynewcarsdata}
                    >
                      Apply
                    </Button>
                  </Paper>
                )}
              </Box>

              {/* Old Cars (hover) */}
              <Box
                onMouseEnter={() => openOld("old cars")}
                onMouseLeave={closeOld}
                sx={{ position: "relative" }}
              >
                <Button sx={navItemStyle}>Old Cars</Button>
                {oldcarmenu === "old cars" && (
                  <Paper
                    sx={{
                      ...glassPaper,
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      transform: "none",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <TextField
                          placeholder={oldcarselectedbrand || "Search Brand..."}
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={sercholdcar}
                          onChange={(e) => setsercholdcar(e.target.value)}
                          sx={inputSx}
                        />
                        {sercholdcar && (
                          <Box
                            sx={{ maxHeight: 180, overflowY: "auto", pr: 1 }}
                          >
                            {oldcarfilterbrand.length > 0 ? (
                              oldcarfilterbrand.map((brand) => (
                                <MenuItem
                                  key={brand}
                                  onClick={() => {
                                    setoldcarselectedbrand(brand);
                                    setoldcarselectedtype([]);
                                    setoldcarselectedprice([]);
                                  }}
                                  sx={{
                                    fontSize: "0.9rem",
                                    color:
                                      oldcarselectedbrand === brand
                                        ? "#D4AF37"
                                        : "#E6E6E6",
                                    background:
                                      oldcarselectedbrand === brand
                                        ? "rgba(255,255,255,0.12)"
                                        : "transparent",

                                    borderRadius: "6px",
                                    "&:hover": {
                                      background: "rgba(255,255,255,0.10)",
                                      color: "#D4AF37",
                                    },
                                  }}
                                >
                                  {brand}
                                </MenuItem>
                              ))
                            ) : (
                              <Typography
                                sx={{ fontSize: "0.8rem", opacity: 0.7 }}
                              >
                                No brand found
                              </Typography>
                            )}
                          </Box>
                        )}
                      </Grid>

                      <Grid item xs={4} sx={{ mt: 5 }}>
                        <Typography
                          sx={{ color: "#D4AF37", fontWeight: 600, mb: 1 }}
                        >
                          Type
                        </Typography>
                        {oldcarselectedbrand ? (
                          oldCarData[oldcarselectedbrand]?.types?.map((t) => (
                            <MenuItem
                              key={t}
                              onClick={() =>
                                setoldcarselectedtype((prev) =>
                                  prev.includes(t)
                                    ? prev.filter((x) => x !== t)
                                    : [...prev, t]
                                )
                              }
                              sx={{
                                fontSize: "0.9rem",
                                color: oldcarselectedtype.includes(t)
                                  ? "#D4AF37"
                                  : "#E6E6E6",
                                background: oldcarselectedtype.includes(t)
                                  ? "rgba(255,255,255,0.12)"
                                  : "transparent",
                                "&:hover": {
                                  background: "rgba(255,255,255,0.10)",
                                  color: "#D4AF37",
                                },
                              }}
                            >
                              {t}
                            </MenuItem>
                          ))
                        ) : (
                          <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Select Brand First
                          </Typography>
                        )}
                      </Grid>

                      <Grid item xs={4} sx={{ mt: 5 }}>
                        <Typography
                          sx={{ color: "#D4AF37", fontWeight: 600, mb: 1 }}
                        >
                          Price
                        </Typography>
                        {oldcarselectedbrand ? (
                          oldCarData[oldcarselectedbrand]?.prices?.map((p) => (
                            <MenuItem
                              key={p}
                              onClick={() =>
                                setoldcarselectedprice((prev) =>
                                  prev.includes(p)
                                    ? prev.filter((x) => x !== p)
                                    : [...prev, p]
                                )
                              }
                              sx={{
                                fontSize: "0.9rem",
                                color: oldcarselectedprice.includes(p)
                                  ? "#D4AF37"
                                  : "#E6E6E6",
                                background: oldcarselectedprice.includes(p)
                                  ? "rgba(255,255,255,0.12)"
                                  : "transparent",
                                "&:hover": {
                                  background: "rgba(255,255,255,0.10)",
                                  color: "#D4AF37",
                                },
                              }}
                            >
                              {p}
                            </MenuItem>
                          ))
                        ) : (
                          <Typography variant="body2" sx={{ opacity: 0.7 }}>
                            Select Brand First
                          </Typography>
                        )}
                      </Grid>
                      <Button
                        fullWidth
                        variant="contained"
                        sx={{
                          mt: 2,
                          background: "#D4AF37",
                          color: "#000",
                          fontWeight: 600,
                        }}
                        onClick={applyoldcarsdata}
                      >
                        Apply
                      </Button>
                    </Grid>
                  </Paper>
                )}
              </Box>

              <Button sx={navItemStyle} component={Link} to="/about">
                About
              </Button>
              <Button sx={navItemStyle} component={Link} to="/contect">
                Contact
              </Button>
            </Box>
          ) : (
            // Mobile / Tablet: Hamburger + Drawer
            <IconButton
              onClick={() => setDrawerOpen(true)}
              aria-label="menu"
              sx={{ color: "#E6E6E6" }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Logout */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#D4AF37",
              color: "#000",
              fontWeight: 600,
              px: 3,
              borderRadius: "10px",
              "&:hover": { backgroundColor: "#E6C55F" },
            }}
            onClick={handllogout}
          >
            LOGOUT
          </Button>
          <Box>
            <IconButton
              component={Link}
              to="/wishlist"
              sx={{
                color: "red",
              }}
            >
              <FavoriteIcon />
            </IconButton>
            <IconButton
              sx={{ color: neonBlue }}
              component={Link}
              to="/add-to-cart"
            >
              <ShoppingCartIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="body1">Welcome {name}</Typography>

            <Typography variant="body1">
              Role : {localStorage.getItem("role")}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (Mobile/Tablet) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: { xs: "85%", sm: 380 },
            background: "rgba(10,14,20,0.95)",
            color: "#E6E6E6",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="h6"
            sx={{ color: "#D4AF37", fontWeight: 700, mb: 1 }}
          >
            Menu
          </Typography>
        </Box>
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
        <List>
          <ListItemButton
            onClick={() => setDrawerOpen(false)}
            LinkComponent={Link}
            to="/dashboard"
          >
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
              openFilters("new");
            }}
          >
            <ListItemText primary="New Cars (Filters)" />
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setDrawerOpen(false);
              openFilters("old");
            }}
          >
            <ListItemText primary="Old Cars (Filters)" />
          </ListItemButton>
          <ListItemButton
            component={Link}
            to="/about"
            onClick={() => setDrawerOpen(false)}
          >
            <ListItemText primary="About" />
          </ListItemButton>

          <ListItemButton
            onClick={() => setDrawerOpen(false)}
            LinkComponent={Link}
            to="/contect"
          >
            <ListItemText primary="Contact" />
          </ListItemButton>
        </List>
      </Drawer>

      {/* Fullscreen Filters Modal (Mobile/Tablet) */}
      <FiltersModal
        open={filtersOpen.open}
        onClose={closeFilters}
        title={filtersOpen.which === "new" ? "New Cars" : "Old Cars"}
        data={whichData}
        selectedBrand={mobileBrand}
        setSelectedBrand={setMobileBrand}
        selectedTypes={mobileTypes}
        setSelectedTypes={setMobileTypes}
        selectedPrices={mobilePrices}
        setSelectedPrices={setMobilePrices}
      />

      {/* spacer for fixed appbar */}
      {/* <Box sx={{ height: 72 }} /> */}
    </>
  );
}
