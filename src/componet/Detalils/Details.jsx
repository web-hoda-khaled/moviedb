import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Helmet} from "react-helmet";


export default function Details() {

const [details, setDetails] = useState(undefined)
let {id , tybe}=useParams()




  //fetch Api Detials
  useEffect(() => {
   getDetails()
    
  }, )
  

  async function getDetails(){
   let {data} = await axios.get(`https://api.themoviedb.org/3/${tybe}/${id}?api_key=9827431ee2580504894ccbbc87490738&language=en-US`)


   setDetails(data)
  }





  return (
<>
  {details == undefined? <section className="loading-screen bg-color  w-100">
   <div className="loading d-flex justify-content-center align-items-center vh-100">
     <div>
       <i className="fa-solid fa-spinner fa-7x fa-spin"></i>
     </div>
   </div>
   </section> : 
    <div className='vh-100 bg-color p-5'>

       <Helmet>
        <title>{details.title==undefined? details.name.substring(0,20) : details.title.substring(0,20)}  Details</title>
    </Helmet>
    <div className="container p-5">
     <div className="row">


     <div className="col-md-4 ">
         <div className="details-img">
          <img src={'https://image.tmdb.org/t/p/w500'+details.poster_path} className="w-100" alt="" />
         </div>
      </div>
      <div className="col-md-8">
       <div className="details-info">
         <h2>{details.title==undefined? details.name : details.title}</h2>
          <h5 className='my-3'>{details.tagline}</h5>
         {details.genres?.map( (genre, idx) =>         <span key={idx} className='bg-info px-3 my-3 py-2 rounded-3  me-2'>{genre.name}</span>
 )}

        <h4 className='mt-5 mb-3'>Vote : {details.vote_average}</h4>
        <h4 className=' mb-3'>Vote Count: {details.vote_count}</h4>
        <h4 className=' mb-3'>Popularity : {details.popularity}</h4>
        <h4 className=' mb-5'>Release Date : {details.release_date}</h4>

        <p className='mt-5 details-desc'>{details.overview}</p>
 
       </div>
      </div>



     </div>
    </div>
   </div>
  }

</>
  )
}
