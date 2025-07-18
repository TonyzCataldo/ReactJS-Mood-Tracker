import { createContext, useContext, useEffect, useState } from "react";
import api from "../axios/api";
import type { ReactNode } from "react";
import axios from "axios";

type LogData = {
  humor: string;
  horasSono: string;
  descricao: string;
  tags: string[];
};
type MoodRegistroType = {
  data: string;
  humor: string;
  como_se_sentiu: string;
  descricao: string;
  horas_sono: string;
};

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
  logData: LogData;
  setLogData: React.Dispatch<React.SetStateAction<LogData>>;
  logError: boolean;
  setLogError: (logError: boolean) => void;
  logedToday: boolean | null;
  setLogedToday: React.Dispatch<React.SetStateAction<boolean | null>>;
  userMoodRecord: MoodRegistroType[];
  setUserMoodRecord: React.Dispatch<React.SetStateAction<MoodRegistroType[]>>;
  fetchUserMoodRecords: () => Promise<MoodRegistroType[]>;
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

  const [logError, setLogError] = useState(false);

  const [logedToday, setLogedToday] = useState<boolean | null>(null);

  const [logData, setLogData] = useState<LogData>({
    humor: "",
    horasSono: "",
    descricao: "",
    tags: [],
  });

  const [userMoodRecord, setUserMoodRecord] = useState<MoodRegistroType[]>([]);

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
      localStorage.removeItem("usuario_id");
      localStorage.removeItem("nome");
      localStorage.removeItem("email");
      localStorage.removeItem("imagem_url");
      setNome(null);
      setEmail(null);
      setImagem(null);
      setOnboardingRequired(null);
      setIsAuthenticated(false);
      window.location.href = "/signin"; // redireciona pro login
    }
  };

  const fetchUserMoodRecords = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://mood-api-k2mz.onrender.com/registros",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Registros recebidos:", res.data);
      return res.data; // isso é um array com os últimos 11 registros
    } catch (err) {
      console.error("Erro ao buscar registros:", err);
      return [];
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOnboardingStatus();
      console.log("rodou o effect do context");
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
        logData,
        setLogData,
        logError,
        setLogError,
        logedToday,
        setLogedToday,
        userMoodRecord,
        setUserMoodRecord,
        fetchUserMoodRecords,
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
