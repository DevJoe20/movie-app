import axios from 'axios';
import React, {useEffect, useState } from 'react'
import Slider from "react-slick";
import './Trends.css'
import { Link, useNavigate } from 'react-router-dom';



const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const Trends = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();

    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${url}/trending/movie/day?language=en-US`, {
          headers: {
            accept: `application/json`,
            Authorization: `Bearer ${key}`,
          },
        });
    
        const moviesData = res.data.results.slice(0, 5); // Extract top 4 trending movies
    
        // Fetch runtime for each movie
        const moviesWithRuntime = await Promise.all(
          moviesData.map(async (movie) => {
            try {
              const detailsRes = await axios.get(`${url}/movie/${movie.id}`, {
                headers: {
                  accept: `application/json`,
                  Authorization: `Bearer ${key}`,
                },
              });
    
              return { ...movie, runtime: detailsRes.data.runtime || 'N/A' }; // Add runtime with a fallback
            } catch (error) {
              console.error(`Error fetching movie details for ${movie.id}:`, error);
              return { ...movie, runtime: 'N/A' }; // Handle errors gracefully
            }
          })
        );
    
        setMovies(moviesWithRuntime);
      } catch (error) {
        console.error(`Error fetching trending movies:`, error);
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
    <div className='Trends-movie'>
      <h1>Trending Movies</h1>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div className="Trends-grid"> 
            <div className="Trends-slide"
             key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="Trends-movie-link">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="movie-poster" style={{ width: "200px" }} />
                    
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
                <p>{movie.title}</p>
              </Link>
            </div>
          </div>
          // <div className="Trends-slide"
          // key={movie.id}>
          //   <Link to={`/movie/${movie.id}`} className="movie-link">
          //   <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}/>
          //   <p>{movie.title}</p>
          //   <p>{movie.release_date}</p>
          //   </Link>
          // </div>
        ))}
      </Slider>
      <Link to='/browsemore'>
      <button className='browsemore'>See More</button>
      </Link>
    </div>
    </>
  )
}

export default Trends