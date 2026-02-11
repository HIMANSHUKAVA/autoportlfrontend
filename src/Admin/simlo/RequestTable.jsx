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
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function RequestTable() {
  const [car, setcar] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/request/view`, {
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
                      src={s.photo}
                      sx={{
                        // width:"60px"/
                        width: 90,
                        height: 60,
                        borderRa1dius: 1,
                        objectFit: "cover",
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
                      value={s.status}
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
