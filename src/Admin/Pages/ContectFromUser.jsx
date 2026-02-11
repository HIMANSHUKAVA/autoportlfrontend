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
import { showErrorAlert, showSuccessAlert } from "../../Util/Alert";
import Footer from "../../Buyer/Layout/Footer"
export default function ContectFromUser() {
  const [contect, setcontect] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/admin/contect/view`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);

        setcontect(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const Handlupdatestatus = (c) => {
    const status = c.status;
    const message = c.resolve;
    const id = c.id;

    if (status == "RESOLVED") {
      axios
        .put(`http://localhost:3000/admin/contect/update/${id}`, null, {
          params: { status, message },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => {
          showSuccessAlert("Quary Solved");
        })
        .catch((e) => {
          console.log(e);
          showErrorAlert("Something Went Wrong");
        });
    }
  };

  const [filter, setfilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("PENDING");

  // sorting
  const [order, setorder] = useState("asc");

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
          p: 4,
        }}
      >
        <Typography variant="h4">Quary From buyer</Typography>
        <Typography variant="body2">
          Please View And Solve This Quary
        </Typography>
        <hr />
      </Box>
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
      <TableContainer sx={{mb:3}}>
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
              {/* <TableCell>contect_at</TableCell> */}
              <TableCell>email</TableCell>
              <TableCell>subject</TableCell>
              <TableCell>message</TableCell>
              <TableCell>reolvemessage</TableCell>

              <TableCell>status</TableCell>

              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contect
              .filter(
                (row) =>
                  (row.status || "PENDING").toUpperCase().trim() ===
                  statusFilter.toUpperCase().trim(),
              )
              .filter((row) => {
                const search = filter.toLowerCase();

                return (
                  row.email?.toLowerCase().includes(search) ||
                  row.subject?.toLowerCase().includes(search) ||
                  row.message?.toLowerCase().includes(search) ||
                  row.resolve?.toLowerCase().includes(search)
                );
              })

              .slice(page * rowperpage, page * rowperpage + rowperpage)
              .map((c) => (
                <TableRow
                  key={c.id}
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
                  <TableCell
                    sx={{
                      maxWidth: 180,
                      width: 180,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "white",
                    }}
                    title={c.email}
                  >
                    {c.email}
                  </TableCell>
                  <TableCell>{c.subject}</TableCell>
                  <TableCell>{c.message}</TableCell>
                  <TableCell sx={{ minWidth: 250 }}>
                    {!c.resolve || c.resolve.trim() === "" ?
                      <TextField
                        multiline
                        rows={3}
                        placeholder="Enter admin message..."
                        value={c.resolve || ""}
                        onChange={(e) => {
                          const updated = contect.map((r) =>
                            r.id === c.id ?
                              { ...r, resolve: e.target.value }
                            : r,
                          );
                          setcontect(updated);
                        }}
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
                      />
                    : <Typography
                        sx={{ color: "#e5e7eb", whiteSpace: "pre-wrap" }}
                      >
                        {c.resolve}
                      </Typography>
                    }
                  </TableCell>

                  <TableCell sx={{ maxWidth: 120 }}>
                    {
                      c.status !== "RESOLVED" ? (
                        <>
                         <Select
                      value={(c.status || "PENDING").toUpperCase()}
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
                      onChange={(e) => {
                        const update = contect.map((r) =>
                          r.id === c.id ?
                            {
                              ...r,
                              status: e.target.value,
                            }
                          : r,
                        );
                        setcontect(update);
                      }}
                    >
                      <MenuItem value="PENDING">Pendig</MenuItem>
                      <MenuItem value="RESOLVED">RESOLVED</MenuItem>
                    </Select>

                        </>
                      ):(
                        <>
                         {c.status}
                        </>
                      )
                    }

                  </TableCell>

                  <TableCell>
                    {c.status?.toUpperCase().trim() !== "PENDING" ?
                      <>{c.status}</>
                    : <>
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
                    }
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box
        sx={{mt:2 ,
          display:"flex",
          justifyContent:"flex-end"
        }}
        >
        <TablePagination
          count={contect.length}
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
        </Box>
      </TableContainer>

      <Footer/>
    </>
  );
}
