// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

// Interceptor de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem("token");
      localStorage.removeItem("nome");
      localStorage.removeItem("imagem_url");
      window.location.href = "/signin"; // redireciona pro login
    }
    return Promise.reject(error);
  }
);

export default api;
