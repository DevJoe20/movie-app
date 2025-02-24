import React, {useEffect, useState } from 'react'
import axios from 'axios';
import './DiscoverMore.css';

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const DiscoverMore = () => {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        try{
            const res = await axios.get(`${url}/tv/airing_today?language=en-US&page=1`,{
                headers: {
                    accept: `application/json`,
                    Authorization: `Bearer ${key}`,
                }
            });
            console.log(res.data);
            setMovies(res.data.results)
        } catch (error) {
            console.error( `Error fetching movies:`, error)
        }
    };
    useEffect(() => {
        fetchMovies();
    }, [])
  return (
    <>
    <div className='DiscoverMore-container'>
        <h1>Airing Today</h1>
        <div className='DiscoverMore-grid'>
            {movies.map((movie) => (
            <div className='DiscoverMore-card'
            key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""/>
                
                <p className='discover-title'>{movie.name}</p>

            </div>
            ))}
        </div>
    </div>
    </>
  )
}

export default DiscoverMore