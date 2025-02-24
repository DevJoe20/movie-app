import React, {useEffect, useState } from 'react'
import axios from 'axios';
import './SeeAll.css';

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;


const SeeAll = () => {
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        try{
            const res = await axios.get(`${url}/tv/on_the_air?language=en-US&page=1`,{
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
    <div className='SeeAll-movie'>
        <h1>Tv Series List: On The Air</h1>
        <div className='SeeAll-grid'>
            {movies.map((movie) => (
            <div className='SeeAll-card'
            key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt=""/>
                <p className='seeall-title'>{movie.name}</p>
                {/* <p className='seeall-title'>{movie.first_air_date}</p> */}
                {/* <p className='seeall-title'>{movie.vote_average}</p> */}
            </div>
            ))}
        </div>
    </div>
    </>
  )
}

export default SeeAll