
import { createBrowserRouter,RouterProvider,Outlet } from "react-router"
import LandingPage from './Pages/LandingPage/LandingPage'
import Login from './Pages/LoginPages/PrincipalLoginPage'
import StudentRegister from './Pages/StudentRegister/StudentRegister'
import "./styles/global.scss";
import Home from "./pages/home/Home"
import User from "./pages/users/User"
import Products from "./pages/products/Products"
import Navbar from "./components/navbar/Navbar"
import Menu from "./components/menu/Menu"
import Footer from "./components/footer/Footer"
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
        { path: "/users", element: <User /> },
        { path: "/products", element: <Products /> }
        
      ]
    },
    {
    path: "/login",
    element: <Login/>, 
    }
  ])
  return (
    <>
    {/* <Login/> */}
    {/* <StudentRegister/> */}
    {/* <LandingPage/> */}
    <RouterProvider router={router}/>
    </>
  )
}

export default App
