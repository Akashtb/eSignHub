import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Layout from "../Layout";
import { Navigate, Outlet, useLocation } from "react-router";
import { selectCurrentRole, selectCurrentToken } from "./redux/auth/AuthSlice";
import LoadingSpinner from "../Components/loadingSpinner/LoadingSpinner";

const RequireAuth = ({ allowedRoles }) => {

    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const role = useSelector(selectCurrentRole);
    const pathPrefix = role === "Student" ? "/student" : "/dashboard";
    // console.log(role);
    // console.log(allowedRoles);



    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!allowedRoles.includes(role)) {
            console.error("You are not authorized to access this route");
        }
    }, [role, allowedRoles]);

    if (isLoading) {
        return (
            <div className="spinner-overlay">
                <LoadingSpinner />
            </div>
        );
    }

   
    if (!token) {
        return <Navigate to="/landingPage" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to={`${pathPrefix}`} replace />;
    }


    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export default RequireAuth;
