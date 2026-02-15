import { Box, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SellarConects() {

  console.log("Component Loaded");

const [Sellar, setSellar] = useState([]);

const API = import.meta.env.VITE_API_BASE_URL;

useEffect(() => {

  axios.get(`${API}/admin/sellar/contects`,{
  headers:{
    Authorization: "Bearer " + localStorage.getItem("token")
  }
}).then((Response)=>{
  console.log(Response.data)
  setSellar(Response.data)
}).catch((error)=>{
  console.log(error);

})

}, [])


  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Quary From Sellar</Typography>
        <Typography variant="body2">
          Please View And Solve This Quary
        </Typography>
        <hr/>
      </Box>

        {
          Sellar.map((c)=>{
            return (
<>
   <Typography variant="h4" sx={{color:"white"}}>{c.email}</Typography>
</>
            )
          })
        }
    </>
  );
}
