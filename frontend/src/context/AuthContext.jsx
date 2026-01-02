import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          id: 'u1',
          name: 'Nam Nguyen',
          email: email,
          role: 'user',
          avatar: 'https://i.pravatar.cc/150?u=u1',
        };
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        resolve(mockUser);
      }, 2000);
    });
  };

  const register = async (data) => {
    // Mock API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true });
        }, 2000);
    });
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    register,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
