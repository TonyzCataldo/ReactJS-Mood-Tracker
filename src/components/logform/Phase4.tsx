import type { Dispatch, SetStateAction } from "react";
import Button from "../Button";
import { useUserDataStore } from "../../store/useUserDataStore";

type PhaseProps = {
  next: () => void;
  phase: number;
  setPhase?: Dispatch<SetStateAction<number>>;
  setLogIsVisible?: (value: boolean) => void;
};

const Phase4 = ({ next, phase, setPhase, setLogIsVisible }: PhaseProps) => {
  const sleepOptions = [
    "0-2 hours",
    "3-4 hours",
    "5-6 hours",
    "7-8 hours",
    "9+ hours",
  ];

  const logData = useUserDataStore((state) => state.logData);
  const logedToday = useUserDataStore((state) => state.logedToday);
  const setLogData = useUserDataStore((state) => state.setLogData);

  const phase4Function = (e: React.FormEvent) => {
    e.preventDefault();
    next();
  };

  const closeFunction = (e: React.FormEvent) => {
    e.preventDefault();
    if (setPhase && setLogIsVisible) {
      setPhase(0);
      setLogIsVisible(false);
    }
  };

  if (logedToday) {
    return (
      <div className="flex flex-col items-center gap-6 md:gap-8">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <svg
            className="md:w-12 md:h-12"
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0" />

            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="#CCCCCC"
              strokeWidth="0.048"
            />

            <g id="SVGRepo_iconCarrier">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z"
                fill="#4865db"
              />
            </g>
          </svg>
          <p className="font-bold font-RedditSans text-[1.75rem]/[130%] tracking-[-0.019rem] md:text-[2rem]/[140%] text-neutral-900 text-center">
            Logged mood successfully!
          </p>
        </div>
        <form className="flex flex-col" onSubmit={closeFunction}>
          <Button
            buttonText="Close"
            py="1rem"
            fontSize="1.5rem"
            lineHeight="140%"
            letterSpacing="0px"
          />
        </form>
      </div>
    );
  }
  return (
    <div
      className="flex-col gap-6 md:gap-8"
      style={phase === 3 ? { display: "flex" } : { display: "none" }}
    >
      <h2 className="font-bold font-RedditSans text-[1.75rem]/[130%] tracking-[-0.019rem] md:text-[2rem]/[140%] text-neutral-900">
        How many hours did you sleep last night?
      </h2>
      <div className="flex flex-col gap-3">
        {sleepOptions.map((option) => (
          <div
            key={option}
            onClick={() => setLogData({ ...logData, horasSono: option })}
            className="bg-white px-5 py-3.5 rounded-[0.625rem] flex items-center border-2 border-transparent cursor-pointer hover:bg-transparent"
            style={
              logData.horasSono === option
                ? { borderColor: "#4865db" }
                : { borderColor: "#E0E6FA" }
            }
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                setLogData({ ...logData, horasSono: option });
              }
            }}
          >
            <span
              className={`w-5 h-5 rounded-full ${
                logData.horasSono === option
                  ? "border-[5px] border-blue-600"
                  : "border-2 border-blue-200"
              }`}
            ></span>
            <p className="font-RedditSans font-semibold text-[1.25rem]/[140%] tracking-normal text-neutral-900 ml-3">
              {option}
            </p>
          </div>
        ))}
      </div>
      <form className="flex flex-col" onSubmit={phase4Function}>
        <Button
          formSubmit={true}
          buttonText="Submit"
          py="1rem"
          fontSize="1.5rem"
          lineHeight="140%"
          letterSpacing="0px"
        />
      </form>
    </div>
  );
};
export default Phase4;
