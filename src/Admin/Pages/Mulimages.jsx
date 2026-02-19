import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { showErrorAlert, showSuccessAlert } from "../../Util/Alert";

export default function Mulimages() {
  const [photo, setphoto] = useState([]);

  const { id } = useParams();
  const API = import.meta.env.VITE_API_BASE_URL;

  const handlphotochange = (e) => {
    const files = Array.from(e.target.files);
    setphoto((prev) => [...prev, ...files]);
  };

  const handlphotoremove = (index) => {
    setphoto((prev) => prev.filter((_, t) => t != index));
  };
  const handlsubmit = () => {
    if (photo.length === 0) {
      showErrorAlert("Please Select At Least One Image");
      return;
    }
    if (photo.length > 4) {
      showErrorAlert("Please Select Maximimum 4 Images");
      return;
    }

    const formdeta = new FormData();
    photo.forEach((photo) => {
      formdeta.append("photos", photo);
    });

    axios
      .post(`${API}/admin/new/carimage/add/${id}`, formdeta, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((Response) => {
        console.log(Response.data);
        showSuccessAlert("Car Image Added Successfully");
        setphoto([]);
      })
      .catch((Error) => {
        showErrorAlert(Error);
      });
  };

  return (
    <>
      <Box
        sx={{
          p: 3,
        }}
      >
        <Typography variant="h4">Add New Car Slider Images</Typography>
        <Typography variant="body2">Upload Muktiple Images</Typography>
        <hr />
      </Box>

      {/* main box */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          mt: 3,
          // bgcolor:"red"
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* insertbox */}
        <Box
          component="label"
          sx={{
            border: "1px dotted rgba(148,163,184,0.4)",
            textAlign: "center",
            width: { xs: "100%", md: "20%" },
            // p: { xs: 6, md: 15 },
            minHeight: { xs: 220 }, // ✅ fixed height feel
            display: "flex",
            p: { xs: 0, md: 10 },
            cursor: "pointer",
            // display: "block",
            borderRadius: 3,
            m: 2,
          }}
        >
          <input
            accept="image/*"
            type="file"
            hidden
            multiple
            onChange={handlphotochange}
          />
          <Typography
            sx={{
              textAlign: { xs: "center" },
              p: { xs: 5 },
            }}
          >
            ⬆ Click to upload multiple images
          </Typography>
        </Box>

        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            // width: "50%",
            m: 3,
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            m: { xs: 2 },
          }}
        >
          {photo.map((img, index) => (
            <>
              <Box
                key={index}
                sx={{
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: 2,
                  width: { xs: "100%", sm: "48%", md: "40%" },
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
                  onClick={() => handlphotoremove(index)}
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
          // onClick={handlsubmmitphoto}
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
          onClick={handlsubmit}
        >
          Save Image
        </Button>
      </Box>
    </>
  );
}
