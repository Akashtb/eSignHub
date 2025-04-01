import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { selectCurrentRole, selectCurrentToken } from "./AuthSLice";
import Layout from "../Layout";
import { Navigate, Outlet, useLocation } from "react-router";

const RequireAuth = ({ allowedRoles }) => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const role = useSelector(selectCurrentRole);

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
        return <div>Loading...</div>;
    }

    if (!token) {
        return <Navigate to="/landingPage"replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return (
        <Layout>
            <Outlet/>
        </Layout>
    );
};

export default RequireAuth;
