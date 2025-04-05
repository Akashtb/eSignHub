import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentRole } from '../../features/redux/auth/AuthSlice';
import PrincipaUpdatePage from './PrincipalUpdatePage';
import StudentUpdatePage from './StudentUpdatePage';
import StaffUpdatePage from './StaffupdatePage';

const UserUpdationPage = () => {
  const user = useSelector(selectCurrentRole);
  console.log(user);
  

  const getUpdationItems = () => {
    switch (user) {
      case "Principal":
        return <PrincipaUpdatePage />;

      case "Student":
        return <StudentUpdatePage />;

      case "Tutor":
        return <StaffUpdatePage />;

      case "HOD":
        return <StaffUpdatePage />;

      default:
        return <p>User role not recognized or update page not available.</p>;
    }
  };

  return <div className="user-updation">{getUpdationItems()}</div>;
};

export default UserUpdationPage;
