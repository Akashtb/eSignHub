import { useSelector } from 'react-redux';
import { Link } from 'react-router'; 
import './errorPage.scss';
import { selectCurrentRole } from '../../features/redux/auth/AuthSlice';

const NotFoundPage = () => {
  const user = useSelector(selectCurrentRole);
  const pathPrefix = user === "Student" ? "/student" : "/dashboard";

  return (
    <div className="not-found-page">
      <h1 className="error-code">404</h1>
      <p className="error-message">Ooops...</p>
      <p className="error-description">We cannot find this page</p>

      <Link to={pathPrefix}>
        <button className="try-something-button">
          Let’s try something different <span>&#10145;</span>
        </button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
