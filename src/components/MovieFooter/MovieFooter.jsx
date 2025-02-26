import { FaFacebook, FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";
import "./MovieFooter.css";


const MovieFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-logo">
          <h2>
            <span className="highlight">Cinema City;</span> Media for Everyone
          </h2>
          <p>
            Our website started operating in 2017 and has become a professional platform for
            downloading movies and series without censorship. Here, you can browse your favorite
            movies and series, add them to your watchlist, and stream them online. We also provide
            exclusive subtitles and dubbing for all films and series.
          </p>
          <p className="support-phone">Support Phone: 0912******15</p>
          <div className="social-icons">
            <FaFacebook />
            <FaInstagram />
            <FaTelegram />
            <FaTwitter />
          </div>
        </div>

        {/* Right Section - Navigation Links */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Rules</h3>
            <ul>
              <li>Main Page</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Collaborate with Us</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Cinema City</h3>
            <ul>
              <li>Main Page</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Collaborate with Us</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Download</h3>
            <ul>
              <li>Movies</li>
              <li>TV Series</li>
              <li>Animation</li>
              <li>Search</li>
              <li>Categories</li>
            </ul>
          </div>

          <div className="footer-column">
            <ul>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
              <li>Help & Support</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default MovieFooter