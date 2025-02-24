import React, {useEffect, useState } from 'react'
import './ExploreAll.css'
import axios from 'axios';

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const ExploreAll = () => {
    const [movies, setMovies] = useState([]);

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
            }, [])
  return (
    <div className='ExploreAll-Movie'>
        <h1>Top Rated</h1>
        <div className='ExploreAll-grid'>
            {movies.map((movie) => (
            <div className='ExploreAll-card'
            key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""/>
                
                <p className='overview'>{movie.title}</p>

            </div>
            ))}
        </div>
    </div>
  )
}

export default ExploreAll