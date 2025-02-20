import React, { useState } from 'react'

const TutorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
  
    return (
      <div className="login-container">
        <div className="login-box">
          <div className="login-form">
            <h2>Welcome back,Principal!</h2>
            <p>Please enter your details</p>
  
            <input type="text" placeholder="Enter your e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
  
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
  
            <div className="remember-forgot">
              <span className="forgot-password">Forgot password</span>
            </div>
  
            <button className="login-btn">Sign in</button>
  
  
            <p className="signup-text">
              Don't have an account? <span>Sign up for free</span>
            </p>
          </div>
  
          <div className="image-section">
            <img src={img1} alt="Login Background" />
          </div>
        </div>
      </div>
    );
}

export default TutorLogin