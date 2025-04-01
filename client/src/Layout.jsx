import React from 'react'
import Navbar from './Components/navbar/Navbar'
import Menu from './components/menu/Menu'
import { Outlet } from 'react-router'
import Footer from './components/footer/Footer'

const Layout = () => {
    return (
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

export default Layout