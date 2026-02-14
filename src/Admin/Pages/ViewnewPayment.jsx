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
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { showSuccessAlert, showErrorAlert } from "../../Util/Alert";
export default function ViewnewPayment() {
  const [newcarPayment, setnewcarPayment] = useState([]);

  const API = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    axios
      .get(`${API}/admin/car/payment/view`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((responce) => {
        console.log(responce.data);
        setnewcarPayment(responce.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const sendemail = (c) => {
    axios
      .post(`${API}/admin/remainder/payment/${c.paymentId}`, null, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => {
        showSuccessAlert("Message Send Successfully");
      })
      .catch((error) => {
        showErrorAlert("Something Went Wrong Please Try Again Later");
        console.log(error);
      });
  };

 const handlstatus = (c) =>{

  console.log(c.paymentId);
  console.log(c.paymentStatus)


  if(c.paymentStatus == "RESOLVED")
  {
  axios.put(`${API}/admin/car/payment/update/status/${c.paymentId}`,null , {
    params:{
     status : c.paymentStatus
    },
    headers:{
      Authorization : "Bearer " + localStorage.getItem("token")
    }
  }).then(()=>{
    showSuccessAlert("Status Updated Successfully")
  }).catch(()=>{
    showErrorAlert("Faild try Again")
  })
}
 }


  const [order, setorder] = useState("asc");

  const handlsort = (name)=>{
    const sorting =  [...newcarPayment].sort((a,b)=>{
      if(name=="asc"){
        setorder("des")
       return a[name] < b[name] ? -1:1
      }
      else
      {
        setorder("asc")
         return a[name] > b[name] ? -1 : 1;
      }
     })
     setnewcarPayment(sorting)

  }

  const [page, setpage] = useState(0);
  const [rowperpage, setrowperpage] = useState(5);

  const handlpage = (e)=>{
    setpage(e.target.value)
  }

  const handlrowperpage = (e)=>{
   setrowperpage(e.target.value);
    setpage(0);
  }
  const [statusFilter, setStatusFilter] = useState("PENDING");


  return (
    <>
      <Box
        sx={{
          p: 4,
        }}
      >
        <Typography variant="h4">New Payment Section</Typography>
        <Typography variant="body2">View Payment And Check History</Typography>
        <hr />
      </Box>
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
              <TableCell onClick={()=>{handlsort("paymentId")}}>
                Payment <br /> Id
              </TableCell>
              <TableCell onClick={()=>{handlsort("carid")}}>Car_id</TableCell>
              <TableCell onClick={()=>{handlsort("userid")}}>
                User <br /> Id
              </TableCell>

              <TableCell onClick={()=>{handlsort("totalamount")}}>Total Amount</TableCell>
              <TableCell onClick={()=>{handlsort("paidBookingAmount")}}>Booking Amount</TableCell>
              <TableCell>Payment Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {newcarPayment

            .filter(c => c.paymentStatus === statusFilter)
            .map((c) => (
              <>
                <TableRow
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
                  key={c.paymentId}
                >
                  <TableCell>
                    <Tooltip
                      arrow
                      placement="right"
                      title={
                        <Box>
                          <Typography variant="subtitle2">
                            PaymentDate :{" "}
                            {new Date(c.paymentAt).toLocaleString()}
                          </Typography>
                          <Typography variant="body2">
                            Method: {c.paymentMethod}
                          </Typography>
                          <Typography variant="body2">
                            Order Id: {c.razorpayOrderId}
                          </Typography>
                          <Typography variant="body2">
                            transactionNumber : {c.transactionNumber}
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
                        <Box sx={{ p: 1 }}>
                          <Typography variant="subtitle2">
                            🚗 {c.car.brand}
                          </Typography>
                          <Typography variant="body2">
                            Model: {c.car.model}
                          </Typography>
                          <Typography variant="body2">
                            Type: {c.car.type}
                          </Typography>
                          <Typography variant="body2">
                            Price: ₹{c.car.price.toLocaleString()}
                          </Typography>
                        </Box>
                      }
                    >
                      <Typography
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        {c.car.id}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Tooltip
                      arrow
                      placement="right-end"
                      title={
                        <Box>
                          <Typography variant="subtitle2">
                            Name: {c.r.username}
                          </Typography>
                          <Typography variant="body2">
                            Email: {c.r.email}
                          </Typography>
                          <Typography variant="body2">
                            Role : {c.r.role}
                          </Typography>
                        </Box>
                      }
                    >
                      <Typography
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        {c.r.id}
                      </Typography>
                    </Tooltip>
                  </TableCell>
                  <TableCell>{c.car.price}</TableCell>
                  <TableCell>{c.paidBookingAmount}</TableCell>
                  <TableCell>{c.pendingAmount}</TableCell>
                  {/* <TableCell>{c.transactionNumber}</TableCell> */}
                  <TableCell sx={{ maxWidth: 120 }}>
                    {
                      c.paymentStatus !== "RESOLVED" ? (
                        <>
                        <Select
                          value={(c.paymentStatus || "PENDING").toUpperCase()}
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
                            const updated = newcarPayment.map((r) =>
                              r.paymentId === c.paymentId ?
                                { ...r, paymentStatus: e.target.value }
                              : r,
                            );
                            setnewcarPayment(updated);
                          }}
                        >
                          <MenuItem value="PENDING">Pendig</MenuItem>
                          <MenuItem value="RESOLVED">RESOLVED</MenuItem>
                        </Select>

                        </>
                      ) : (
                        <Typography variant="h5">{c.paymentStatus}</Typography>
                      )
                    }


                  </TableCell>
                  <TableCell>
                    {
                      c.paymentStatus !== "RESOLVED" ? (
                       <>
                        <Button
                      size="small"
                      sx={{
                        px: 3,
                        py: 0.8,
                        m: 1,
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "999px",
                        color: "#0f172a",
                        background: "linear-gradient(135deg, #f5c46b, #eab308)",
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
                      onClick={()=>{
                        handlstatus(c)
                      }}
                    >
                      Update
                    </Button>

                       </>
                      ):(
                        <>
                        <Typography variant="h5">{c.paymentStatus}</Typography>
                        </>
                      )
                    }

                    <Button
                      size="small"
                      sx={{
                        px: 3,
                        py: 0.8,
                        textTransform: "none",
                        fontWeight: 600,
                        borderRadius: "999px",
                        color: "#0f172a",
                        background: "linear-gradient(135deg, #f5c46b, #eab308)",
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
                        sendemail(c);
                      }}
                    >
                      {/* Mony Order */}
                      Request Payment
                    </Button>
                  </TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
