import { type Dispatch, type SetStateAction, type FC } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Phase1 from "./logform/Phase1";
import Phase2 from "./logform/Phase2";
import Phase3 from "./logform/Phase3";
import Phase4 from "./logform/Phase4";

type LogSliderProps = {
  phase: number;
  setPhase: Dispatch<SetStateAction<number>>;
  setLogIsVisible: Dispatch<SetStateAction<boolean>>;
};

type PhaseProps = {
  next: () => void;
  phase: number;
  setPhase?: Dispatch<SetStateAction<number>>;
  setLogIsVisible?: Dispatch<SetStateAction<boolean>>;
};

const LogSlider = ({ phase, setPhase, setLogIsVisible }: LogSliderProps) => {
  const {
    logData,
    setLogedToday,
    fetchUserMoodRecords,
    setUserMoodRecord,
    setIsAuthenticated,
  } = useAuth();

  const phaseComponents: FC<PhaseProps>[] = [Phase1, Phase2, Phase3, Phase4];

  const moodRegister = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "https://mood-api-k2mz.onrender.com/registro",
        {
          humor: logData.humor,
          como_se_sentiu: logData.tags.join(", "),
          descricao: logData.descricao,
          horas_sono: logData.horasSono,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLogedToday(true);

      console.log("Registro salvo com sucesso:", res.data);
      const records = await fetchUserMoodRecords();
      setUserMoodRecord(records);
    } catch (error: any) {
      console.log(
        "Erro ao registrar:",
        error.response?.data?.msg || error.message
      );
    }
  };

  const sendForm = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario_id");
      localStorage.removeItem("nome");
      localStorage.removeItem("email");
      localStorage.removeItem("imagem_url");
      setIsAuthenticated(false);
      return;
    }
    moodRegister();
  };

  const next = () => {
    setPhase((current) => {
      if (current === phaseComponents.length - 1) {
        sendForm(); // por exemplo, salvar na API
        return current;
      }

      return current + 1;
    });
  };

  return (
    <div>
      <div className="relative  overflow-hidden transition-all duration-300">
        <div
          className="flex transition-transform duration-600 ease-in-out"
          style={{ transform: `translateX(-${phase * 100}%)` }}
        >
          {phaseComponents.map((Component, index) => (
            <div key={index} className="w-full shrink-0">
              <Component
                next={next}
                phase={phase}
                {...(index === 3 && {
                  setPhase,
                  setLogIsVisible,
                })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LogSlider;
