
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Show() {
 const [tvShow, setTvShow] = useState(undefined)

  
  
 useEffect(() => {
   trendingTvShow()

 }, [])
 



 async function trendingTvShow(){
  const {data}= await axios.get("https://api.themoviedb.org/3/trending/tv/week?api_key=9827431ee2580504894ccbbc87490738")

  setTvShow(data.results)

  console.log(data);
}


return (
 < >
 <div className='bg-color'>
   {tvShow == undefined ?       <section className="loading-screen bg-color  w-100">
   <Helmet>
        <title> All TV Show</title>
    </Helmet>
   <div className="loading d-flex justify-content-center align-items-center vh-100">
     <div>
       <i className="fa-solid fa-spinner fa-7x fa-spin"></i>
     </div>
   </div>
   </section> : <div className="container">
<div className="row align-items-center py-5 g-4">
{tvShow == undefined? "" : tvShow.map( (td, index) => 
<div key={index} className="col-md-2">
  <Link to={"/details/tv/"+td.id}>
  <div className="inner-home ">
     <figure className='position-relative'>
     <img src={'https://image.tmdb.org/t/p/w500'+td.poster_path} className="w-100" alt='img'/>

     {td.vote_average >5? 
       <figcaption className='position-absolute top-0 end-0 px-2 py-1 bg-info'>
       <span>{Math.round(td.vote_average)} </span>
     </figcaption> : ""}

     </figure>
     <h6 className='mt-1'>{td.name}</h6>

   </div>
  </Link>
</div>)}

</div>
</div> }
 </div>
 </>
)
}
