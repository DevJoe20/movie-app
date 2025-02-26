import React, {useEffect, useState } from 'react'
import axios from 'axios';
import Slider from 'react-slick/lib/slider';
import './TopRated.css'
import { Link, useNavigate } from 'react-router-dom';


const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const TopRated = () => {
    const [movies, setMovies] = useState ([]);
    const navigate = useNavigate();

    const fetchMovies = async () => {
        try{
          const res = await axios.get(`${url}/movie/top_rated?language=en-US&page=1`,{
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
                          slidesToShow: 4,
                        },
                      },
                      {
                        breakpoint: 900, // Tablets
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
    <div className='TopRated-movie'>
      <h1>Top Rated</h1>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div className="TopRated-slide"
          key={movie.id}>
            <Link to={`/movie/${movie.id}`} className="movie-link">
            <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title}
            style={{width: "200px"}}/>
            <p>{movie.title}</p>
            <p>{movie.release_date}</p>
            </Link>
          </div>
        ))}
      </Slider>
      {/* <button className='details'>See More</button> */}
      <Link to= './exploreall'>
      <button className='Explore-All'>See More</button>
      </Link>
    </div>
    </>
  )
}

export default TopRated