import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function PersonDetails() {
 


 const [person_details, setPerson_details] = useState(undefined)
 let {id }=useParams()
 
 
 
 
   //fetch Api Detials
   useEffect(() => {
    getpersonDetails()
     
   }, )
   
 
   async function getpersonDetails(){
    let {data} = await axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=9827431ee2580504894ccbbc87490738&language=en-US`)
 
 
    setPerson_details(data)
   }
 
 






 return (
  <>
    {person_details == undefined? <section className="loading-screen bg-color  w-100">
     <div className="loading d-flex justify-content-center align-items-center vh-100">
       <div>
         <i className="fa-solid fa-spinner fa-7x fa-spin"></i>
       </div>
     </div>
     </section> : 



      <div className='vh-100 bg-color p-5'>


    <Helmet>
        <title>{person_details.name.substring(0,20)}  Details</title>
    </Helmet>
      <div className="container p-5">
       <div className="row">
  
  
       <div className="col-md-4 ">
           <div className="details-img">
            <img src={'https://image.tmdb.org/t/p/w500'+ person_details.profile_path}  className="w-100" alt="img" />
           </div>
        </div>
        <div className="col-md-8">
         <div className="details-info">
           <h2>{person_details.name}</h2>
            <h5 className='my-3'>{person_details.known_for_department}</h5>

          <h4 className='mt-5 mb-3'>Birthday : {person_details.birthday}</h4>
          <h4 className=' mb-3'>Place Of Birth : {person_details.place_of_birth}</h4>
          <h4 className=' mb-3'>Popularity : {person_details.popularity}</h4>
          <h4 className=' mb-5'>Gender : {person_details.gender}</h4>
  
          <p className='mt-5 details-desc'>{person_details.biography.substring(0,500)} <span>....</span></p>
   
         </div>
        </div>
  
  
  
       </div>
      </div>
     </div>
    }
  
  </>
    )
}
