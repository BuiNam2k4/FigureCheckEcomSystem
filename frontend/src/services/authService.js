const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8888';

export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/identity/auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    const data = await response.json();
    return data.result; // Returns { token: "...", authenticated: true }
  } catch (error) {
    console.error("Login service error:", error);
    throw error;
  }
};

export const getMyInfo = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/identity/users/my-info`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }
  
      const data = await response.json();
      return data.result; // Returns UserResponse object
    } catch (error) {
      console.error("GetMyInfo service error:", error);
      throw error;
    }
  };

export const register = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/identity/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Registration failed');
        }

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("Register service error:", error);
        throw error;
    }
};
