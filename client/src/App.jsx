import { createBrowserRouter, RouterProvider } from "react-router";
import "./styles/global.scss";

import Login from './Pages/LoginPages/LoginPage';
import Home from "./pages/home/Home";
import HOD from "./Pages/users/HOD/Hod";
import Students from "./Pages/users/students/Students";
import Tutor from "./Pages/users/Tutor/Tutor";
import RequestLetter from "./Pages/request/Request";
import SingleLetterView from "./Pages/singleLetterView/SingleLetterView";
import LandingPage from "./Pages/LandingPage/LandingPage";
import StudentRegister from "./Pages/StudentRegister/StudentRegister";
import UserUpdatePage from "./Pages/userUpdatePage/UserUpdationPage";
import RequireAuth from "./features/RequireAuth";
import Layout from "./Layout";

const router = createBrowserRouter([
  {
    path: "/student",
    element: <RequireAuth allowedRoles={["Student"]} />,
    children: [
      { path: "", element: <RequestLetter /> },
      { path: "requestLetter", element: <RequestLetter /> },
      { path: "requestLetter/:id", element: <SingleLetterView /> },
      { path: "updateDetails", element: <UserUpdatePage /> }
    ]
  },
  {
    path: "/dashboard",
    element: <RequireAuth allowedRoles={["Principal", "Tutor", "HOD"]} />,
    children: [
      { path: "", element: <Home /> },
      { path: "students", element: <Students /> },
      { path: "Tutor", element: <Tutor /> },
      { path: "HOD", element: <HOD /> },
      { path: "requestLetter", element: <RequestLetter /> },
      { path: "requestLetter/:id", element: <SingleLetterView /> },
      { path: "updateDetails", element: <UserUpdatePage /> }
    ]
  },
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <Login /> },
  { path: "/studentRegister", element: <StudentRegister /> }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
