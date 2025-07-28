import zzz from "../assets/icon-sleep.svg";
import { useUserDataStore } from "../store/useUserDataStore";

const TodaySleep = () => {
  const userMoodRecord = useUserDataStore((state) => state.userMoodRecord);
  const sleep =
    userMoodRecord.length >= 1
      ? userMoodRecord[userMoodRecord.length - 1].horas_sono
      : null;

  if (sleep === null) return null;

  return (
    <section className="flex flex-col gap-4 p-5 w-full rounded-2xl bg-white">
      <div className="flex w-full bg-white gap-3">
        <img src={zzz} className="w-[19.25px] h-[22px]"></img>
        <p className="font-RedditSans text-neutral-600 font-medium text-[1.125rem]/[120%]">
          Sleep
        </p>
      </div>
      <p className="font-RedditSans text-neutral-900 font-bold text-[2rem]/[140%] tracking-[-0.019rem]">
        {sleep}
      </p>
    </section>
  );
};

export default TodaySleep;
