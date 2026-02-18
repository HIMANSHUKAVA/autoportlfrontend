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
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { showErrorAlert, showSuccessAlert } from "../../Util/Alert";

import {
  buttonstyle,
  selectMenuProps,
  selectstyle,
} from "../commonfiles/common";
export default function OldCarPayment() {
  const [oldcar, setoldcar] = useState([]);
  const API = import.meta.env.VITE_API_BASE_URL;
  const [loadingId, setLoadingId] = useState(null);
  console.log(localStorage.getItem("token"));
  useEffect(() => {
    axios
      .get(`${API}/admin/fetch/oldcar/payment`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);

        setoldcar(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [selectesstatus, setselectesstatus] = useState({});
  const [order, setorder] = useState("asc");

  const handlsort = (column) => {
    const sortedData = [...newcarPayment].sort((a, b) => {
      if (order === "asc") {
        return a[column] > b[column] ? 1 : -1;
      } else {
        return a[column] < b[column] ? 1 : -1;
      }
    });

    setoldcar(sortedData);
    setorder(order === "asc" ? "desc" : "asc");
  };

  const [page, setpage] = useState(0);
  const [rowperpage, setrowperpage] = useState(4);

  const handlpage = (event, newPage) => {
    setpage(newPage);
  };

  const handlrowperpage = (event) => {
    setrowperpage(parseInt(event.target.value, 10));

    setpage(0);
  };

  const [statusFilter, setStatusFilter] = useState("PENDING");

  const handlsendmain = (c) => {
    setLoadingId(c.paymentId);
    console.log(c.paymentId);
    console.log("clicked");
    axios
      .post(`${API}/admin/oldcarremainder/${c.paymentId}`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        showSuccessAlert("Message Sent Successfuly");
      })
      .catch((error) => {
        showErrorAlert("Somthing Went Wrong");
        console.log(error);
      })
      .finally(() => {
        setLoadingId(null);
      });
  };

  const handupdatebutton = (c) => {
    console.log(c.paymentId);
    const id = c.paymentId;
    const selectedStatus =
      selectesstatus[c.paymentId] || (c.status || "PENDING").toUpperCase();
    console.log(selectedStatus);

    axios
      .put(`${API}/admin/update/oldcar/status/${id}`, null, {
        params: {
          status: selectedStatus,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        showSuccessAlert("Status Updated Successfully");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Old Car Payment Section</Typography>
        <Typography variant="body2">
          Handle The Old Car Payment And Update The Deta
        </Typography>
        <hr />
      </Box>
      <Box sx={{ display: "flex", gap: 2, mb: 2, justifyContent: "flex-end" }}>
        <Button
          variant={statusFilter === "PENDING" ? "contained" : "outlined"}
          onClick={() => setStatusFilter("PENDING")}
          sx={{
            bgcolor: statusFilter === "PENDING" ? "#FACC15" : "transparent",
            color: statusFilter === "PENDING" ? "black" : "#FACC15",
            borderColor: "#FACC15",
          }}
        >
          Pending
        </Button>

        <Button
          variant={statusFilter === "RESOLVED" ? "contained" : "outlined"}
          onClick={() => setStatusFilter("RESOLVED")}
          sx={{
            bgcolor: statusFilter === "RESOLVED" ? "#22c55e" : "transparent",
            color: statusFilter === "RESOLVED" ? "white" : "#22c55e",
            borderColor: "#22c55e",
          }}
        >
          Resolved
        </Button>
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                background: "linear-gradient(180deg, #101a2c 0%, #0c1424 100%)",
                "& th": {
                  color: "#cfd6e4",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                  textAlign: "center",
                },
              }}
            >
              <TableCell>paymentid</TableCell>
              <TableCell>carid</TableCell>
              <TableCell>userid</TableCell>
              <TableCell>bookamount</TableCell>
              <TableCell>pendingamount</TableCell>
              <TableCell>totalamount</TableCell>
              <TableCell>status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {oldcar
              .filter(
                (c) => (c.status || "PENDING").toUpperCase() === statusFilter,
              )

              .slice(page * rowperpage, page * rowperpage + rowperpage)
              .map((c) => (
                <>
                  <TableRow
                    key={c.paymentId}
                    sx={{
                      "& td": {
                        color: "white", //  BODY TEXT COLOR
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                        textAlign: "center",
                      },
                      "&:hover": {
                        background: "rgba(255,255,255,0.04)",
                      },
                    }}
                  >
                    <TableCell>
                      <Tooltip
                        arrow
                        placement="right"
                        title={
                          <Box>
                            <Typography variant="subtitle2">
                              PaymentDate :{" "}
                              {new Date(c.create_at).toLocaleString()}
                            </Typography>
                            <Typography variant="body2">
                              Method: {c.paymentMehtod}
                            </Typography>
                            <Typography variant="body2">
                              Order Id: {c.razorpayOrderId}
                            </Typography>
                            <Typography variant="body2">
                              transactionNumber : {c.transection_id}
                            </Typography>
                          </Box>
                        }
                      >
                        <Typography sx={{ cursor: "pointer" }}>
                          {c.paymentId}
                        </Typography>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      <Tooltip
                        arrow
                        placement="right"
                        title={
                          <Box>
                            <Typography variant="subtitle2">
                              Brand : {c.car.brand}
                            </Typography>
                            <Typography variant="body2">
                              Type : {c.car.type}
                            </Typography>
                            <Typography variant="body2">
                              fuel: {c.car.fuel}
                            </Typography>
                            <Typography variant="body2">
                              year : {c.car.year}
                            </Typography>
                          </Box>
                        }
                      >
                        <Typography sx={{ cursor: "pointer" }}>
                          {c.car.id}
                        </Typography>
                      </Tooltip>
                    </TableCell>

                    <TableCell>
                      <Tooltip
                        arrow
                        placement="right"
                        title={
                          <Box>
                            <Typography variant="subtitle2">
                              username : {c.r.username}
                            </Typography>
                            <Typography variant="body2">
                              Email : {c.r.email}
                            </Typography>
                            <Typography variant="body2">
                              role: {c.r.role}
                            </Typography>
                          </Box>
                        }
                      >
                        <Typography sx={{ cursor: "pointer" }}>
                          {c.r.id}
                        </Typography>
                      </Tooltip>
                    </TableCell>

                    <TableCell>{c.paidBookingAmount}</TableCell>
                    <TableCell>{c.pendingAmount}</TableCell>
                    <TableCell>{c.totalAmount}</TableCell>
                    <TableCell>
                      <Select
                        sx={selectstyle}
                        MenuProps={selectMenuProps}
                        value={
                          selectesstatus[c.paymentId] ||
                          (c.status || "PENDING").toUpperCase()
                        }
                        onChange={(e) => {
                          setselectesstatus((prev) => ({
                            ...prev,
                            [c.paymentId]: e.target.value,
                          }));
                        }}
                      >
                        <MenuItem value="PENDING">PENDING</MenuItem>
                        <MenuItem value="RESOLVED">RESOLVED</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        sx={buttonstyle}
                        disabled={loadingId === c.paymentId}
                        onClick={() => handlsendmain(c)}
                      >
                        {loadingId === c.paymentId ? "Sending..." : "Remainder"}
                      </Button>

                      <Button
                        sx={buttonstyle}
                        onClick={() => handupdatebutton(c)}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          count={oldcar.filter((c) => c.status === statusFilter).length}
          page={page}
          onPageChange={handlpage}
          onRowsPerPageChange={handlrowperpage}
          rowsPerPageOptions={[2, 4, 5]}
          sx={{
            color: "#e5e7eb",
            ".MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows":
              {
                color: "#94a3b8",
              },
            ".MuiSvgIcon-root": {
              color: "#facc15",
            },
            ".MuiSelect-select": {
              color: "#facc15",
            },
            background: "linear-gradient(180deg, #020617, #020617)",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        />
      </TableContainer>
    </>
  );
}
