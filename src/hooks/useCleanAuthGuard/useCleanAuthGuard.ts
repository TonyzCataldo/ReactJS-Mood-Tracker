import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export const useCleanAuthGuard = () => {
  useEffect(() => {
    useAuthStore.getState().resetAuth();
  }, []);
};
