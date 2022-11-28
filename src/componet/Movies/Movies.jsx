import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
export default function Movies() {

 const [allmovie, setAllmovie] = useState(undefined)
 
 
 useEffect(() => {
   
   trendingMovie()

 }, [])
 



async function trendingMovie(){
 const {data}= await axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=9827431ee2580504894ccbbc87490738")

 setAllmovie(data.results)
}




return (
 < >
 <div className='bg-color'>
   { allmovie ==undefined?       <section className="loading-screen bg-color  w-100">

   <Helmet>
        <title> All Movies</title>
    </Helmet>
   <div className="loading d-flex justify-content-center align-items-center vh-100">
     <div>
       <i className="fa-solid fa-spinner fa-7x fa-spin"></i>
     </div>
   </div>
   </section> : <div className="container">
<div className="row align-items-center py-5 g-4">

{allmovie == undefined? "" : allmovie.map( (movie, index) => 
<div key={index} className="col-md-2">

  <Link to={"/details/movie/"  + movie.id}>
  <div className="inner-home ">
     <figure className='position-relative'>
     <img src={'https://image.tmdb.org/t/p/w500'+movie.poster_path} className="w-100" alt='img'/>

     {movie.vote_average >5? 
       <figcaption className='position-absolute top-0 end-0 px-2 py-1 bg-info'>
       <span>{Math.round(movie.vote_average)} </span>
     </figcaption> : ""}

     </figure>
     <h6 className='mt-1'>{movie.title}</h6>

   </div>

  
  </Link>

</div>)}

</div>

</div> }
 </div>
 </>
)
}
