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

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "mood_preset");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/di8rehik4/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    return {
      url: data.secure_url,
      public_id: data.public_id,
    };
  };

  //funcao que por hora seta no usuario o onboarding como false e direciona pra dashboard depois vai tambem enviar nome e img pro usuario
  const handleFinish = async (e: React.FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const file = fileRef.current?.files?.[0];

    let imagemUrl = "/avatar-placeholder.svg"; // default
    let imagemPublicId = "";

    try {
      if (file) {
        const uploadResult = await uploadImageToCloudinary(file);
        imagemUrl = uploadResult.url; // era uploadResult.secure_url
        imagemPublicId = uploadResult.public_id;
      }

      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("nome", name || "Jane Appleseed");
      formData.append("imagem_url", imagemUrl);
      formData.append("imagem_public_id", imagemPublicId);

      await axios.post("http://localhost:5000/onboarding", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchOnboardingStatus();
      setOnboardingRequired(false);

      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao atualizar onboarding_required:", error);
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
        />
      </main>
    </div>
  );
};

export default OnBoarding;
