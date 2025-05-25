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
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        const userData = localStorage.getItem("user");
    
        if (userData) {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setIsLoggedIn(true);
            if (parsedUser.venueManager === true) {
                setIsManager(true);
            }
        }
        setIsLoading(false);
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

    const updateUser = (updatedUser) => {
        setUser((prev) => {
            const newUser = {...prev, ...updatedUser};
            localStorage.setItem("user", JSON.stringify(newUser));
            return newUser;
        });
        if (updatedUser.venueManager === true) {
            setIsManager(true);
        } else {
            setIsManager(false);
        }
    }
    
    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isManager, isLoading, login, logout, updateUser }}>
        {children}
        </AuthContext.Provider>
    );
}
