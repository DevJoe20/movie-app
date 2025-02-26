import { useState } from "react";
import { FaPhone, FaEnvelope, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./AuthForm.css";

const AuthForm = () => {
    const [activeTab, setActiveTab] = useState("signup");
    
  return (
    <div className="auth-container">
      <div className="auth-box">
        <div className="tabs">
          <span
            className={activeTab === "login" ? "active" : ""}
            onClick={() => setActiveTab("login")}
          >
            Login
          </span>
          <span
            className={activeTab === "signup" ? "active" : ""}
            onClick={() => setActiveTab("signup")}
          >
            Sign Up
          </span>
        </div>

        <div className="input-group">
          <label>Full Name</label>
          <div className="input-field">
            <input type="text" placeholder="Enter your full name" />
            <FaUser className="icon" />
          </div>
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <div className="input-field">
            <input type="text" placeholder="Enter your phone number" />
            <FaPhone className="icon" />
          </div>
        </div>

        <div className="input-group">
          <label>Email</label>
          <div className="input-field">
            <input type="email" placeholder="Enter your email" />
            <FaEnvelope className="icon" />
          </div>
        </div>

        <button className="submit-btn">Sign Up</button>

        <div className="or-divider">or</div>

        <button className="google-btn">
          <FcGoogle className="google-icon" />
          Sign in with Google
        </button>
      </div>

      <div className="info-box">
        <h2>Join Us</h2>
        <p>
          By signing up on our platform, you can download your content daily without restrictions.
          If you have already registered, simply click the login button to access your account again.
        </p>
      </div>
    </div>
  )
}

export default AuthForm