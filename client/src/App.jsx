
import { createBrowserRouter, RouterProvider, Outlet } from "react-router"
import Login from './Pages/LoginPages/LoginPage'
import "./styles/global.scss";
import Home from "./pages/home/Home"
import Menu from "./components/menu/Menu"
import Footer from "./components/footer/Footer"
import User from "./Pages/user/User";
import Request from "./Pages/request/Request";
import HOD from "./Pages/users/HOD/Hod";
import Students from "./Pages/users/students/Students";
import Tutor from "./Pages/users/Tutor/Tutor";
import RequestLetter from "./Pages/request/Request";
import SingleLetterView from "./Pages/singleLetterView/SingleLetterView";
import LandingPage from "./Pages/LandingPage/LandingPage"
import Navbar from "./Components/navbar/Navbar";
import StudentRegister from "./Pages/StudentRegister/StudentRegister";


function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar/>
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
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
