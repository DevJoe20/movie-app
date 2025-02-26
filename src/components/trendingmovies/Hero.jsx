import axios from "axios";
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "./Hero.css";

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const Hero = () => {
  const [movies, setMovies] = useState([]);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // State for menu toggle

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${url}/trending/movie/day?language=en-US`, {
        headers: {
          accept: `application/json`,
          Authorization: `Bearer ${key}`,
        },
      });
      const trendingMovies = res.data.results.slice(0, 5);
      setMovies(trendingMovies);
      setCurrentMovie(trendingMovies[0]); 
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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => setCurrentMovie(movies[newIndex]), 
  };

  return (
    <div
      className="hero-movie"
      style={currentMovie ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), transparent), 
                           linear-gradient(to right, rgba(0, 0, 0, 0.5), transparent), 
                           linear-gradient(to left, rgba(0, 0, 0, 0.5), transparent), 
                           url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "background-image 0.8s ease-in-out",
      } : {}}
    >
      <nav className={`nav-container ${menuOpen ? "open" : ""}`}>
        <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </div>
        <div className={`nav-left ${menuOpen ? "show" : ""}`}>
          <a href="#">Home</a>
          <a href="#">Movies</a>
          <a href="#">Series</a>
          <a href="#">Actors</a>
          <a href="#">Genres</a>
        </div>
        <div className={`nav-center ${menuOpen ? "show" : ""}`}>
          <input type="text" placeholder="Searching..." />
        </div>
        <div className={`nav-right ${menuOpen ? "show" : ""}`}>
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </nav>

      <div className="details">
        <h2>{currentMovie?.title || "Loading..."}</h2>
        <p>{currentMovie?.overview || "Movie details will appear here."}</p>
        <div className="details-extra">
          <span className="rating">⭐ {currentMovie?.vote_average?.toFixed(1) || "N/A"}</span>
          <span className="runtime">🕒 {currentMovie?.runtime || "N/A"} mins</span>
        </div>
        <button className="watch-btn">Watch & Download in Full Quality</button>
      </div>

      <Slider {...settings} className="slider">
        {movies.map((movie) => (
          <div className="movie-slide" key={movie.id}>
            <Link to={`/movie/${movie.id}`} className="movie-link">
              <img
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                style={{ display: "none" }} 
              />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
