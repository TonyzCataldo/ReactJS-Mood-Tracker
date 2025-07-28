import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import DefaultContainer from "../components/DefaultContainer";
import SettingsHeader from "../components/SettingsHeader";
import ProfileForm from "../components/ProfileForm";
import HelloContainer from "../components/HelloContainer";
import Button from "../components/Button";
import LogHeader from "../components/LogHeader";
import LogSlider from "../components/LogSlider";
import UserResultContainer from "../components/UserResultContainer";
import TrendContainer from "../components/TrendContainer";
import TodayMood from "../components/TodayMood";
import TodaySleep from "../components/TodaySleep";
import TodayReflection from "../components/TodayReflection";
import { useVisibleStore } from "../store/useVisibleStore";
import { useAuthStore } from "../store/useAuthStore";
import { useUserDataStore } from "../store/useUserDataStore";
import api from "../axios/api";

const Dashboard = () => {
  //imports do AuthStore
  const token = useAuthStore((state) => state.token);
  const nome = useAuthStore((state) => state.nome);
  const email = useAuthStore((state) => state.email);
  const imagem = useAuthStore((state) => state.imagem);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const setNome = useAuthStore((state) => state.setNome);
  const setImagem = useAuthStore((state) => state.setImagem);
  const setEmail = useAuthStore((state) => state.setEmail);
  const resetAuth = useAuthStore((state) => state.resetAuth);
  //

  //imports do UserDataStore
  const setLogedToday = useUserDataStore((state) => state.setLogedToday);
  const setUserMoodRecord = useUserDataStore(
    (state) => state.setUserMoodRecord
  );
  const logedToday = useUserDataStore((state) => state.logedToday);

  //

  //imports do VisibleStore
  const settingsIsVisible = useVisibleStore((state) => state.settingsIsVisible);
  const logIsVisible = useVisibleStore((state) => state.logIsVisible);
  const setSettingsIsVisible = useVisibleStore(
    (state) => state.setSettingsIsVisible
  );
  const setLogIsVisible = useVisibleStore((state) => state.setLogIsVisible);
  //

  const [fetchingRecords, setFetchingRecords] = useState(true);

  const [phase, setPhase] = useState(0);

  const nameRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  //

  const fetchUserData = async () => {
    if (!token) return;

    try {
      const res = await axios.get("https://mood-api-k2mz.onrender.com/me", {
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
  };

  //
  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const file = fileRef.current?.files?.[0];

    if (!token) {
      resetAuth();
      return;
    }

    try {
      // 1. Envia apenas o nome para /onboarding
      await api.post(
        "https://mood-api-k2mz.onrender.com/onboarding",
        { nome: name || "Jane Appleseed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // 2. Se houver imagem, envia separadamente para /upload-image
      if (file) {
        const formData = new FormData();
        formData.append("imagem", file);

        await axios.post(
          "https://mood-api-k2mz.onrender.com/upload-image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      fetchUserData();
    } catch (error) {
      console.error("Erro no ao atualizar dados:", error);
    }
  };

  //o nome imagem e email é verificado pelo localstorage, então quando monta o componente verifica se tem essas informacoes, se não tiver, roda a funcão que vai puxar no back o nome img e email do usuario e seta automatico tanto no localstorage quanto nos estados.
  useEffect(() => {
    if (!isHydrated) return;
    if (nome && email && imagem) return;
    fetchUserData();
  }, [isHydrated]);

  //Verificar se o usuario logou o humor no dia ao montar o componente para garantir que o usuario logue uma vez somente.
  useEffect(() => {
    const verifyLogedToday = async () => {
      try {
        // const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://mood-api-k2mz.onrender.com/ja-registrou-hoje",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLogedToday(res.data.ja_registrou);
      } catch (error) {
        console.error("Erro ao verificar registro do dia:", error);
      }
    };
    verifyLogedToday();
  }, []);

  //verifica os registros do usuario ao montar o componente
  useEffect(() => {
    const fetchUserMoodRecords = async () => {
      try {
        const res = await axios.get(
          "https://mood-api-k2mz.onrender.com/registros",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return res.data;
      } catch (error) {
        console.error("Erro ao buscar registros:", error);
        return [];
      }
    };
    const getRecords = async () => {
      const records = await fetchUserMoodRecords();
      setUserMoodRecord(records);
      setFetchingRecords(false);
    };
    getRecords();
  }, []);

  //espera definir aquilo que for necessario ao montar o componente para somente depois mostrar o dashboard ao user
  if (!nome || !imagem || logedToday === null || fetchingRecords === true)
    return (
      <div className="flex justify-center items-center h-[60vh] text-gray-600 text-lg">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin mr-2" />
        Loading...
      </div>
    );

  return (
    <div className="pt-8 md:pt-10 pb-20 relative flex flex-col items-center">
      <div
        className="h-full min-h-dvh absolute bg-neutral-900/70 w-full top-0 z-20"
        style={
          settingsIsVisible || logIsVisible
            ? { display: "block" }
            : { display: "none" }
        }
      ></div>
      <Header />

      <DefaultContainer
        py="settings"
        isVisible={settingsIsVisible}
        setIsVisible={setSettingsIsVisible}
      >
        <SettingsHeader />
        <ProfileForm
          buttonText="Save changes"
          buttonPy="1rem"
          nameRef={nameRef}
          fileRef={fileRef}
          handleFinish={handleFinish}
        />
      </DefaultContainer>

      <main className="w-[91.47%] md:w-[91.665%] max-w-[73.125rem] mt-12 md:mt-16 flex flex-col items-center">
        <HelloContainer />
        <form
          className={`justify-center my-12 lg:my-16 ${
            logedToday === false ? "flex" : "hidden"
          }`}
          onSubmit={(e) => {
            e.preventDefault();
            setLogIsVisible(true);
          }}
        >
          <Button
            buttonText="Log today's mood"
            py="1rem"
            fontSize="1.25rem"
            lineHeight="140%"
            letterSpacing="0px"
          />
        </form>
        <DefaultContainer
          py="default"
          isVisible={logIsVisible}
          setIsVisible={setLogIsVisible}
          setPhase={setPhase}
          backgroundGradient="linear-gradient(180deg, #F5F5FF 72.99%, #E0E0FF 100%)"
        >
          <LogHeader phase={phase} />
          <LogSlider
            phase={phase}
            setPhase={setPhase}
            //setLogIsVisible={setLogIsVisible}
          />
        </DefaultContainer>
        <div
          className={`${
            logedToday === true ? "flex" : "hidden"
          } w-full flex-col gap-5 mt-12 mb-8 lg:mt-16 lg:flex-row lg:gap-8`}
        >
          <TodayMood />
          <div className="flex flex-col gap-5 lg:w-[39.1%] lg:justify-between">
            <TodaySleep />
            <TodayReflection />
          </div>
        </div>
        <div className="flex flex-col w-full gap-8 min-[780px]:flex-row">
          <UserResultContainer />
          <TrendContainer />
        </div>
      </main>
    </div>
  );
};
export default Dashboard;
