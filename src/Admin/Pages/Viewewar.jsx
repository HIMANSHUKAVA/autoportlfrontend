import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
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

    <Grid container sx={{m:2}}>
      {
        car.map((c)=>(
          <>
          <Grid item xs={12} md={4}>
            <Card
            sx={{
              width:320,
              minHeight:420,
              height:"auto",
              backgroundColor: "#020617",
              overflow:"hidden",
              borderRadius:2,
              // transform:"translateY(-6px)",
              position:"relative",
              mx:"auto",
              "&:hover":{
                transition:"all 0.3s ease",
                transform:"translateY(-10px) scale(1.02)",
                boxShadow: "0 0 40px rgba(56,189,248,0.35)",
              },
              border: "1px solid rgba(56,189,248,0.2)",


                      color: "#cbd5f5",



            }}

            >
            <CardActionArea>
              <CardMedia component="img" image={c.image_url} />


              <CardContent>
                <Typography variant='h5'>Brand : {c.brand}</Typography>
                <Typography variant='h5'>Model : {c.model}</Typography>
                <Typography variant='h5'>Price : {c.price}</Typography>
                <Typography variant='h5'>Tyep : {c.type}</Typography>
                <Typography variant='h5'>Price range : {c.priceLabel}</Typography>

              </CardContent>
            </CardActionArea>

            <CardActions>
              <Button
              variant='outlined'
              sx={{
                color:"white",
                border:"1px solid green",
                width:"100px",
backgroundImage: "linear-gradient(to right , #ad18ae, #246e66)",
                p:1,
                "&:hover":{
                  color:"yellowgreen",
                  backgroundColor:"red"
                }


              }}
              onClick={(e)=>{
                 e.stopPropagation();
              }}
              >Edit</Button>
              <Button
              sx={{
                backgroundImage: "linear-gradient(to right , #ad18ae, #246e66)",
                width:"100px",
                p:1,
                color:"white"
              }}
              >Delete</Button>
            </CardActions>
            </Card>
          </Grid>
          </>
        ))
      }
    </Grid>







    </>
  )
}
