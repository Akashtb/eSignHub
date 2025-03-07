import { useState, useEffect } from 'react';
import img1 from '../../assets/principal.webp';
import './login.css';



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType,setUserType] = useState('Student')


  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <h2>Welcome back,{userType}!</h2>
          <p>Please enter your details</p>

          <input type="text" placeholder="Enter your e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />

          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <div className="remember-forgot">
            <span className="forgot-password">Forgot password</span>
          </div>

          <button className="login-btn">Sign in</button>


       { userType === "Student" && <p className="signup-text">
            Don't have an account? <span>Sign up for free</span>
          </p>}
        </div>

        <div className="image-section">
          <img src={img1} alt="Login Background" />
        </div>
      </div>
    </div>
  );
}

export default Login;
