import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { showConfirmAlert, showSuccessAlert } from "../../Util/Alert";
import { deletevehiclebyid } from "../../comoonfunction/Vehicledelete";
export default function Vehicle() {
  const [car, setcar] = useState([]);

  const API = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    axios
      .get(`${API}/seller/request/view`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((Response) => {
        setcar(Response.data);
        // console.log(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sdetail = car.slice(0, 7);
  // console.log(sdetail);

  const navigate = useNavigate();

  const handldelete = (id) => {
    showConfirmAlert(
      "Delete Car",
      "This action cannot be undone!",
      "Delete",
      "Cancel",
    ).then((res) => {
      if (res.isConfirmed) {
        deletevehiclebyid(id).then(() => {
          showSuccessAlert("Car Has Been Deleted");
          setcar((prev) => prev.filter((p) => p.sellarcarid !== id));
        });
      }
    });
  };
  return (
    <>
      <Box
        sx={{
          p: 2,
          width: "82%",
          bgcolor: "rebeccapurple",
          mt: 2,
          background: "linear-gradient(180deg, #0B1220 0%, #0E1A2B 100%)",
          color: "#FFFFFF",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" color="white">
            My Vehicle
          </Typography>

          <Button
            sx={{
              color: "white",
              "&:hover": {
                color: "#f5c46b",
                transition: "all 0.3s ease",
                border: "1px solid #f5c46b",
              },
              border: "1px solid white",
              borderRadius: 2,
              mr: 2,
            }}
            endIcon={<AddIcon />}
            onClick={() => {
              navigate("/addcar");
            }}
          >
            Add Vehicle
          </Button>
        </Box>

        {/* tables */}

        <TableContainer
          sx={{
            mt: 4,
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  background:
                    "linear-gradient(180deg, #101a2c 0%, #0c1424 100%)",
                  "& th": {
                    color: "#cfd6e4",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    borderBottom: "1px solid rgba(255,255,255,0.08)",
                  },
                }}
              >
                <TableCell>Photo</TableCell>
                <TableCell>Vehicle</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Fuel</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sdetail.map((t, id) => (
                <TableRow
                  key={id}
                  sx={{
                    "& td": {
                      color: "white", //  BODY TEXT COLOR
                      borderBottom: "1px solid rgba(255,255,255,0.08)",
                    },
                    "&:hover": {
                      background: "rgba(255,255,255,0.04)",
                    },
                  }}
                >
                  <TableCell>
                    <Box
                      component="img"
                      src={
                        t.photo ?
                          `${API}/images/${t.photo}`
                        : "/images/bmw.avif"
                      }
                      alt="Vehicle"
                      sx={{
                        width: 90,
                        height: 60,
                        borderRa1dius: 1,
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/bmw.avif";
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    {t.name}
                    <br />
                    {t.model}
                  </TableCell>

                  <TableCell>₹{t.price}</TableCell>
                  <TableCell>{t.fuel}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        navigate(`/edit/${t.sellarcarid}`);
                      }}
                      sx={{
                        color: "white",
                      }}
                      startIcon={
                        <EditIcon
                          sx={{
                            color: "blue",
                          }}
                        />
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      sx={{
                        color: "white",
                      }}
                      startIcon={
                        <DeleteIcon
                          sx={{
                            color: "red",
                          }}
                        />
                      }
                      onClick={() => {
                        handldelete(t.sellarcarid);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
