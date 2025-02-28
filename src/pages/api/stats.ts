// src/api/stats.ts
import topStats from "@/data/top-stats.json";


export const StatsService = {
  getTopStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(topStats), 500); // Simulate API delay
    });
  },
};
