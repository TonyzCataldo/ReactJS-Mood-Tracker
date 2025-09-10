import type { Dispatch, SetStateAction } from "react";
import { useVisibleStore } from "../store/useVisibleStore";
import { useAuthStore } from "../store/useAuthStore";

type ProfileContainer = {
  refProfileContainer: React.RefObject<HTMLDivElement | null>;
  setProfileIsVisible: Dispatch<SetStateAction<boolean>>;
};

const ProfileContainer = ({
  refProfileContainer,
  setProfileIsVisible,
}: ProfileContainer) => {
  // estados do AuthStore
  const resetAuth = useAuthStore((state) => state.resetAuth);
  const nome = useAuthStore((state) => state.nome);
  const email = useAuthStore((state) => state.email);

  // estados do VisibleStore
  const setSettingsIsVisible = useVisibleStore(
    (state) => state.setSettingsIsVisible
  );

  return (
    <div
      ref={refProfileContainer}
      className="absolute flex-col w-full top-[56px] bg-white rounded-[0.5rem] px-4 py-3 sm:w-[12.5rem] sm:right-0"
      style={{
        boxShadow: "0px 5px 8px 0px rgba(33, 33, 77, 0.16)",
      }}
    >
      <div className="flex flex-col gap-0.5 pb-3 border-b border-blue-100">
        <h3 className="font-RedditSans text-neutral-900 text-[1.125rem]/[120%] font-medium truncate">
          {nome}
        </h3>
        <p className="font-RedditSans text-neutral-300 text-[0.938rem]/[140%] tracking-[-0.019rem] truncate">
          {email}
        </p>
      </div>
      <button
        className="flex items-center py-3 gap-2.5 font-RedditSans text-neutral-900 text-[0.938rem]/[140%] tracking-[-0.019rem] cursor-pointer"
        onClick={() => {
          setSettingsIsVisible(true);
          setProfileIsVisible(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            fill="#21214D"
            d="M14.345 7.37c.032.42.032.84 0 1.227l1.033.614c.291.161.453.517.356.872-.356 1.356-1.098 2.583-2.067 3.584-.258.226-.646.29-.936.13l-1.034-.614a5.728 5.728 0 0 1-1.065.613v1.195a.758.758 0 0 1-.582.743 8.024 8.024 0 0 1-4.1 0c-.323-.065-.582-.42-.582-.743v-1.195a5.73 5.73 0 0 1-1.065-.613l-1.034.613c-.29.162-.678.097-.936-.129-.969-1.001-1.711-2.228-2.067-3.584a.765.765 0 0 1 .356-.872l1.033-.614c-.032-.161-.032-.42-.032-.613 0-.162 0-.42.032-.614L.622 6.79a.765.765 0 0 1-.356-.873c.356-1.356 1.098-2.583 2.067-3.584.258-.226.646-.29.936-.13l1.034.614a5.73 5.73 0 0 1 1.065-.613V1.009c0-.355.226-.646.582-.743a8.024 8.024 0 0 1 4.1 0c.323.065.582.42.582.743v1.195c.323.129.807.42 1.065.613l1.034-.613c.29-.162.678-.097.936.129.969 1.001 1.711 2.228 2.067 3.584a.765.765 0 0 1-.356.872l-1.033.581Zm-1.711 2.067c.258-1.356.258-1.518 0-2.874l1.42-.807c-.193-.581-.71-1.421-1.097-1.873l-1.421.807c-1.001-.872-1.163-.969-2.454-1.42V1.622c-.29-.033-.775-.097-1.066-.097-.323 0-.807.064-1.098.097v1.646c-1.291.452-1.42.55-2.454 1.421l-1.42-.807c-.485.549-.84 1.195-1.098 1.873l1.42.807c-.258 1.356-.258 1.518 0 2.874l-1.42.807c.193.581.71 1.421 1.097 1.873l1.421-.807c1.001.872 1.163.968 2.454 1.42v1.647c.29.033.775.097 1.098.097.29 0 .775-.064 1.066-.097v-1.646c1.291-.453 1.42-.55 2.454-1.421l1.42.807c.388-.452.905-1.292 1.099-1.873l-1.421-.807ZM8.016 4.884c1.68 0 3.1 1.42 3.1 3.1 0 1.711-1.42 3.1-3.1 3.1a3.1 3.1 0 0 1-3.1-3.1c0-1.68 1.389-3.1 3.1-3.1Zm0 4.65c.84 0 1.55-.678 1.55-1.55 0-.84-.71-1.55-1.55-1.55-.872 0-1.55.71-1.55 1.55 0 .872.678 1.55 1.55 1.55Z"
          />
        </svg>
        Settings
      </button>
      <button
        className="flex items-center gap-2.5 font-RedditSans text-neutral-900 text-[0.938rem]/[140%] tracking-[-0.019rem] cursor-pointer"
        onClick={() => resetAuth()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="none"
          viewBox="0 0 16 16"
        >
          <path
            fill="#21214D"
            d="M3.001 2h2.627c.187 0 .375.188.375.375v.75a.38.38 0 0 1-.375.375H3a1.5 1.5 0 0 0-1.5 1.5v6c0 .844.656 1.5 1.5 1.5h2.627c.187 0 .375.188.375.375v.75a.38.38 0 0 1-.375.375H3A3.001 3.001 0 0 1 0 11V5c0-1.656 1.344-3 3.001-3Zm7.223.625c.125-.156.375-.156.531 0l5.128 5.125a.36.36 0 0 1 0 .531l-5.128 5.125c-.156.156-.406.156-.531 0l-.626-.625c-.156-.125-.156-.375 0-.531l3.533-3.438H5.378a.361.361 0 0 1-.376-.374v-.876a.38.38 0 0 1 .376-.375h7.753L9.598 3.781c-.156-.156-.156-.406 0-.531l.626-.625Z"
          />
        </svg>
        Logout
      </button>
    </div>
  );
};

export default ProfileContainer;
