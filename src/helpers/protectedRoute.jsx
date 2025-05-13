import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

function ProtectedRoute({ children, role }) {
    const { isLoggedIn, isManager } = useAuth();
    
    if (!isLoggedIn) {
        alert("You need to be logged in to access this page.");
        return <Navigate to="/login" />;
    }
    
    if (!isManager && role === "manager") {
        alert("You are not authorized to access this page.");
        return <Navigate to="/" />;
    }
    
    return children;
    }

export default ProtectedRoute;