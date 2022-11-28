import React, { useEffect, useState } from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Main from './componet/Main/Main';
import Error from './componet/Error/Error';
import Register from './componet/Register/Register';
import Home from './componet/Home/Home';
import Login from './componet/Login/Login';
import Movies from './componet/Movies/Movies';
import Show from './componet/Show/Show';
import People from './componet/People/People';
import Details from './componet/Detalils/Details';
import PersonDetails from './componet/Person.details/PersonDetails';
import jwtDecode from 'jwt-decode';
import Back from './componet/Back/Back';
import { Offline } from 'react-detect-offline';

export default function App() {

  const [userData, setUserData] = useState(null)
  
  useEffect(() => {
    checkUser()
  }, [])
  


function getInformationUser() 
{
  if(localStorage.getItem("token")!= null )
  {
    let tkn = localStorage.getItem("token")

    setUserData(jwtDecode(tkn))
  }
}

 function deleteUser(){
  localStorage.removeItem("token")
  setUserData(null)

  console.log("hamada");
 }


function checkUser(){


  if(localStorage.getItem("token") != null  && userData == null){
    getInformationUser()
  }
}



function ProtectedRoute(props){


  if (userData == null) {
    return <>
    <Back />
      
    </>
  }

  else {
     return<>
      {props.children}
     </>
  }
}








const router = createBrowserRouter([
  {path:"" , element: <Main userData={userData}  deleteUser={deleteUser}/> , children:[
    {path: "register",element: <Register/>},
    {path: "home", element: <ProtectedRoute><Home/></ProtectedRoute>},
    {path: "movie" , element: <ProtectedRoute><Movies/></ProtectedRoute>},
    {path: "people" , element: <ProtectedRoute><People/></ProtectedRoute>},
    {path: "show" , element: <ProtectedRoute><Show/></ProtectedRoute>},
    {index: true,  element: <Login getInformationUser={getInformationUser}/>},
    {path: "details" , element: <ProtectedRoute><Details /></ProtectedRoute> ,children:[
        {path:":tybe"  ,children:[
          {path: ":id"}
        ]}
    ]},
    {path: "person-details" , element: <ProtectedRoute><PersonDetails/></ProtectedRoute>, children:[
        {path:":id"}
    ]},

  ]},
  {path: "*" , element: <Error />}

])


console.error();

  return (
<>

<Offline>
  <div className='offline p-2 bg-danger border border-white border-3 text-white position-fixed bottom-50'>
    <h2>Opps your internet connecation has been lost </h2>
  </div>
</Offline>
<RouterProvider router={router} />
</>
  )
}
