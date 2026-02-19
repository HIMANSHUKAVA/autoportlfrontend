import {
  Box,
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function RequestTable() {
  const [car, setcar] = useState([]);

  const API = import.meta.env.VITE_API_BASE_URL;
  const [statusfilter, setstatusfilter] = useState("PENDING");

  useEffect(() => {
    axios
      .get(`${API}/admin/request/view`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((responce) => {
        console.log(responce.data);

        setcar(responce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const sdeta = car.slice(0, 8);

  // VITE_API_BASE_URL
  const API = import.meta.env,
    VITE_API_BASE_URL;

  const handlupdate = (car) => {
    const id = car.id;
    const status = statusfilter[id](car.status || "PENDING").toUpperCase();

    const payload = {
      brand: car.brand,
      model: car.model,
      fuel: car.fuel,
      transmission: car.transmission,
      color: car.colour || car.color,
      km_driven: car.km_driven,
      priceLabel: car.priceLabel,
      priceMin: car.priceMin,
      priceMax: car.priceMax,
      year: car.year,
      type: car.type,
      description: "best car",
      carType: "OLD",
      carcondition: car.carcondition,
      image_url: car.photo,
      status: status,
    };
    if (status === "APPROVED") {
      axios
        .post(`${API}/admin/request/view/singleimages/${id}`, payload, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          showSuccessAlert("Car Status Update Successfully");
          setrequest((prev) => prev.filter((r) => r.sellarcarid !== id));
        });
    } else if (status === "REJECTED") {
      axios
        .delete(`${API}/admin/request/reject/${id}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          showSuccessAlert("Car deleted  Successfully");
          setrequest((prev) => prev.filter((r) => r.sellarcarid !== id));
        })
        .catch((error) => {
          console.log(error);
          showErrorAlert("Approve failed");
        });
    }
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          color: "#FFFFFF",
        }}
      >
        <TableContainer>
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
                <TableCell>Image</TableCell>
                <TableCell>Model</TableCell>
                <TableCell>Transmission</TableCell>
                <TableCell>fuel</TableCell>
                <TableCell>Request_at</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {sdeta.map((s) => (
                <TableRow
                  key={s.id}
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
                        s.photo ?
                          `${API}/images/${s.photo}`
                        : "/images/hyundai.avif"
                      }
                      sx={{
                        // width:"60px"/
                        width: 90,
                        height: 60,
                        borderRadius: 1,
                        objectFit: "cover",
                      }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/images/bmw.avif";
                      }}
                    />
                  </TableCell>
                  <TableCell>{s.model}</TableCell>
                  <TableCell>{s.transmission}</TableCell>
                  <TableCell>{s.fuel}</TableCell>
                  <TableCell>{s.requestAt}</TableCell>
                  <TableCell>{s.price}</TableCell>
                  <TableCell>
                    <Select
                      value={
                        statusfilter[s.id] ?
                          statusfilter[s.id]
                        : (s.status || "PENDING").toUpperCase()
                      }
                      size="small"
                      sx={{
                        color: "#fff",
                        background: "linear-gradient(180deg, #0f172a, #020617)",
                        borderRadius: 1.5,
                        minWidth: 140,
                        ".MuiOutlinedInput-notchedOutline": {
                          borderColor: "rgba(255,255,255,0.25)",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#f5c46b",
                        },
                        "& .MuiSvgIcon-root": {
                          color: "#f5c46b",
                        },
                      }}
                      onChange={(e) => {
                        setstatusfilter((prev) => ({
                          ...prev,
                          [e.id]: e.target.value,
                        }));
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            background:
                              "linear-gradient(180deg, #0f172a, #020617)",
                            color: "#ffffff",
                            borderRadius: 2,
                            boxShadow: "0 12px 30px rgba(0,0,0,0.6)",
                            mt: 1,
                          },
                        },
                      }}
                    >
                      <MenuItem value="PENDING">PENDING</MenuItem>
                      <MenuItem value="APPROVED">APPROVED</MenuItem>
                      <MenuItem value="REJECTED">REJECT</MenuItem>
                    </Select>
                  </TableCell>

                  <TableCell>
                    <Button
                      sx={{
                        border: "1px solid #FACC15",
                        color: "#FACC15",
                      }}
                      onClick={() => handlupdate(s)}
                    >
                      Update Status
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
