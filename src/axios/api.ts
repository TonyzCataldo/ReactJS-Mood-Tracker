// src/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://mood-api-k2mz.onrender.com",
});

// Interceptor de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token inválido ou expirado
      localStorage.removeItem("token");
      localStorage.removeItem("usuario_id");
      localStorage.removeItem("nome");
      localStorage.removeItem("email");
      localStorage.removeItem("imagem_url");
      window.location.href = "/signin"; // redireciona pro login
    }
    return Promise.reject(error);
  }
);

export default api;
