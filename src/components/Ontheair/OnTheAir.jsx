import React, {useEffect, useState } from 'react'
import axios from 'axios';
import Slider from 'react-slick/lib/slider';
import './OnTheAir.css'
import { Link, useNavigate } from 'react-router-dom';

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const OnTheAir = () => {
    const [movies, setMovies] = useState ([]);
    const navigate = useNavigate();

    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${url}/tv/on_the_air?language=en-US&page=1`, {
          headers: {
            accept: `application/json`,
            Authorization: `Bearer ${key}`,
          },
        });
    
        const moviesData = res.data.results.slice(0, 5);
    
        // Fetch runtime (episode duration) for each TV series
        const moviesWithRuntime = await Promise.all(
          moviesData.map(async (movie) => {
            try {
              const detailsRes = await axios.get(`${url}/tv/${movie.id}`, {
                headers: {
                  accept: `application/json`,
                  Authorization: `Bearer ${key}`,
                },
              });
    
              // TV shows do not have a single "runtime"; instead, they have an array of episode runtimes.
              const runtime = detailsRes.data.episode_run_time.length > 0 
                ? `${detailsRes.data.episode_run_time[0]} min` 
                : 'N/A';
    
              return { ...movie, runtime };
            } catch (error) {
              console.error(`Error fetching movie details for ${movie.id}:`, error);
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
                          slidesToShow: 4,
                        },
                      },
                      {
                        breakpoint: 880, // Mobile devices
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
    <div className='OnAir-movie'>
          <h1>Tv Series List: On The Air</h1>
          <Slider {...settings}>
            {movies.map((movie) => (
              <div className="OnAir-grid"> 
                <div className="OnAir-slide"
                key={movie.id}>
                <Link to={`/movie/${movie.id}`} className="OnAir-movie-link">
                  <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} className="movie-path" style={{ width: "200px" }} />
              
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
            ))}
          </Slider>
          <Link to= './seeall'>
          <button className='seeall'>See More</button>
          </Link>
        </div>
    </>
  )
}

export default OnTheAir