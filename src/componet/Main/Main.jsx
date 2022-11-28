import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Main({userData , deleteUser}) {
  return (
    <>
    <Navbar userData={userData} deleteUser={deleteUser}/>
    <Outlet/>
    
   
    </>

  )
}
