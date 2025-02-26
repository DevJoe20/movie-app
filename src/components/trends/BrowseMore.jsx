import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import './BrowseMore.css'


const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const BrowseMore = () => {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        try{
            const res = await axios.get(`${url}/trending/movie/day?language=en-US`,{
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
    <div className='browsemore-container'>
        <h1>Trending Movies</h1>
        <div className='browsemore-grid'>
            {movies.map((movie) => (
            <div className='browsemore-card'
            key={movie.id}>
                <Link to={`/movie/${movie.id}`} className="movie-link">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""/>
                <p className='browsemore-title'>{movie.title}</p>
                </Link>
                {/* <p className='browsemore-title'>{movie.release_date}</p> */}
            </div>
            ))}
        </div>
    </div>
    </>
  )
}

export default BrowseMore