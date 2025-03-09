import React from 'react'
import './LandingPage.css'
const LandingPage = () => {
  return (
    <div className='landingPage'>
         <h2 className="heading">Choose Your Role</h2>
        <div className="cardSubContainer">
            <div className="card">
                <img src="/src/assets/principal.png" alt="" />
                <span>PRINCIPAL</span>
            </div>
            <div className="card">
                <img src="/src/assets/manager.png" alt="" />
                <span>HOD</span>
            </div>
            <div className="card">
                <img src="/src/assets/teacher.png" alt="" />
                <span>TUTOR</span>
            </div>
            <div className="card">
                <img src="/src/assets/students.png" alt="" />
                <span>STUDENTS</span>
            </div>
        </div>
    </div>
  )
}

export default LandingPage