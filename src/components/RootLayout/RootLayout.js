import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import Contactus from '../ContactUs/Contactus'
import './RootLayout.css'
// import Distance from './Distance'
// import Map from './Map'
// import OrderPage from './Order/OrderPage'
function RootLayout() {

  return (
    <div>
      <Navbar/>
      <Outlet />
      <Contactus/>
       <div>
       <Footer/>
       </div>
       {/* <Distance/> */}
      {/* <Map/> */}
      {/* <OrderPage/> */}
    </div>
  )
}
export default RootLayout

