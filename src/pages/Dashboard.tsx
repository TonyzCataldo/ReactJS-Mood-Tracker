import { useState, useRef } from "react";
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

import { useFetchUserData } from "../hooks/useFetchUserData/useFetchUserData";
import { useSendProfileForm } from "../hooks/useSendProfileForm/useSendProfileForm";
import { useFetchLogedTodayStatus } from "../hooks/useFetchLogedTodayStatus/useFetchLogedTodayStatus";
import { useFetchUserMoodRecords } from "../hooks/useFetchUserMoodRecords/useFetchUserMoodRecords";

const Dashboard = () => {
  //imports do AuthStore

  const nome = useAuthStore((state) => state.nome);

  const imagem = useAuthStore((state) => state.imagem);

  //

  //imports do UserDataStore

  const logedToday = useUserDataStore((state) => state.logedToday);

  //imports do VisibleStore
  const settingsIsVisible = useVisibleStore((state) => state.settingsIsVisible);
  const logIsVisible = useVisibleStore((state) => state.logIsVisible);
  const setSettingsIsVisible = useVisibleStore(
    (state) => state.setSettingsIsVisible
  );
  const setLogIsVisible = useVisibleStore((state) => state.setLogIsVisible);
  //

  const [phase, setPhase] = useState(0);

  const nameRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  //

  // call the hook useEffect and exposes the function
  const { fetchUserData } = useFetchUserData();

  const { profileFormFinish } = useSendProfileForm();
  //

  const handleProfileFormFinish = async (e: React.FormEvent) => {
    const ok = await profileFormFinish(e, nameRef, fileRef);
    if (ok) {
      fetchUserData();
    }
  };

  // hook to verify if user loged mood today
  useFetchLogedTodayStatus();

  // call the hook useeffect and exposes the loading state
  const { fetchingRecords } = useFetchUserMoodRecords();

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
          handleFinish={handleProfileFormFinish}
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
