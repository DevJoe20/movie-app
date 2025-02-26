import React, {useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TopPicks.css'

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const TopPicks = () => {
    const [movies, setMovies] = useState([]);

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
            }, [])
  return (
    <>
      <div className='TopPicks-Movie'>
        <h1>Tv Series: Top Rated</h1>
        <div className='TopPicks-grid'>
            {movies.map((movie) => (
            <div className='TopPicks-card'
            key={movie.id}>
              <Link to={`/movie/${movie.id}`} className="movie-link">
              <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""/>
              <p className='toppicks-title'>{movie.original_name}</p>
              </Link>
                {/* <p className='toppicks-title'>{movie.first_air_date}</p> */}
            </div>
            ))}
        </div>
    </div>
    </>
  )
}

export default TopPicks