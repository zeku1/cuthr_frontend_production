// src/api/user.ts
import { API_BASE_URL } from "./auth";

export const UserService = {
  getUser: async () => {
    const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).token : null;
    if (!token) throw new Error("Unauthorized");

    const response = await fetch(`${API_BASE_URL}/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch user data");

    return response.json();
  },
};
