import api from "../../axios/api";
import { useAuthStore } from "../../store/useAuthStore";

export const useSendProfileForm = () => {
  const token = useAuthStore((state) => state.token);
  const resetAuth = useAuthStore((state) => state.resetAuth);

  const profileFormFinish = async (
    e: React.FormEvent,
    nameRef: React.RefObject<HTMLInputElement | null>,
    fileRef: React.RefObject<HTMLInputElement | null>
  ) => {
    e.preventDefault();

    const name = nameRef?.current?.value;
    const file = fileRef.current?.files?.[0];

    if (!token) {
      resetAuth();
      return;
    }

    try {
      // 1. Envia apenas o nome para /onboarding
      await api.post(
        "/onboarding",
        { nome: name || "Jane Appleseed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 2. Se houver imagem, envia separadamente para /upload-image
      if (file) {
        const formData = new FormData();
        formData.append("imagem", file);

        await api.post("/upload-image", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      return true;
    } catch (error) {
      console.error("error when updating data:", error);
      throw error;
    }
  };
  return { profileFormFinish };
};
