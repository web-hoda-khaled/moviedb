
import React, { useState } from 'react'
import  Joi from 'joi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Login({getInformationUser}) {


 const navigate = useNavigate()
 const [joiError, setJoiError] = useState(null)
 const [apiMassage, setApiMassage] = useState("")
  const [user, setuser] = useState({
   email:"",
   password:"",
  })

const [isLoding, setisLoding] = useState(false)






  //get input value 
  function getUserToLogin (e){
    setJoiError(null)
   let inputValue = e.target.value;
   let newProperty = e.target.id
   let newUser = {...user}
   newUser[newProperty] = inputValue
   setuser(newUser)
  }







  //add event on form 
  function sumbitForm(e){
   e.preventDefault()
   setisLoding(true)
   //add validation 
   const schema = Joi.object(
    {
     email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
     password:Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    }
   )

   //test valid 
   let joiResponse = schema.validate(user , {abortEarly : false})





  if (joiResponse.error == undefined) {
   loginUser()
  }
  else{
   setisLoding(false)

   setJoiError(joiResponse.error.details)

  }


  }
  




  //fetch api
  async function loginUser(){
   const {data}= await axios.post("https://route-egypt-api.herokuapp.com/signin" , user);
   setisLoding(false)

   
  if(data.message == "success"){
    localStorage.setItem("token" , data.token)
    getInformationUser()
    navigate("/home")
  }

  else{
   setApiMassage(data.message)

   console.log(apiMassage);

  }

  }



  function getErrorMassegEromJoi(label)
  {
    if(joiError != null){
  
      for (let i = 0; i < joiError.length; i++) {
  
        if(joiError[i].context.label == label)
        {
          return joiError[i].message
        }
        
        
      }
  
      return ""
    }
  }
  


 return (
  <>
    <div className='vh-100 bg-color '>
    <Helmet>
        <title> Login </title>
    </Helmet>
    <div className='m-auto w-50 py-5'> 
    


    <h1 className='text-capitalize  py-4'>Login form</h1>
    <form onSubmit={sumbitForm}>
      <label  htmlFor="email">Email :</label>
      <input onChange={getUserToLogin}  type="email" id='email' className='form-control  mb-3 mt-2' />
  

      {getErrorMassegEromJoi("email")?<div  className="alert alert-danger p-1 text-dark" role="alert">{getErrorMassegEromJoi("email")}</div>: ""}

      <label  htmlFor="password">Password :</label>
      <input onChange={getUserToLogin}  type="password" id='password' className='form-control  mb-3 mt-2' />
     



      {getErrorMassegEromJoi("password")?<div  className="alert alert-danger p-1 text-dark" role="alert"> your password not valid</div>: ""}


    {/* api massage */}
    {apiMassage.length == 0 ? "" :  <div className="alert alert-danger p-1 text-dark" role="alert">
      {apiMassage}
      </div>}

      <button type='submit' className='btn btn-outline-info mb-3 mt-2 me-auto'> {isLoding == false? "Login": <i className="fa-solid fa-spinner fa-spin"></i>}</button>
    </form>
    </div>
    </div>
  </>
)
}
