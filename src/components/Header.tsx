import logo from "../assets/logo.svg";
import type { Dispatch, SetStateAction } from "react";
import { useRef, useState, useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import ProfileContainer from "./ProfileContainer";

type HeaderProps = {
  imagemCarregou: boolean;
  setImagemCarregou: Dispatch<SetStateAction<boolean>>;
  setSettingsIsVisible: Dispatch<SetStateAction<boolean>>;
};

const Header = ({
  imagemCarregou,
  setImagemCarregou,
  setSettingsIsVisible,
}: HeaderProps) => {
  const { imagem } = useAuth();

  const botaoRef = useRef<HTMLButtonElement>(null);
  const handleSvgClick = () => {
    botaoRef.current?.click(); // aciona o clique do botão
  };

  const [profileIsVisible, setProfileIsVisible] = useState(false);
  const refProfileContainer = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node;

    const clicouForaDoProfile =
      refProfileContainer.current &&
      !refProfileContainer.current.contains(target);

    const clicouForaDoOutroElemento =
      botaoRef.current && !botaoRef.current.contains(target);

    if (clicouForaDoProfile && clicouForaDoOutroElemento) {
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
        onClick={() => setProfileIsVisible(!profileIsVisible)}
        ref={botaoRef}
        className="relative w-10 h-10 rounded-full overflow-hidden ml-auto z-10"
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
      <svg
        onClick={handleSvgClick}
        xmlns="http://www.w3.org/2000/svg"
        width="11"
        height="6"
        fill="none"
        viewBox="0 0 11 6"
        className="ml-2.5"
      >
        <path
          fill="#21214D"
          d="M5.727 5.86 1.102 1.265C.945 1.14.945.89 1.102.734l.625-.593a.36.36 0 0 1 .53 0l3.75 3.687L9.728.141c.156-.157.406-.157.53 0l.626.593c.156.157.156.407 0 .532L6.258 5.859a.36.36 0 0 1-.531 0Z"
        />
      </svg>
      <ProfileContainer
        profileIsVisible={profileIsVisible}
        refProfileContainer={refProfileContainer}
        setSettingsIsVisible={setSettingsIsVisible}
      />
    </header>
  );
};
export default Header;
