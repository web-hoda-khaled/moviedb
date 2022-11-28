import React from 'react'
import { Link ,useNavigate } from 'react-router-dom'

export default function Navbar({userData , deleteUser}) {


    let navigate  = useNavigate()

  function logout(){
  
    let x = window.confirm("you sure you? wanna logout!")
     if (x) {
      deleteUser()
      navigate("/")
     }
  }



  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-color px-5 py-2 fixed-top ">
  <div className="container-fluid">
    <Link className="navbar-brand" to="">
      <img src="img/logo-dark.png" alt="logo" />
     </ Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">


          

          {userData?<>    
            <li className="nav-item">
          <Link className="nav-link" to="home">Home</ Link>
        </li>
              <li className="nav-item">
          <Link className="nav-link" to="/movie">Movie</ Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/show">Tv Show</ Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/people">People</ Link>
        </li> </> : ""}

      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
      <li className="nav-item me-3">
          <i className='fa-brands fa-facebook-f fa-xl me-3'></i>
          <i className='fa-brands fa-spotify fa-xl me-3'></i>
          <i className='fa-brands fa-instagram fa-xl me-3'></i>
          <i className='fa-brands fa-twitter fa-xl me-3'></i>

        </li>
 {userData?<li className="nav-item">
          <span onClick={logout} className="nav-link logout" to="">Logout</ span>
        </li>:<>      <li className="nav-item">
          <Link className="nav-link" to="/register">Register</ Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link" to="/">Login</ Link>
        </li>
</>}

      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
