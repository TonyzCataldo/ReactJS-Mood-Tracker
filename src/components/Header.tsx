import logo from "../assets/logo.svg";
import { useRef, useState, useEffect } from "react";

import ProfileContainer from "./ProfileContainer";
import { useAuthStore } from "../store/useAuthStore";

const Header = () => {
  const imagem = useAuthStore((state) => state.imagem);

  const [imagemCarregou, setImagemCarregou] = useState(false);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<HTMLDivElement>(null);

  const toggleProfileVisible = () => {
    setProfileIsVisible((prev) => !prev);
  };

  const [profileIsVisible, setProfileIsVisible] = useState(false);
  const refProfileContainer = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    const clicouFora =
      (!refProfileContainer.current ||
        !refProfileContainer.current.contains(target)) &&
      (!botaoRef.current || !botaoRef.current.contains(target)) &&
      (!svgRef.current || !svgRef.current.contains(target));

    if (clicouFora) {
      setProfileIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex relative items-center w-[91.47%] md:w-[91.665%] max-w-[73.125rem]">
      <img src={logo}></img>

      <button
        onClick={toggleProfileVisible}
        ref={botaoRef}
        className="relative w-10 h-10 rounded-full overflow-hidden ml-auto z-10 cursor-pointer"
      >
        {!imagemCarregou && (
          <img
            src="/avatar-placeholder.svg"
            alt="Imagem padrão"
            className="w-full h-full top-0 absolute object-cover"
          />
        )}

        <img
          src={imagem || "/avatar-placeholder.svg"}
          alt="Imagem do usuário"
          className={`w-full absolute top-0 h-full object-cover transition-opacity duration-300 ${
            imagemCarregou ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImagemCarregou(true)}
          onError={() => setImagemCarregou(false)}
        />
      </button>
      <div
        ref={svgRef}
        onClick={toggleProfileVisible}
        className="pl-2.5 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="11"
          height="6"
          fill="none"
          viewBox="0 0 11 6"
        >
          <path
            fill="#21214D"
            d="M5.727 5.86 1.102 1.265C.945 1.14.945.89 1.102.734l.625-.593a.36.36 0 0 1 .53 0l3.75 3.687L9.728.141c.156-.157.406-.157.53 0l.626.593c.156.157.156.407 0 .532L6.258 5.859a.36.36 0 0 1-.531 0Z"
          />
        </svg>
      </div>
      <ProfileContainer
        profileIsVisible={profileIsVisible}
        refProfileContainer={refProfileContainer}
        setProfileIsVisible={setProfileIsVisible}
      />
    </header>
  );
};
export default Header;
