import { useEffect } from "react";

type useCloseOnClickOutProps = {
  internalComponents: React.RefObject<HTMLElement | null>[];
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useCloseOnClickOut = ({
  internalComponents,
  setIsVisible,
}: useCloseOnClickOutProps) => {
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      const clickedIn = internalComponents.some((component) => {
        const el = component.current;

        return el ? el.contains(target) : false;
      });

      if (!clickedIn) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    document.addEventListener("touchstart", handleClickOutside, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener(
        "touchstart",
        handleClickOutside as EventListener
      );
    };
  }, [internalComponents, setIsVisible]);
};
