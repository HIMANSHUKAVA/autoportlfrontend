import { Box, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ViewNewCar() {


  const API = import.meta.env.VITE_API_BASE_URL
  const [car, setcar] = useState([])
  useEffect(() => {
    axios.get(`${API}/admin/view/anewcar`,{
     headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },

    }).then((response)=>{
      console.log(response.data);
      setcar(response.data)

    }).catch((error)=>{
      console.log(error);

    })
  }, [])

  return (
    <>
    <Box sx={{p:3}}>
      <Typography variant='h4'>View New Cars</Typography>
      <Typography variant='body2'>Explore New Cars</Typography>
      <hr/>
    </Box>

    {
       car.map((c)=>(
        <>

        <Typography variant='h3' color='white'>{c.brand}</Typography>
        </>
       ))
    }







    </>
  )
}
