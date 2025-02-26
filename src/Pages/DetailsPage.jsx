import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DetailsPage.css";

const key = import.meta.env.VITE_APP_API_KEY;
const url = import.meta.env.VITE_APP_BASE_URL;

const DetailsPage = () => {
  const { id } = useParams();
  const [currentMovie, setCurrentMovie] = useState(null);
  const [isMovie, setIsMovie] = useState(true);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [genres, setGenres] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [displayedSimilarMovies, setDisplayedSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        let res = await axios.get(`${url}/movie/${id}?language=en-US`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${key}`,
          },
        });

        setCurrentMovie(res.data);
        setIsMovie(true);
        setGenres(res.data.genres || []);

        fetchAdditionalDetails("movie");
      } catch (error) {
        console.error("Movie not found, trying TV show...");

        try {
          let res = await axios.get(`${url}/tv/${id}?language=en-US`, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${key}`,
            },
          });

          setCurrentMovie(res.data);
          setIsMovie(false);
          setGenres(res.data.genres || []);

          fetchAdditionalDetails("tv");
        } catch (error) {
          console.error("Error fetching movie or TV show details:", error);
        }
      }
    };

    const fetchAdditionalDetails = async (type) => {
      try {
        // Fetch credits (cast & director)
        const creditsRes = await axios.get(`${url}/${type}/${id}/credits`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${key}`,
          },
        });

        const castData = creditsRes.data.cast || [];
        setCast(castData.slice(0, 8)); 

        const crewData = creditsRes.data.crew || [];
        const directorInfo = crewData.find((member) => member.job === "Director");
        setDirector(directorInfo);

        // Fetch similar movies
        const similarRes = await axios.get(`${url}/${type}/${id}/similar`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${key}`,
          },
        });

        setSimilarMovies(similarRes.data.results.slice(0, 6)); 
      } catch (error) {
        console.error("Error fetching additional details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      setDisplayedSimilarMovies(() => {
        if (window.innerWidth <= 300) {
          return similarMovies.slice(0, 2); // Show 2 movies for very small screens
        } else if (window.innerWidth <= 480) {
          return similarMovies.slice(0, 3); // Show 3 movies on small screens
        } else if (window.innerWidth <= 768) {
          return similarMovies.slice(0, 4); // Show 4 movies on tablets
        } else {
          return similarMovies.slice(0, 6); // Show 6 movies on larger screens
        }
      });
    };
  
    handleResize(); // Run once on mount
    window.addEventListener("resize", handleResize);
  
    return () => window.removeEventListener("resize", handleResize);
  }, [similarMovies]); // Runs when `similarMovies` is updated
  

  const renderStars = (rating) => {
    const stars = Math.round((rating / 10) * 5);
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  return (
    <div>
      {/* Hero Section */}
      <div
        className="hero-movie"
        style={{
          backgroundImage: currentMovie
            ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent),
               url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path || currentMovie.backdrop_path})`
            : "none",
          backgroundSize: "cover",
        }}
      >
        <nav className={`navbar ${menuOpen ? "open" : ""}`}>
           {/* Toggle Button */}
          <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
           {menuOpen ? "✖" : "☰"}
          </div>

           {/* Logo */}
          <div className="logo-container">
            <img src="/Logo-light.png" alt="Logo" />
          </div>

           {/* Navigation Links */}
          <ul className={`nav-links ${menuOpen ? "show" : ""}`}>
            <li>Home</li>
            <li>Pricing</li>
            <li>Movies</li>
            <li>Series</li>
            <li>Collection</li>
            <li>FAQ</li>
            </ul>

            {/* Icons */}
          <div className={`nav-icons ${menuOpen ? "show" : ""}`}>
             <img src="/search.png" alt="Search" />
             <img src="/bells.png" alt="Notifications" />
             <img src="/user.png" alt="User" />
             <img src="/sun.png" alt="Theme Toggle" />
          </div>
        </nav>

        {currentMovie && (
          <div className="movie-details">
            <h1>{currentMovie.title || currentMovie.name}</h1>
            <p className="movie-info">
              {isMovie
                ? `${currentMovie.runtime || "N/A"} mins • ${currentMovie.release_date?.split("-")[0]}`
                : `${currentMovie.episode_run_time?.[0] || "N/A"} mins • ${currentMovie.first_air_date?.split("-")[0]}`
              }
              • {currentMovie.origin_country?.[0] || "Unknown"}
            </p>

            <div className="rating">
              <span>{renderStars(currentMovie.vote_average)}</span>
              <span> ({currentMovie.vote_average?.toFixed(1) || "N/A"})</span>
            </div>

            <div className="buttons">
              <button className="watch-now">▶ Watch Now</button>
              <button className="preview">Preview</button>
            </div>
          </div>
        )}
      </div>

      
      <div className="movie-details-container">
         {/* <h1>
          {currentMovie.title || currentMovie.name}
          </h1> */}
        <p className="movie-description">
          {currentMovie?.overview || "No description available."}
        </p>

        {/* Genres */}
        <div className="genres">
          <h3>Genres</h3>
          {genres.map((genre) => (
            <span key={genre.id} className="genre">{genre.name}</span>
          ))}
        </div>

        {/* Characters */}
        <div className="characters">
          <h3>Characters</h3>
          <div className="character-list">
            {cast.map((actor) => (
              <div key={actor.id} className="actor">
                <img src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} alt={actor.name} />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Director */}
        {director && (
          <div className="director">
            <h3>Director</h3>
            <div className="director-info">
              <img src={`https://image.tmdb.org/t/p/w185${director.profile_path}`} alt={director.name} />
              <p>{director.name}</p>
            </div>
          </div>
        )}

        {/* Similar Movies */}
        <div className="suggestions">
          <h3>Suggestions like "{currentMovie?.title || currentMovie?.name}"</h3>
          <div className="suggestions-list">
            {displayedSimilarMovies.map((movie) => (
              <div key={movie.id} className="suggested-movie">
                <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title || movie.name} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
