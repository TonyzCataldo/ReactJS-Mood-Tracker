import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import axios from "axios";
import ProfileForm from "../components/ProfileForm";
import { useRef } from "react";
import { useAuth } from "../context/AuthContext";

const OnBoarding = () => {
  const navigate = useNavigate();

  const { fetchOnboardingStatus, setOnboardingRequired } = useAuth();

  const nameRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  //funcao que por hora seta no usuario o onboarding como false e direciona pra dashboard depois vai tambem enviar nome e img pro usuario
  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const file = fileRef.current?.files?.[0];
    const token = localStorage.getItem("token");

    try {
      // 1. Envia apenas o nome para /onboarding
      await axios.post(
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

      // 3. Atualiza contexto e navega
      fetchOnboardingStatus();
      setOnboardingRequired(false);
      navigate("/dashboard");
    } catch (error) {
      console.error("Erro no onboarding:", error);
    }
  };

  return (
    <div className="flex flex-col items-center py-20">
      <img src={logo} alt="mood tracker logo" className="mb-8" />
      <main className="w-[91.47%] max-w-[33.125rem] bg-white py-10 px-4 rounded-2xl sm:px-8 gap-8 flex flex-col">
        <div className="flex flex-col gap-2">
          <h1 className="font-RedditSans font-bold text-[2rem]/[140%] tracking-[-0.019rem] text-neutral-900 ">
            Personalize your experience
          </h1>
          <p className=" font-RedditSans text-[1.125rem]/[140%] tracking-[-0.019rem] text-neutral-600">
            Add your name and a profile picture to make Mood yours.
          </p>
        </div>
        <ProfileForm
          handleFinish={handleFinish}
          nameRef={nameRef}
          fileRef={fileRef}
          buttonText="Start Tracking"
          buttonPy="0.75rem"
        />
      </main>
    </div>
  );
};

export default OnBoarding;
