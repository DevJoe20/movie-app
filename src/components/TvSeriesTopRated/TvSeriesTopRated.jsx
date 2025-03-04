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
      try {
        const res = await axios.get(`${url}/tv/top_rated?language=en-US&page=1`, {
          headers: {
            accept: `application/json`,
            Authorization: `Bearer ${key}`,
          },
        });
    
        const moviesData = res.data.results.slice(0, 5); // Extract top 4
    
        // Fetch runtime (episode duration) for each TV show
        const moviesWithRuntime = await Promise.all(
          moviesData.map(async (movie) => {
            try {
              const detailsRes = await axios.get(`${url}/tv/${movie.id}`, {
                headers: {
                  accept: `application/json`,
                  Authorization: `Bearer ${key}`,
                },
              });
    
              let runtime = 'N/A';
    
              if (detailsRes.data.episode_run_time.length > 0) {
                runtime = `${detailsRes.data.episode_run_time[0]} min`;
              } else if (detailsRes.data.runtime) {
                runtime = `${detailsRes.data.runtime} min`;
              } else if (detailsRes.data.number_of_episodes > 0 && detailsRes.data.number_of_seasons > 0) {
                runtime = `~${Math.round(detailsRes.data.number_of_episodes / detailsRes.data.number_of_seasons)} min`;
              }
    
              return { ...movie, runtime };
            } catch (error) {
              console.error(`Error fetching TV details for ${movie.id}:`, error);
              return { ...movie, runtime: 'N/A' }; // Handle errors gracefully
            }
          })
        );
    
        setMovies(moviesWithRuntime);
      } catch (error) {
        console.error(`Error fetching movies:`, error);
      }
    };
    
    useEffect(() => {
          fetchMovies();
        }, []);
        
        const settings = {
          // dots: true, 
          infinite: true, 
          speed: 500,
          slidesToShow: 5,
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
          <div className="Tops-grid"> 
            <div className="Tops-slide" key={movie.id}>
            <Link to={`/movie/${movie.id}`} className="Tops-movie-link">
              <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="movie-path" style={{ width: "1200px" }} />
          
              <div className="rating">
              <div className="rate">
              <div className="rate-icon">
                <p><img src="/rate.png" alt="rate" /></p>
              </div>
              <div className="rate">
                <p>{movie.vote_average}</p>
              </div>
              </div>
              <div className="time-duration">
                <div className="duration-icon">
                  <p><img src="/clock.png" alt="clock" /></p>
                </div>
                <div className="duration-time">
                  <p>{movie.runtime ? `${movie.runtime} min` : 'N/A'}</p>
                </div>
              </div>
              </div>
              <p>{movie.name}</p>
            </Link>
            </div>
          </div>
          // <div className="Tops-slide"
          // key={movie.id}>
          //   <Link to={`/movie/${movie.id}`} className="movie-link">
          //   <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}/>
          //   <p>{movie.original_name}</p>
          //   <p>{movie.first_air_date}</p>
          //   </Link>
          // </div>
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