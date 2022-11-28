import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Register() {
const navigate = useNavigate()
const [joiMassege, setJoiMassege] = useState(null)
const [apiError, setApiError] = useState("")
const [isLoding, setisLoding] = useState(false)


const [user, setUser] = useState(
  {
    first_name:"",
    last_name:"",
    age: 0 ,   
    email:"",
    password:"",
    
  }
)


function getErrorMassegEromJoi(label)
{
  if(joiMassege != null){

    for (let i = 0; i < joiMassege.length; i++) {

      if(joiMassege[i].context.label == label)
      {
        return joiMassege[i].message
      }
      
      
    }

    return ""
  }
}

// get value from input
function getUser(e){
  setJoiMassege(null)

  let inputValue = e.target.value;
  let userProperty = e.target.id;
  let newUser = {...user};
  newUser[userProperty]=inputValue;
  setUser(newUser)


  }


//validation
function submitForm(e){

  e.preventDefault();
  setisLoding(true)

  //validation by joi
  const schema  = Joi.object(
    {
      first_name:Joi.string().alphanum().min(2).max(15).required(),
      last_name:Joi.string().alphanum().min(2).max(15).required(),
      age: Joi.number().min(15).max(80).required() ,   
      email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    }
  )


 //test validation 
  let joiResponse= schema.validate(user , {abortEarly:false})




  if(joiResponse.error == undefined){
    sendUser()
  }
  else{
  setisLoding(false)

    setJoiMassege(joiResponse.error.details)

  }

}

//fetch Api
async function sendUser(){
  const {data}= await axios.post("https://route-egypt-api.herokuapp.com/signup" , user);
  setisLoding(false)

  if (data.message == "success") {
    navigate("/login")
  }
  else{
    setApiError(data.message)
  }

}





  
  return (
    <>
      <div className='vh-100 bg-color '>

      <Helmet>
        <title> Register </title>
    </Helmet>
      <div className='m-auto w-50 py-5'>


      <h1 className='text-capitalize  py-4'>registeration form</h1>
      <form onSubmit={submitForm}>
        <label  htmlFor="first_name">First name :</label>
        <input onChange={getUser} type="text" id='first_name' className='form-control  mb-3 mt-2' />

        {getErrorMassegEromJoi("first_name")?<div  className="alert alert-danger p-1 text-dark" role="alert">{getErrorMassegEromJoi("first_name")}</div>: "" }

        <label  htmlFor="last_name">Last name :</label>
        <input onChange={getUser} type="text" id='last_name' className='form-control  mb-3 mt-2' />

        {getErrorMassegEromJoi("last_name")?<div  className="alert alert-danger p-1 text-dark" role="alert">{getErrorMassegEromJoi("last_name")}</div>: "" }

        <label  htmlFor="age">Age : </label>
        <input onChange={getUser} type="number" id='age' className='form-control  mb-3 mt-2' />

        {getErrorMassegEromJoi("age")?<div  className="alert alert-danger p-1 text-dark" role="alert">{getErrorMassegEromJoi("age")}</div>: ""}


        <label  htmlFor="email">Email :</label>
        <input onChange={getUser} type="email" id='email' className='form-control  mb-3 mt-2' />

        {getErrorMassegEromJoi("email")?<div  className="alert alert-danger p-1 text-dark" role="alert">{getErrorMassegEromJoi("email")}</div>: ""}


        <label  htmlFor="password">Password :</label>
        <input onChange={getUser} type="password" id='password' className='form-control  mb-3 mt-2' />

        {getErrorMassegEromJoi("password")?<div  className="alert alert-danger p-1 text-dark" role="alert"> your password not valid</div>: ""}


        {apiError.length==0? "" : <div  className="alert alert-danger p-1 text-dark" role="alert">
      {apiError}
      </div>}

        <button className='btn btn-outline-info mb-3 mt-2 me-auto'>{isLoding == false? " Register":<i className="fa-solid fa-spinner fa-spin"></i>}</button>

      </form>
      </div>
      </div>
    </>
  )
}
