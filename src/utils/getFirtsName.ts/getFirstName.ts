export const getFirstName = (name: string | null) => {
  const firtsName = name?.split(" ")[0] || "";
  const capitalizedFirtsName =
    firtsName.charAt(0).toUpperCase() + firtsName.slice(1);
  return capitalizedFirtsName;
};
