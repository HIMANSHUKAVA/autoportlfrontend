import React from 'react'
import Layout from "../simlo/Layout"
import Card2 from "../simlo/Card2"
import { Box } from '@mui/material'
import RequestTable from '../simlo/RequestTable'
import Footer from "../../Buyer/Layout/Footer"
export default function AdminDashboard() {
  return (
    <>
       <Card2/>
       <RequestTable/>
       <Footer/>
    </>
  )
}
