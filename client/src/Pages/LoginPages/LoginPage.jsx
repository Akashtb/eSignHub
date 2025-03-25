import { useState, useEffect } from 'react';
import img1 from '../../assets/principal.webp';
import './login.css';
import { useLocation, useNavigate } from 'react-router';
import { useLoginMutation } from '../../features/redux/auth/AuthApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/redux/auth/AuthSlice';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const location = useLocation();
  const { role } = location.state || {};
  const [login] = useLoginMutation()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formattedRole = role?.charAt(0).toUpperCase() + role?.slice(1).toLowerCase();
   

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const userData = await login({ email, password,role:formattedRole,regNumber }).unwrap();
        console.log(userData);
        dispatch(setCredentials({ ...userData }));
        // toast.success("successfully logged in ...")
        navigate('/'); 
      } catch (error) {
        // setLoginError(error?.data?.message || 'Login failed, please try again.');
        console.error('Error logging in:', error);
      }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <h2>Welcome back, {role}!</h2>
          <p>Please enter your details</p>

        {
            role==="STUDENT" ?(
              <input 
              type="text" 
              placeholder="Enter your Register number" 
              value={regNumber} 
              onChange={(e) => setRegNumber(e.target.value)}
              required 
            />
            ):(
              <input 
              type="email" 
              placeholder="Enter your e-mail" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
              />
            )
          }

          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />

          <div className="remember-forgot">
            <span className="forgot-password">Forgot password</span>
          </div>

          <button className="login-btn" onClick={handleSubmit}>Sign in</button>

          {role === "Student" && (
            <p className="signup-text">
              Don't have an account? <span>Sign up for free</span>
            </p>
          )}
        </div>

        <div className="image-section">
          <img src={img1} alt="Login Background" />
        </div>
      </div>
    </div>
  );
}

export default Login;
