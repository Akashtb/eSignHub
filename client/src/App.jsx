
import { createBrowserRouter,RouterProvider,Outlet } from "react-router"
import LandingPage from './Pages/LandingPage/LandingPage'
import Login from './Pages/LoginPages/PrincipalLoginPage'
import StudentRegister from './Pages/StudentRegister/StudentRegister'
import "./styles/global.scss";
import Home from "./pages/home/Home"
import Teachers from "./Pages/teachers/Teachers"
import Navbar from "./components/navbar/Navbar"
import Menu from "./components/menu/Menu"
import Footer from "./components/footer/Footer"
import Students from "./Pages/students/Students";
import Product from "./Pages/product/Product";
import User from "./Pages/user/User";
import Request from "./Pages/request/Request";


// import {
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

// const queryClient = new QueryClient();
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
        {/* <QueryClientProvider client={queryClient}> */}
          <Outlet/>
          {/* </QueryClientProvider> */}
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
        { path: "/teacher", element: <Teachers /> },
        { path: "/requests", element: <Request /> },
        { path:  "/users/:id", element: <User />},
        { path: "/products/:id", element: <Product />,},
        
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
    {/* <Login/> */}
    {/* <StudentRegister/> */}
    {/* <LandingPage/> */}
    <RouterProvider router={router}/>
    </>
  )
}

export default App
