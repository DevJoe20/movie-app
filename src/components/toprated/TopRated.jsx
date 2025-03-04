import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick/lib/slider';
import './TopRated.css';
import { Link, useNavigate } from 'react-router-dom';

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${url}/movie/top_rated?language=en-US&page=1`, {
        headers: {
          accept: `application/json`,
          Authorization: `Bearer ${key}`,
        },
      });

      const moviesData = res.data.results.slice(0, 5); 

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

            return { ...movie, runtime: detailsRes.data.runtime }; // Add runtime to movie object
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
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 900, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <div className='TopRated-movie'>
        <h1>Top Rated</h1>
        <Slider {...settings}>
          {movies.map((movie) => (
            <div className="TopRated-grid"> 
              <div className="TopRated-slide" key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="movie-link">
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
          ))}
        </Slider>
        <Link to='./exploreall'>
          <button className='Explore-All'>See More</button>
        </Link>
      </div>
    </>
  );
};

export default TopRated;
