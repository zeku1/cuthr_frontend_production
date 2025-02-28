import axios from 'axios';
import { AuthService } from '../../services/api/auth';

const API_BASE_URL = 'http://128.199.126.75/api/v1';

export const AdminService = {
  getDashboardData: async () => {

    const token = AuthService.getToken(); // Add the parentheses to properly call the function
    console.log(token);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/dashboard`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);

      return response.data;

    } catch (error: any) {
      console.error('Failed to fetch dashboard data:', error.response?.data?.message || error.message);
      throw new Error(error.response?.data?.message || 'Failed to fetch dashboard data');
    }
  },

};
