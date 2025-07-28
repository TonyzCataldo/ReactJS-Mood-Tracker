//import { useAuth } from "../context/AuthContext";
import { useAuthStore } from "../store/useAuthStore";
const HelloContainer = () => {
  const nome = useAuthStore((state) => state.nome);

  const firstNome = nome?.split(" ")[0] || "";
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const formatDateWithSuffix = (date: Date): string => {
    const day = date.getDate();

    const getDaySuffix = (day: number) => {
      if (day >= 11 && day <= 13) return "th";
      const lastDigit = day % 10;
      if (lastDigit === 1) return "st";
      if (lastDigit === 2) return "nd";
      if (lastDigit === 3) return "rd";
      return "th";
    };

    const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
    const month = date.toLocaleDateString("en-US", { month: "long" });
    const year = date.getFullYear();

    return `${weekday}, ${month} ${day}${getDaySuffix(day)}, ${year}`;
  };

  const today = new Date();

  return (
    <section className="flex flex-col  items-center gap-4 md:gap-2.5">
      <h2 className="text-center font-RedditSans font-bold text-[1.75rem]/[130%] md:text-[2rem]/[140%] tracking-[-0.019rem] text-blue-600">{`Hello, ${capitalizeFirstLetter(
        firstNome
      )}!`}</h2>
      <h1 className="text-center font-RedditSans font-bold text-[2.875rem]/[120%] tracking-[-0.125rem] md:text-[3.25rem]/[140%] text-neutral-900">
        How are you feeling today?
      </h1>
      <p className="text-center font-RedditSans font-medium text-[1.125rem]/[120%] text-neutral-600">
        {formatDateWithSuffix(today)}
      </p>
    </section>
  );
};

export default HelloContainer;
