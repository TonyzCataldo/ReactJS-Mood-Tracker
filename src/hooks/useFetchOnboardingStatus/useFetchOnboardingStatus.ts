import { useCallback, useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import api from "../../axios/api";

export const useFetchOnboardingStatus = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const token = useAuthStore((state) => state.token);
  const setOnboardingRequired = useAuthStore(
    (state) => state.setOnboardingRequired
  );
  const resetAuth = useAuthStore((state) => state.resetAuth);

  const navigate = useNavigate();

  const fetchOnboardingStatus = useCallback(async () => {
    try {
      const res = await api.get("/check-onboarding", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOnboardingRequired(res.data.onboarding_required);
    } catch (error) {
      console.log("Error to check onboarding required status", error);
      resetAuth();
      navigate("/signin");
    }
  }, [token, setOnboardingRequired, resetAuth, navigate]);

  useEffect(() => {
    if (!isHydrated) return;
    if (isAuthenticated) {
      fetchOnboardingStatus();
    }
  }, [isHydrated, isAuthenticated, fetchOnboardingStatus]);
};
