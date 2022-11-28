import React from 'react'
import { Link } from 'react-router-dom'

export default function Back() {
  return (
    <>
      <div className="loading-screen bg-color vh-100  d-flex justify-content-center align-items-center text-center w-100">
         <div className=''>
         <h1 className='text-white mb-4' > May be You are not available in this website</h1>
        <Link to="/" className='btn btn-outline-info text-white' >click here to login </Link>
         </div>
      </div>
    </>
  )
}