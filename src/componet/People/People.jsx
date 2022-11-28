import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function People() {


 const [peaple, setPeaple] = useState(undefined)
 
 
 useEffect(() => {
   
   trendingPeaple()

 }, [])
 



async function trendingPeaple(){
 const {data}= await axios.get("https://api.themoviedb.org/3/trending/person/week?api_key=9827431ee2580504894ccbbc87490738")

 setPeaple(data.results)
}








return (
 < >
 <div className='bg-color'>
   { peaple ==undefined?       <section className="loading-screen bg-color  w-100">
   <Helmet>
        <title> All actors </title>
    </Helmet>
   <div className="loading d-flex justify-content-center align-items-center vh-100">
     <div>
       <i className="fa-solid fa-spinner fa-7x fa-spin"></i>
     </div>
   </div>
   </section> : <div className="container">
<div className="row align-items-center py-5 g-4">

{peaple == undefined? "" : peaple.map( (person, index) => 
<div key={index} className="col-md-2">
  <Link to={"/person-details/"+person.id}>
  <div className="inner-home ">
     <figure className='position-relative'>
     <img src={ (person.profile_path !=null? 'https://image.tmdb.org/t/p/w500'+ person.profile_path : "././img/5.jpg")} className="w-100 " alt='img'/>
     </figure>
     <h6 className='mt-2'>{person.name}</h6>

   </div>
  </Link>
</div>)}

</div>

</div> }
 </div>
 </>
)
}
