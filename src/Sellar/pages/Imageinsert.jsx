import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showErrorAlert, showSuccessAlert } from "../../Util/Alert";
import NavbarAndDrawer from "../layout/NavbarAndDrawer";
export default function Imageinsert() {
  const [image, setimage] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const handlimage = (e) => {
    const files = Array.from(e.target.files);

    setimage([...image, ...files]);
  };

  console.log(id);

  const handlremoveitem = (index) => {
    setimage((prev) => prev.filter((_, t) => t !== index));
  };

  const handlsubmmitphoto = () => {
    if (image.length === 0) {
      showErrorAlert("Please Select At Least One Image");
      return;
    }
    if (image.length > 4) {
      showErrorAlert("Please Select Maximimum 4 Images");
      return;
    }

    const payload = new FormData();

    image.forEach((image) => {
      payload.append("photos", image);
    });
    const API = import.meta.env.VITE_API_BASE_URL;

    axios
      .post(`${API}/seller/request/image/add/${id}`, payload, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        showSuccessAlert("Image Uploaded Successfully");
        navigate("/sellardashboard");
      })
      .catch((error) => {
        showErrorAlert(error);
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
          <Typography variant="h4">Add Car Images</Typography>
          <Typography variant="body2">
            Upload Multiple Images For This Vehicle
          </Typography>
          <hr />
        </Box>

        {/* main box */}
        <Box
          sx={{
            // bgcolor: "rebeccapurple",
            mt: 6,
            width: "100%",
            display: "flex",
          }}
        >
          {/* Upload Image */}
          <Box
            component="label"
            sx={{
              // cursor: "pointer",
              // bgcolor: "red",
              border: "1px dotted rgba(148,163,184,0.4)",
              textAlign: "center",
              p: 13,
              cursor: "pointer",
              display: "block",
              width: "20%",
              borderRadius: 3,
              m: 3,
            }}
          >
            <input
              multiple
              accept="image/*"
              type="file"
              hidden
              onChange={handlimage}
            />
            <Typography>⬆ Click to upload multiple images</Typography>
          </Box>
          {/* image Preview */}
          <Box
            sx={{
              width: "50%",
              m: 3,
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {image.map((img, index) => (
              <>
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: 2,
                    width: "40%",
                  }}
                >
                  <img
                    src={URL.createObjectURL(img)}
                    style={{
                      width: "100%",
                      height: 140,
                      objectFit: "cover",
                    }}
                  />

                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 2,
                      background: "rgba(0,0,0,0.5)",
                      color: "red",
                      "&:hover": { background: "rgba(0,0,0,0.7)" },
                    }}
                    onClick={() => handlremoveitem(index)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              </>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            m: 3,
          }}
        >
          <Button
            type="submit"
            onClick={handlsubmmitphoto}
            sx={{
              color: "#38BDF8",
              "&:hover": {
                backgroundColor: "rgba(56, 189, 248, 0.15)",
                borderColor: "#38BDF8",
              },
              border: "1px solid #38BDF8",
              borderRadius: 2,
              px: 4,
            }}
          >
            Save Image
          </Button>
        </Box>
      </Box>
    </>
  );
}
