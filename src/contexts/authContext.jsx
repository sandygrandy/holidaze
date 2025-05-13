import React from "react";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isManager, setIsManager] = useState(false);
    
    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
        setUser(JSON.parse(userData));
        setIsLoggedIn(true);
        if (JSON.parse(userData).venueManager === true) {
            setIsManager(true);
        }
        }
    }, []);
    
    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsLoggedIn(true);
        if (userData.venueManager === true) {
        setIsManager(true);
        }
    };
    
    const logout = () => {
        localStorage.removeItem("user");
        setUser(null);
        setIsLoggedIn(false);
        setIsManager(false);
    };
    
    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isManager, login, logout }}>
        {children}
        </AuthContext.Provider>
    );
    }