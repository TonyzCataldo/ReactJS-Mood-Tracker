//import { useAuth } from "../context/AuthContext";
import { useAuthStore } from "../store/useAuthStore";
import { getDateWithSuffix } from "../utils/getDateWithSuffix/getDateWithSuffix";
import { getFirstName } from "../utils/getFirtsName.ts/getFirstName";
const HelloContainer = () => {
  const nome = useAuthStore((state) => state.nome);

  const firstName = getFirstName(nome);

  const today = getDateWithSuffix(new Date());

  return (
    <section className="flex flex-col  items-center gap-4 md:gap-2.5">
      <h2 className="text-center font-RedditSans font-bold text-[1.75rem]/[130%] md:text-[2rem]/[140%] tracking-[-0.019rem] text-blue-600">{`Hello, ${firstName}!`}</h2>
      <h1 className="text-center font-RedditSans font-bold text-[2.875rem]/[120%] tracking-[-0.125rem] md:text-[3.25rem]/[140%] text-neutral-900">
        How are you feeling today?
      </h1>
      <p className="text-center font-RedditSans font-medium text-[1.125rem]/[120%] text-neutral-600">
        {today}
      </p>
    </section>
  );
};

export default HelloContainer;
