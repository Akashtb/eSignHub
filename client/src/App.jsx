
import { createBrowserRouter,RouterProvider,Outlet } from "react-router"
import Login from './Pages/LoginPages/PrincipalLoginPage'
import "./styles/global.scss";
import Home from "./pages/home/Home"
import Navbar from "./components/navbar/Navbar"
import Menu from "./components/menu/Menu"
import Footer from "./components/footer/Footer"
import Product from "./Pages/product/Product";
import User from "./Pages/user/User";
import Request from "./Pages/request/Request";
import HOD from "./Pages/users/HOD/Hod";
import Students from "./Pages/users/students/Students";
import Tutor from "./Pages/users/Tutor/Tutor";
import RequestLetter from "./Pages/request/Request";



function App() {
  const Layout = () =>{
    return(
      <div className="main"> 
      <Navbar/>
      <div className="container">
        <div className="menuContainer">
          <Menu/>
        </div>
        <div className="contentContainer">
          <Outlet/>
        </div>
      </div>
      <Footer/>
      </div>
    )
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>, 
      children : [
        { path: "/", element: <Home /> },
        { path: "/students", element: <Students /> },
        { path: "/Tutor", element: <Tutor /> },
        { path: "/HOD", element: <HOD /> },
        { path: "/requests", element: <Request /> },
        { path:  "/users/:id", element: <User />},
        {path:"/requestLetter", element: <RequestLetter/>},
        
      ]
    },
    {
    path: "/login",
    element: <Login/>, 
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
