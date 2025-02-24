import React, {useEffect, useState } from 'react'
import Slider from "react-slick";
import { Link, useNavigate } from 'react-router-dom';
import './TvSeriesTopRated.css'
import axios from 'axios';

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const TvSeriesTopRated = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const fetchMovies = async () => {
        try{
          const res = await axios.get(`${url}/tv/top_rated?language=en-US&page=1`,{
            headers: {
                accept: `application/json`,
                Authorization: `Bearer ${key}`,
            }
            });
               console.log(res.data.results.slice(0, 4));
               setMovies(res.data.results)
              }catch (error) {
                console.error( `Error fetching movies:`, error)
            }
        }
    useEffect(() => {
          fetchMovies();
        }, []);
        
        const settings = {
          // dots: true, 
          infinite: true, 
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 1, 
          autoplay: true, 
          autoplaySpeed: 3000, 
          responsive: [
            {
              breakpoint: 1024, // Tablets
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 768, // Mobile devices
              settings: {
                slidesToShow: 2,
              },
            },
            {
              breakpoint: 480, // Small mobile screens
              settings: {
                slidesToShow: 1,
              },
            },
          ],
        };
  return (
    <>
    <div className='Tops-movie'>
      <h1>Tv Series: Top Rated</h1>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div className="Tops-slide"
          key={movie.id} onClick={() => navigate(`/movie/${movie.id}`)}>
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}/>
            <p>{movie.original_name}</p>
            <p>{movie.first_air_date}</p>
          </div>
        ))}
      </Slider>
      <Link to='/toppicks'>
      <button className='toppicks'>See More</button>
      </Link>
    </div>
    </>
  )
}

export default TvSeriesTopRated