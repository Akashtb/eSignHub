import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate(); 

  const handleCardClick = (role) => {
    navigate('/login', { state: { role } }); 
  };

  return (
    <div className='landingPage'>
      <h2 className="heading">Choose Your Role</h2>
      <div className="cardSubContainer">
        <div className="card" onClick={() => handleCardClick("PRINCIPAL")}>
          <img src="/src/assets/principal.png" alt="Principal" />
          <span>PRINCIPAL</span>
        </div>
        <div className="card" onClick={() => handleCardClick("HOD")}>
          <img src="/src/assets/manager.png" alt="HOD" />
          <span>HOD</span>
        </div>
        <div className="card" onClick={() => handleCardClick("TUTOR")}>
          <img src="/src/assets/teacher.png" alt="Tutor" />
          <span>TUTOR</span>
        </div>
        <div className="card" onClick={() => handleCardClick("STUDENTS")}>
          <img src="/src/assets/students.png" alt="Students" />
          <span>STUDENTS</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
