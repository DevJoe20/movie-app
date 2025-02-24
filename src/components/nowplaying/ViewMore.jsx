import React, {useEffect, useState } from 'react'
import axios from 'axios';
import './ViewMore.css';



const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;


const ViewMore = () => {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        try{
            const res = await axios.get(`${url}/movie/now_playing?language=en-US&page=1`,{
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
    <div className='movie-container'>
        <h1>Now Playing</h1>
        <div className='movie-grid'>
            {movies.map((movie) => (
            <div className='movie-card'
            key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""/>
                
                <p className='movie-title'>{movie.title}</p>

            </div>
            ))}
        </div>
    </div>
  )
}

export default ViewMore