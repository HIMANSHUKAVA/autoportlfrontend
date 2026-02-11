import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useReducer, useState } from 'react'
import Footer from "../../Buyer/Layout/Footer"
export default function AddAdmin() {

  const [admin, setadmin] = useState({
    username :"",
    email :"",
    password :""
  })

  const handlchange = (e)=>{
    setadmin({...admin , [e.target.name] : e.target.value})
  }

    const inputStyle = () => ({
    "& .MuiOutlinedInput-root": {
      color: "#cbd5f5",

      "& fieldset": {
        borderColor:
          "rgba(148,163,184,0.4)", // normal
      },

      "&:hover fieldset": {
        borderColor: "#38bdf8",
      },

      "&.Mui-focused fieldset": {
        borderColor: "#38bdf8",
      },
    },

    "& .MuiInputLabel-root": {
      color: "#94a3b8",
    },

    "& .MuiInputLabel-root.Mui-focused": {
      color:  "#38bdf8",
    },

    mb: 2,
    mt:3,
    width:"90%",
    m:3
  });

  return (
    <>
    <Box
    sx={{
      p:3
    }}
    >
      <Typography variant='h4'>Add New Admin</Typography>
      <Typography variant='body2'>Add New Member</Typography>
      <hr/>
    </Box>

    <Box
    sx={{
      width:{xs:"100%" , md:"100%"},
      border:"1px solid white",
      height:370,
      position:"relative",
      mb:4,
      m:{xs:0 , md:2}
    }}

    >
      <TextField name='username' value={admin.username} label="Enter The Username" onChange={handlchange} sx={inputStyle} fullWidth/>


      <TextField name='email' type='email' value={admin.email} label="Enter The Email" onChange={handlchange} sx={inputStyle} fullWidth/>


      <TextField name='password' type='password' value={admin.password} label="Enter The Password" onChange={handlchange} sx={inputStyle} fullWidth/>


      <Button
      sx={{
            color: "#38BDF8",
            "&:hover": {
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              borderColor: "#38BDF8",
            },
            border: "1px solid #38BDF8",
            borderRadius: 2,
            px: 4,
            ml:4
          }}
      >Add Admin</Button>

    </Box>

    <Footer/>

    </>
  )
}
