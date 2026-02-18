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

  const handlsendmain = (c) => {
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
  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Old Car Payment Section</Typography>
        <Typography variant="body2">
          Handle The Old Car Payment And Update The Deta
        </Typography>
        <hr />
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
            {oldcar.map((c) => (
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

                    <Button sx={buttonstyle}>Update</Button>
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
