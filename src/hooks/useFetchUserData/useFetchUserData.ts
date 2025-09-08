import { useCallback, useEffect } from "react";
import api from "../../axios/api";
import { useAuthStore } from "../../store/useAuthStore";

export const useFetchUserData = () => {
  const token = useAuthStore((state) => state.token);
  const setNome = useAuthStore((state) => state.setNome);
  const setImagem = useAuthStore((state) => state.setImagem);
  const setEmail = useAuthStore((state) => state.setEmail);
  const nome = useAuthStore((state) => state.nome);
  const email = useAuthStore((state) => state.email);
  const imagem = useAuthStore((state) => state.imagem);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const fetchUserData = useCallback(async () => {
    if (!token) return;
    try {
      const res = await api.get("/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const { nome, imagem_url, email } = res.data;

      setNome(nome);
      setImagem(imagem_url);
      setEmail(email);
    } catch (err) {
      console.error("Erro ao buscar dados do usuário:", err);
    }
  }, [token, setNome, setImagem, setEmail]);

  useEffect(() => {
    if (!isHydrated) return;
    if (nome && imagem && email) return;
    fetchUserData();
  }, [isHydrated]);

  return { fetchUserData };
};
