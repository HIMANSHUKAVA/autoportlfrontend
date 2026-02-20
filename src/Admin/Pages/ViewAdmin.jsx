import { Api } from "@mui/icons-material";
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
import { showErrorAlert, showSuccessAlert } from "../../Util/Alert";

export default function ViewAdmin() {
  const [admin, setadmin] = useState([]);
  const API = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    axios
      .get(`${API}/admin/viewadmin`, {
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

  const handldeletedeta = (a) => {
    const id = a.id;

    axios
      .delete(`${Api}/deleteadminfromid/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        showSuccessAlert("Delete Successfully");
      })
      .catch((e) => {
        console.log(e);
        showErrorAlert("something Went Wrong Please Try Again Latter");
      });
  };
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
                        onClick={() => {
                          handldeletedeta(a);
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
