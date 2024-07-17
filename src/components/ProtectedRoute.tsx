import React from 'react';
import {Navigate, useLocation, Outlet } from 'react-router-dom';
import { useState } from 'react';

interface ProtectedRouteProps {
    requiredRoles?: string[];
}

const ProtectedRoute:React.FC<ProtectedRouteProps> = ({ requiredRoles, ...rest }) => {
    const [userRole,setUserRole]=useState(()=>localStorage.getItem('role'))
    const location = useLocation();

    const hasRequiredRole = requiredRoles?.length ? requiredRoles.includes(userRole) : true;

    const token=localStorage.getItem('token')

    if (token && !hasRequiredRole) {
        return <Navigate to="/home" state={{ from: location }} />;
    }

    if (!token) {
        return <Navigate to="/" state={{ from: location }} />;
    }


    return <Outlet {...rest} />;
};

export default ProtectedRoute;
