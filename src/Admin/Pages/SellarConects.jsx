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

export default function SellarConects() {
  console.log("Component Loaded");

  const [Sellar, setSellar] = useState([]);

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API}/admin/sellar/contects`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((Response) => {
        console.log(Response.data);
        setSellar(Response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // order state
  const [order, setorder] = useState("asc");

  const handlorder = (name) => {
    const sorting = [...Sellar].sort((a, b) => {
      if (order === "asc") {
        return a[name] > b[name] ? 1 : -1;
      } else {
        return a[name] < b[name] ? 1 : -1;
      }
    });

    setSellar(sorting);
    setorder(order == "asc" ? "des" : "asc");
  };

  const [statusfilter, setstatusfilter] = useState("PENDING");
  const [filter, setfilter] = useState("");

  const [page, setpage] = useState(0);
  const [rowperpage, setrowperpage] = useState(4);

  const handlpage = (e, newpage) => {
    setpage(newpage);
  };

  const handlrowchage = (event, row) => {
    setrowperpage(parseInt(event.target.value, 10));

    setpage(0);
  };

  const handlupdate = (c) => {
  const id = c.id;

  const status = selectedStatus[id];   // IMPORTANT FIX
  const message = c.resolve || "Resolved by admin";

  if (!status) {
    showErrorAlert("Please select status first");
    return;
  }

  if (status === "RESOLVED") {
    axios
      .put(`${API}/admin/sellarcontect/status/${id}`, null, {
        params: {
          status: status,
          message: message,
        },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("SUCCESS:", res);
        showSuccessAlert("Status Updated Successfully");

        //  Update UI manually instead of refetch
        const updated = Sellar.map((r) =>
          r.id === id ? { ...r, status: status } : r
        );

        setSellar(updated);
        setSelectedStatus({});
      })
      .catch((err) => {
        console.log("ERROR:", err);
        showErrorAlert("Failed");
      });
  }
};

  const [selectedStatus, setSelectedStatus] = useState({});

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Quary From Sellar</Typography>
        <Typography variant="body2">
          Please View And Solve This Quary
        </Typography>
        <hr />
      </Box>
      <TextField
        value={filter}
        placeholder="Serch Here....."
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

      <Box sx={{ display: "flex", gap: 2, mb: 2, justifyContent: "flex-end" }}>
        <Button
          variant={statusfilter === "PENDING" ? "contained" : "outlined"}
          onClick={() => setstatusfilter("PENDING")}
          sx={{
            bgcolor: statusfilter === "PENDING" ? "#FACC15" : "transparent",
            color: statusfilter === "PENDING" ? "black" : "#FACC15",
            borderColor: "#FACC15",
          }}
        >
          Pending
        </Button>

        <Button
          variant={statusfilter === "RESOLVED" ? "contained" : "outlined"}
          onClick={() => setstatusfilter("RESOLVED")}
          sx={{
            bgcolor: statusfilter === "RESOLVED" ? "#22c55e" : "transparent",
            color: statusfilter === "RESOLVED" ? "white" : "#22c55e",
            borderColor: "#22c55e",
          }}
        >
          Resolved
        </Button>
      </Box>

      <TableContainer sx={{ m: 2 }}>
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
                },
              }}
            >
              <TableCell
                onClick={() => {
                  handlorder("id");
                }}
              >
                Id
              </TableCell>
              <TableCell
                onClick={() => {
                  handlorder("email");
                }}
              >
                Email
              </TableCell>
              <TableCell
                onClick={() => {
                  handlorder("message");
                }}
              >
                Message
              </TableCell>
              <TableCell
                onClick={() => {
                  handlorder("replay");
                }}
              >
                Replay
              </TableCell>
              <TableCell>status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {Sellar.filter((c) => {
              const search = filter.toLowerCase();

              return (
                String(c.id).includes(search) ||
                c.email?.toLowerCase().includes(search) ||
                c.message?.toLowerCase().includes(search) ||
                c.resolve?.toLowerCase().includes(search)
              );
            })

              .filter((c) => c.status === statusfilter)
              .slice(page * rowperpage, page * rowperpage + rowperpage)
              .map((c) => (
                <>
                  <TableRow
                    key={c.id}
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
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.message}</TableCell>
                    <TableCell>
                      <TextField
                        multiline
                        rows={3}
                        placeholder="Enter admin message..."
                        sx={{
                          background: "#020617",
                          borderRadius: 1,
                          "& textarea": { color: "#fff" },
                          "& fieldset": {
                            borderColor: "rgba(255,255,255,0.3)",
                          },
                          "&:hover fieldset": {
                            borderColor: "#facc15",
                          },
                          "& .Mui-focused fieldset": {
                            borderColor: "#facc15",
                          },
                        }}
                        onChange={(e) => {
                          const updated = Sellar.map((r) =>
                            r.id === c.id ?
                              { ...r, resolve: e.target.value }
                            : r,
                          );
                          setSellar(updated);
                        }}
                      />
                    </TableCell>

                    <TableCell>
                      {c.status !== "RESOLVED" ?
                        <>
                          <Select
                            value={selectedStatus[c.id] || c.status || "PENDING"}
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
                              setSelectedStatus({
                                ...selectedStatus,
                                [c.id]: e.target.value,
                              });
                            }}
                          >
                            <MenuItem value="PENDING">Pendig</MenuItem>
                            <MenuItem value="RESOLVED">RESOLVED</MenuItem>
                          </Select>
                        </>
                      : <>
                          <Typography variant="body2">{c.status}</Typography>
                        </>
                      }
                    </TableCell>
                    <TableCell>
                      {c.status !== "RESOLVED" ?
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
                              handlupdate(c);
                            }}
                          >
                            Update
                          </Button>
                        </>
                      : <Typography variant="body2">{c.status}</Typography>}
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
          <TablePagination
            count={Sellar.filter((c) => c.status === statusfilter).length}
            page={page}
            onPageChange={handlpage}
            onRowsPerPageChange={handlrowchage}
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
        </Box>
      </TableContainer>

      <Footer />
    </>
  );
}
