import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./AiringTodayDetails.css";

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const AiringTodayDetails = () => {
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState(null);

  const fetchMovieDetails = async () => {
    try {
      const res = await axios.get(`${url}/tv/${id}?language=en-US`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${key}`,
        },
      });
      setCurrentMovie(res.data);
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [id]);

  return (
    <div>
      <div
      className="hero-movie"
      style={{
        backgroundImage: currentMovie
          ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent),
             url(https://image.tmdb.org/t/p/original${currentMovie.poster_path})`
          : "none",
          backgroundSize: 'cover',
      }}
    >
      <nav className="navbar">
        <div className="logo-container">
          <img src="/Logo-light.png" alt="Logo" />
        </div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Pricing</li>
          <li>Movies</li>
          <li>Series</li>
          <li>Collection</li>
          <li>FAQ</li>
        </ul>
        <div className="nav-icons">
          <img src="/search.png" alt="Search" />
          <img src="/bells.png" alt="Notifications" />
          <img src="/user.png" alt="User" />
          <img src="/sun.png" alt="Theme Toggle" />
        </div>
      </nav>

      {currentMovie && (
        <div className="movie-details">
          <h1>{currentMovie.name}</h1>
          <p className="movie-info">
            {currentMovie.episode_run_time?.[0] || "N/A"} mins •{" "}
            {currentMovie.first_air_date?.split("-")[0]} •{" "}
            {currentMovie.origin_country?.[0] || "Unknown"}
          </p>

          <div className="rating">
            ⭐⭐⭐⭐⭐ <span>({currentMovie.vote_average.toFixed(1)})</span>
          </div>

          <div className="buttons">
            <button className="watch-now">▶ Watch Now</button>
            <button className="preview">Preview</button>
          </div>
        </div>
      )}
    </div>
    <div className="movie-details1">
      <p>God Over All Things</p>
    </div>
    </div>
  );
};

export default AiringTodayDetails;
