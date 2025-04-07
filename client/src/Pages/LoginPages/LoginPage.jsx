import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Import Link
import img1 from '../../assets/principal.webp';
import './login.css';
import { useLoginMutation } from '../../features/redux/auth/AuthApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentRole, setCredentials } from '../../features/redux/auth/AuthSlice';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [regNumber, setRegNumber] = useState('');
  const location = useLocation();
  const { role } = location.state || {};
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector(selectCurrentRole)

  const formattedRole = role
    ? role.toUpperCase() === "HOD"
      ? "HOD"
      : role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()
    : "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password, role: formattedRole, regNumber }).unwrap();
      console.log(userData);
      dispatch(setCredentials({ ...userData }));
      toast.success(`Welcome back, ${userData.role}!`);
      if (userData.role === "Student") {
        navigate("/student");
      } else if (["Principal", "Tutor", "HOD"].includes(userRole)) {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-form">
          <h2>Welcome back, {formattedRole}!</h2>
          <p>Please enter your details</p>

          {formattedRole === "Student" ? (
            <input
              type="text"
              placeholder="Enter your Register number"
              value={regNumber}
              onChange={(e) => setRegNumber(e.target.value)}
              required
            />
          ) : (
            <input
              type="email"
              placeholder="Enter your e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}

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

          {formattedRole === "Student" && (
            <p className="signup-text">
              Don't have an account? <Link to="/studentregister" className="signup-link" style={{ color: "black" }}>Sign up for free</Link>
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
