import axios from 'axios';

export const API_BASE_URL = 'http://localhost'; // Change to your actual API

export const AuthService = {
  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      
      // Store user data in localStorage
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
          token: data.token,
        })
      );

      console.log(data);

      return data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getToken: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user?.token || null;
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user') || '{}');
  },
};