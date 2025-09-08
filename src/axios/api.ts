import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const api = axios.create({
  baseURL: "https://mood-api-k2mz.onrender.com",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().resetAuth();
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  }
);

export default api;
