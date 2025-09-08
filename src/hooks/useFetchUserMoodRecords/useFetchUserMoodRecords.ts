import { useEffect, useState } from "react";
import api from "../../axios/api";
import { useAuthStore } from "../../store/useAuthStore";
import { useUserDataStore } from "../../store/useUserDataStore";

export const useFetchUserMoodRecords = () => {
  const token = useAuthStore((state) => state.token);
  const setUserMoodRecord = useUserDataStore(
    (state) => state.setUserMoodRecord
  );

  const [fetchingRecords, setFetchingRecords] = useState(true);

  useEffect(() => {
    const fetchUserMoodRecords = async () => {
      try {
        const res = await api.get("/registros", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return res.data;
      } catch (error) {
        console.error("Erro ao buscar registros:", error);
        return [];
      }
    };
    const getRecords = async () => {
      const records = await fetchUserMoodRecords();
      setUserMoodRecord(records);
      setFetchingRecords(false);
    };
    getRecords();
  }, []);
  return { fetchingRecords };
};
