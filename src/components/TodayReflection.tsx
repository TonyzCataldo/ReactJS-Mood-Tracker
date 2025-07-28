import star from "../assets/icon-reflection.svg";
import { useUserDataStore } from "../store/useUserDataStore";

const TodayReflection = () => {
  const userMoodRecord = useUserDataStore((state) => state.userMoodRecord);

  const reflection =
    userMoodRecord.length < 1
      ? null
      : userMoodRecord[userMoodRecord.length - 1].descricao;

  const tags =
    userMoodRecord.length < 1
      ? null
      : userMoodRecord[userMoodRecord.length - 1].como_se_sentiu;

  const formated = tags
    ?.split(",")
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  if (reflection === null || formated === null) return null;

  return (
    <section className="p-5 flex flex-col bg-white rounded-2xl gap-4 lg:h-full">
      <div className="flex items-center gap-3">
        <img className="w-[22px] h-[22px]" src={star}></img>
        <p className="font-RedditSans text-neutral-600 font-medium text-[1.125rem]/[120%]">
          Reflection of the day
        </p>
      </div>
      <p className="font-RedditSans text-neutral-900 font-medium text-[1.125rem]/[120%] break-words min-h-20">
        {reflection}
      </p>
      <p className="font-RedditSans text-neutral-600 font-medium italic flex flex-wrap gap-3 text-[1.125rem]/[130%] ">
        {formated?.map((tag, index) => (
          <span key={index}>#{tag}</span>
        ))}
      </p>
    </section>
  );
};

export default TodayReflection;
