import { createContext, useContext, useEffect, useState } from "react";
import api from "../axios/api";
import type { ReactNode } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  onboardingRequired: boolean | null;
  nome: string | null;
  email: string | null;
  imagem: string | null;
  setIsAuthenticated: (auth: boolean) => void;
  setOnboardingRequired: (value: boolean | null) => void;
  fetchOnboardingStatus: () => void;
  setNome: (nome: string | null) => void;
  setEmail: (email: string | null) => void;
  setImagem: (img: string | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    Boolean(localStorage.getItem("token"))
  );

  const [onboardingRequired, setOnboardingRequired] = useState<boolean | null>(
    null
  );

  const [nome, setNome] = useState<string | null>(localStorage.getItem("nome"));

  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email")
  );

  const [imagem, setImagem] = useState<string | null>(
    localStorage.getItem("imagem_url")
  );

  const fetchOnboardingStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await api.get("/check-onboarding", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOnboardingRequired(res.data.onboarding_required);
    } catch (err) {
      console.error("Erro ao checar onboarding:", err);
      localStorage.removeItem("token");
      localStorage.removeItem("nome");
      localStorage.removeItem("imagem_url");
      window.location.href = "/signin"; // redireciona pro login
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOnboardingStatus();
    }
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        onboardingRequired,
        nome,
        email,
        imagem,
        setIsAuthenticated,
        setOnboardingRequired,
        fetchOnboardingStatus,
        setNome,
        setEmail,
        setImagem,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
};
