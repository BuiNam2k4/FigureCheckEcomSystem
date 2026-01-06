import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { login as loginService, register as registerService, getMyInfo } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
            const decoded = jwtDecode(token);
            const isTokenExpired = decoded.exp * 1000 < Date.now();
            
            if (isTokenExpired) {
                logout();
            } else {
                setIsAuthenticated(true);
                // Check for admin role
                const roles = decoded.scope ? decoded.scope.split(" ") : [];
                setIsAdmin(roles.includes("ROLE_ADMIN"));
                
                // Fetch full user details to get UUID
                const userInfo = await getMyInfo(token); 
                // userInfo IS the UserResponse because service unwraps it
                setUser({ ...userInfo, sub: decoded.sub });
            }
        } catch (error) {
            console.error("Invalid token:", error);
            logout();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (username, password) => {
    try {
      const result = await loginService(username, password);
      // Result is expected to be { token: "...", authenticated: true }
      
      if (result && result.token) {
        localStorage.setItem('token', result.token);
        setIsAuthenticated(true);
        
        const decoded = jwtDecode(result.token);
        const roles = decoded.scope ? decoded.scope.split(" ") : [];
        const isAdminUser = roles.includes("ROLE_ADMIN");
        setIsAdmin(isAdminUser);
        
        // Fetch full user info
        const userInfo = await getMyInfo(result.token);
        setUser({ ...userInfo, sub: decoded.sub });
        
        return { success: true, isAdmin: isAdminUser };
      }
      return false;
    } catch (error) {
      console.error("Login context error:", error);
      throw error;
    }
  };

  const register = async (userData) => {
      try {
          return await registerService(userData);
      } catch (error) {
          console.error("Register context error:", error);
          throw error;
      }
  }

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const value = {
    user,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
