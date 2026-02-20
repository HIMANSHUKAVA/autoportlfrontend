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
import { useEffect, useState } from "react";
import Footer from "../../Buyer/Layout/Footer";
import { showErrorAlert, showSuccessAlert } from "../../Util/Alert";
export default function CarrequestView() {
  const [request, setrequest] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  const API = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    axios
      .get(`${API}/admin/view/r`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((Response) => {
        console.log(Response.data);

        setrequest(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  // /request/add/oldcar
  const handlupdatestatus = (car) => {
    const status = selectedStatus[car.sellarcarid];
    const id = car.sellarcarid;

    console.log("button clicked");
    console.log(status);
    console.log(id);

    if (status === "APPROVED") {
      axios
        .post(`${API}/admin/request/view/singleimages/${id}`, null, {
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
  // filter
  const [filter, setfilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("PENDING");

  // sorting
  const [order, setorder] = useState("asc");

  const handlsort = (name) => {
    const sorting = [...request].sort((a, b) => {
      if (order === "asc") {
        return a[name] < b[name] ? -1 : 1;
      } else {
        return a[name] > b[name] ? -1 : 1;
      }
    });

    setrequest(sorting);
  };

  const [page, setpage] = useState(0);
  const [rowperpage, setrowperpage] = useState(4);

  const handlepage = (e, newpage) => {
    setpage(newpage);
  };

  const handlechange = (e) => {
    setrowperpage(e.target.value);
    setpage(0);
  };

  return (
    <>
      <Box
        sx={{
          p: 3,
        }}
      >
        <Typography variant="h4">Car Request By Sellar</Typography>
        <Typography variant="body2">Cheack And Update Car Status</Typography>
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
                <TableCell>IMAGE</TableCell>
                <TableCell onClick={() => handlsort("brand")}>BRAND</TableCell>
                <TableCell onClick={() => handlsort("model")}>MODEL</TableCell>
                <TableCell onClick={() => handlsort("price")}>PRICE</TableCell>
                <TableCell>PRICERANGE</TableCell>
                {/* <TableCell>CREATE AT</TableCell> */}
                <TableCell onClick={() => handlsort("condition")}>
                  CONDITION
                </TableCell>
                <TableCell>STATUS</TableCell>
                <TableCell>ACTION</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {request
                .filter((row) => row.status === statusFilter)
                .filter(
                  (row) =>
                    row.brand?.toLowerCase().includes(filter.toLowerCase()) ||
                    row.model?.toLowerCase().includes(filter.toLowerCase()) ||
                    row.price?.toString().includes(filter) ||
                    row.carcondition
                      ?.toLowerCase()
                      .includes(filter.toLowerCase()),
                )
                .slice(page * rowperpage, page * rowperpage + rowperpage)
                .map((car) => (
                  <TableRow
                    key={car.sellarcarid}
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
                          car.photo ?
                            `${API}/images/${car.image_url}`
                          : "/images/kia-ev9.jpg"
                        }
                        sx={{
                          // width:"60px"/
                          width: 90,
                          height: 60,
                          borderRa1dius: 1,
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                        }}
                      />
                    </TableCell>
                    <TableCell>{car.brand}</TableCell>
                    <TableCell>{car.model}</TableCell>
                    <TableCell>{car.price}</TableCell>
                    <TableCell>{car.priceLabel}</TableCell>
                    {/* <TableCell>{car.requestAt}</TableCell> */}
                    <TableCell>{car.carcondition}</TableCell>
                    <TableCell>
                      {car.status !== "PENDING" ?
                        <>{car.status}</>
                      : <>
                          <Select
                            value={
                              selectedStatus[car.sellarcarid] || car.status
                            }
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
                              setSelectedStatus((prev) => ({
                                ...prev,
                                [car.sellarcarid]: e.target.value,
                              }));
                            }}
                          >
                            <MenuItem value="PENDING">PENDING</MenuItem>
                            <MenuItem value="APPROVED">APPROVED</MenuItem>
                            <MenuItem value="REJECTED">REJECT</MenuItem>
                          </Select>
                        </>
                      }
                    </TableCell>
                    <TableCell>
                      {car.status !== "PENDING" ?
                        <>
                          <Typography variant="body2">Approved</Typography>
                        </>
                      : <>
                          <Button
                            sx={{
                              border: "1px solid #FACC15",
                              color: "#FACC15",
                            }}
                            onClick={() => {
                              handlupdatestatus(car);
                            }}
                          >
                            Update Status
                          </Button>
                        </>
                      }
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <TablePagination
            count={request.length}
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

      <Footer />
    </>
  );
}
