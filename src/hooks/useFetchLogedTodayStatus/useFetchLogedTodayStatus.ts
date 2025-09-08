import { useEffect } from "react";
import api from "../../axios/api";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserDataStore } from "../../store/useUserDataStore";

export const useFetchLogedTodayStatus = () => {
  const token = useAuthStore((state) => state.token);
  const setLogedToday = useUserDataStore((state) => state.setLogedToday);
  useEffect(() => {
    const fetchLogedToday = async () => {
      try {
        const res = await api.get("/ja-registrou-hoje", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLogedToday(res.data.ja_registrou);
      } catch (error) {
        console.log("Error to verify today data", error);
      }
    };
    fetchLogedToday();
  }, []);
};
