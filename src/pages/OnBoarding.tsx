import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

import ProfileForm from "../components/ProfileForm";
import { useRef } from "react";

import { useAuthStore } from "../store/useAuthStore";
import { useSendProfileForm } from "../hooks/useSendProfileForm/useSendProfileForm";

const OnBoarding = () => {
  const navigate = useNavigate();

  const setOnboardingRequired = useAuthStore(
    (state) => state.setOnboardingRequired
  );

  const nameRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const { profileFormFinish } = useSendProfileForm();

  const handleProfileFormFinish = async (e: React.FormEvent) => {
    const ok = await profileFormFinish(e, nameRef, fileRef);
    if (ok) {
      setOnboardingRequired(false);
      navigate("/dashboard");
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
          handleFinish={handleProfileFormFinish}
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
