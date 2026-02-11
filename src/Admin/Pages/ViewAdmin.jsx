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
import React, { useEffect, useState } from "react";

export default function ViewAdmin() {
  const [admin, setadmin] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/viewadmin`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((Response) => {
        console.log(Response.data);

        setadmin(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">View Admins</Typography>
        <Typography variant="body2">
          View all team member to Access this portal
        </Typography>
        <hr />
      </Box>

      <Box>
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
                <TableCell>Id</TableCell>
                <TableCell>USERNAME</TableCell>
                <TableCell>EMAIL</TableCell>
                <TableCell>PASSWORD</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {admin.map((a) => {
                return (
                  <TableRow
                    key={a.id}
                    sx={{
                      "& td": {
                        color: "white",
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                      },
                      "&:hover": {
                        background: "rgba(255,255,255,0.04)",
                      },
                    }}
                  >
                    <TableCell>{a.id}</TableCell>
                    <TableCell>{a.username}</TableCell>
                    <TableCell>{a.email}</TableCell>
                    <TableCell>{a.password}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        sx={{
                          border: "1px solid red",
                          color: "red",
                          borderColor: "red",

                          "&:hover": {
                            border: "1px solid red",
                            color: "red",
                            borderColor: "red",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
