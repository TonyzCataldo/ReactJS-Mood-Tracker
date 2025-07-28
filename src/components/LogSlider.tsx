import { type Dispatch, type SetStateAction, type FC } from "react";
import Phase1 from "./logform/Phase1";
import Phase2 from "./logform/Phase2";
import Phase3 from "./logform/Phase3";
import Phase4 from "./logform/Phase4";
import { useAuthStore } from "../store/useAuthStore";
import { useUserDataStore } from "../store/useUserDataStore";
import { useVisibleStore } from "../store/useVisibleStore";
import api from "../axios/api";

type LogSliderProps = {
  phase: number;
  setPhase: Dispatch<SetStateAction<number>>;
};

type PhaseProps = {
  next: () => void;
  phase: number;
  setPhase?: Dispatch<SetStateAction<number>>;
};

const LogSlider = ({ phase, setPhase }: LogSliderProps) => {
  //imports do useAuthStore
  const token = useAuthStore((state) => state.token);
  const resetAuth = useAuthStore((state) => state.resetAuth);

  //

  //imports do useUserDataStore
  const logData = useUserDataStore((state) => state.logData);
  const setLogedToday = useUserDataStore((state) => state.setLogedToday);
  const setUserMoodRecord = useUserDataStore(
    (state) => state.setUserMoodRecord
  );
  const setLogData = useUserDataStore((state) => state.setLogData);

  //

  //imports do useVisibleStore
  const setLogIsVisible = useVisibleStore((state) => state.setLogIsVisible);

  const phaseComponents: FC<PhaseProps>[] = [Phase1, Phase2, Phase3, Phase4];

  const moodRegister = async () => {
    try {
      await api.post(
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

      const fetchUserMoodRecords = async () => {
        try {
          const res = await api.get(
            "https://mood-api-k2mz.onrender.com/registros",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return res.data; // isso é um array com os últimos 11 registros
        } catch (err) {
          console.error("Erro ao buscar registros:", err);
          return [];
        }
      };

      const records = await fetchUserMoodRecords();
      setUserMoodRecord(records);
      setLogData({ humor: "", descricao: "", horasSono: "", tags: [] });
    } catch (error: any) {
      console.log(
        "Erro ao registrar:",
        error.response?.data?.msg || error.message
      );
    }
  };

  const sendForm = () => {
    if (!token) {
      resetAuth();
      return;
    }
    moodRegister();
  };

  const next = () => {
    setPhase((current) => {
      if (current === phaseComponents.length - 1) {
        sendForm();
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
