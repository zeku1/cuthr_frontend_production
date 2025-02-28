import axios from 'axios';
import { console } from 'inspector';

export const API_BASE_URL = 'http://128.199.126.75'; // Change to your actual API

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

    
      // Store user data in a cookie
      document.cookie = `user=${encodeURIComponent(JSON.stringify({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
      }))}; path=/; max-age=${24 * 60 * 60}; secure; samesite=strict`;

      return data;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  logout: () => {
    document.cookie = 'user=; path=/; max-age=0;';
  },

  getToken: () => {
    // if (typeof document !== "undefined") {
      try {
        const match = document.cookie.match(/(^|;)\s*user=([^;]+)/);
        if (match && match[2]) {
          const user = JSON.parse(decodeURIComponent(match[2]));
          return user?.token || null;
        }
      } catch (error) {
        console.error("Error parsing user token:", error);
      }
    // }
    // return null;
  },

  // getCurrentUser: () => {
  //   return JSON.parse(localStorage.getItem('user') || '{}');
  // },
};
