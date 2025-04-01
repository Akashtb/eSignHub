
import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import Login from './Pages/LoginPages/LoginPage'
import "./styles/global.scss";
import Home from "./pages/home/Home"
import User from "./Pages/user/User";
import Request from "./Pages/request/Request";
import HOD from "./Pages/users/HOD/Hod";
import Students from "./Pages/users/students/Students";
import Tutor from "./Pages/users/Tutor/Tutor";
import RequestLetter from "./Pages/request/Request";
import SingleLetterView from "./Pages/singleLetterView/SingleLetterView";
import LandingPage from "./Pages/LandingPage/LandingPage"
import StudentRegister from "./Pages/StudentRegister/StudentRegister";
import Layout from "./Layout";


function App() {
 
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        { path: "/", element: <Home /> },
        { path: "/students", element: <Students /> },
        { path: "/Tutor", element: <Tutor /> },
        { path: "/HOD", element: <HOD /> },
        { path: "/requests", element: <Request /> },
        { path: "/users/:id", element: <User /> },
        { path: "/requestLetter", element: <RequestLetter /> },
        { path: "/requestLetter/:id", element: <SingleLetterView /> },

      ]
    },
    {
      path: "/landingPage",
      element: <LandingPage />,
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/studentRegister",
      element: <StudentRegister/>
    }


  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
