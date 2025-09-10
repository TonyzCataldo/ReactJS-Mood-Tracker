export const getDateWithSuffix = (date: Date) => {
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
