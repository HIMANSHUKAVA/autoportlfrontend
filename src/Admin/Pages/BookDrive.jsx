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
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { showSuccessAlert, showErrorAlert } from "../../Util/Alert";
import Footer from "../../Buyer/Layout/Footer"
export default function BookDrive() {
  const [booking, setbooking] = useState([]);
  const [statusFilter, setStatusFilter] = useState("PENDING");
  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/booking/view`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
        setbooking(response.data);
      });
  }, []);

  const Handlupdatestatus = (b) => {
    const id = b.book_id;
    const status = b.status;

    if (status === "APPROVED") {
      axios
        .put(
          `http://localhost:3000/admin/request/drivestatus/${id}?status=${status}`,
          null,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          },
        )
        .then((response) => {
          showSuccessAlert(`Status ${status} Successfully`);
          //  setbooking(prev => prev.filter(b => b.book_id !== id));
        })
        .catch((error) => {
          console.log(error);
          showErrorAlert("Somethng Went Wrong");
        });
    } else if (status === "REJECTED") {
      axios
        .delete(`http://localhost:3000/admin/booking/${id}`, {
          headers: {
            // Authorization: " Bearer" + localStorage.getItem("token")
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          showSuccessAlert(`Booking ${status} successfully`);
          setbooking((prev) => prev.filter((b) => b.book_id !== id));
        })
        .catch((err) => {
          console.log(err);
          showErrorAlert("Something Went Wrong");
        });
    }
  };

  //  filter state
  const [filter, setfilter] = useState("");

  // sorting
  const [order, setorder] = useState("asc");

  const handlsort = (name) => {
    const sorting = [...booking].sort((a, b) => {
      if (order == "asc") {
        return a[name] < b[name] ? -1 : 1;
      } else {
        return a[name] > b[name] ? 1 : -1;
      }
    });
    setbooking(sorting);
    setorder(order === "asc" ? "desc" : "asc");
  };

  const [page, setpage] = useState(0);
  const [row, setrow] = useState(5)
  const handlepage = (e, newpage) => {
    setpage(newpage);
  };

  const handlechange = (e) => {
    setrow(e.target.value);

    setpage(0);
  };
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Book Drive Request From New Car</Typography>
        <Typography variant="body2">Please View And Update status</Typography>
        <hr />
      </Box>

      <Box>
        <TextField
          value={filter}
          onChange={(e) => {
            setfilter(e.target.value);
          }}
          label="Serch"
          InputLabelProps={{
            shrink: true,
            sx: { color: "#94a3b8" },
          }}
          InputProps={{
            sx: { color: "#cbd5f5" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "rgba(148,163,184,0.4)",
              },
              "&:hover fieldset": {
                borderColor: "#38bdf8",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#38bdf8",
              },
            },
            mb: 2,
          }}
          fullWidth
        />
        <Box
          sx={{ display: "flex", gap: 2, mb: 2, justifyContent: "flex-end" }}
        >
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
            variant={statusFilter === "APPROVED" ? "contained" : "outlined"}
            onClick={() => setStatusFilter("APPROVED")}
            sx={{
              bgcolor: statusFilter === "APPROVED" ? "#22c55e" : "transparent",
              color: statusFilter === "APPROVED" ? "white" : "#22c55e",
              borderColor: "#22c55e",
            }}
          >
            Approved
          </Button>
        </Box>
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
                <TableCell onClick={() => handlsort("book_id")}>
                  Booking_id
                </TableCell>
                <TableCell onClick={() => handlsort("date")}>
                  DriveDate
                </TableCell>
                <TableCell onClick={() => handlsort("brand")}>Brand</TableCell>
                <TableCell onClick={() => handlsort("email")}>
                  User_email
                </TableCell>
                <TableCell onClick={() => handlsort("city")}>City</TableCell>

                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {booking

                .filter(
                  (row) =>
                    (row.status || "PENDING").toUpperCase().trim() ===
                    statusFilter.toUpperCase().trim(),
                )

                .filter(
                  (row) =>
                    row.book_id?.toString().includes(filter) ||
                    row.date
                      ?.toString()
                      .toLowerCase()
                      .includes(filter.toLowerCase()) ||
                    row.brand?.toLowerCase().includes(filter.toLowerCase()) ||
                    row.email?.toLowerCase().includes(filter.toLowerCase()) ||
                    row.city?.toLowerCase().includes(filter.toLowerCase()),
                )
                .slice(page*row , page*row+row)


                .map((c) => (
                  <TableRow
                    key={c.book_id}
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
                    <TableCell>{c.book_id}</TableCell>
                    <TableCell>{c.date}</TableCell>
                    {/* <TableCell>{c.date}</TableCell> */}
                    <TableCell>{c.car.brand}</TableCell>
                    <TableCell>{c.r.email}</TableCell>
                    <TableCell>{c.city}</TableCell>
                    <TableCell>
                      {c.status !== "APPROVED" ?
                        <>
                          <Select
                            value={(c.status || "PENDING").toUpperCase()}
                            size="small"
                            sx={{
                              color: "#fff",
                              background:
                                "linear-gradient(180deg, #0f172a, #020617)",
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
                            onChange={(e) => {
                              const update = booking.map((r) =>
                                r.book_id === c.book_id ?
                                  {
                                    ...r,
                                    status: e.target.value,
                                  }
                                : r,
                              );
                              setbooking(update);
                            }}
                          >
                            <MenuItem value="PENDING">Pendig</MenuItem>
                            <MenuItem value="APPROVED">Approved</MenuItem>
                            <MenuItem value="REJECTED">Rejected</MenuItem>
                          </Select>
                        </>
                      : <>{c.status}</>}
                    </TableCell>

                    <TableCell>
                      {c.status !== "APPROVED" ?
                        <>
                          <Button
                            size="small"
                            sx={{
                              px: 3,
                              py: 0.8,
                              textTransform: "none",
                              fontWeight: 600,
                              borderRadius: "999px",
                              color: "#0f172a",
                              background:
                                "linear-gradient(135deg, #f5c46b, #eab308)",
                              boxShadow: "0 6px 18px rgba(245,196,107,0.35)",
                              transition: "all 0.25s ease",

                              "&:hover": {
                                background:
                                  "linear-gradient(135deg, #facc15, #f59e0b)",
                                boxShadow: "0 10px 26px rgba(245,196,107,0.55)",
                                transform: "translateY(-1px)",
                              },

                              "&:active": {
                                transform: "scale(0.96)",
                              },

                              "&.Mui-disabled": {
                                background: "rgba(255,255,255,0.15)",
                                color: "rgba(255,255,255,0.4)",
                                boxShadow: "none",
                              },
                            }}
                            onClick={() => {
                              Handlupdatestatus(c);
                            }}
                          >
                            Update
                          </Button>
                        </>
                      : <>{c.status}</>}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            count={booking.length}
            page={page}
            onPageChange={handlepage}
            onRowsPerPageChange={handlechange}
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

      </Box>

      <Footer/>
    </>
  );
}
