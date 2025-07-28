// store/authStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isAuthenticated: boolean | null;
  nome: string | null;
  email: string | null;
  imagem: string | null;
  onboardingRequired: boolean | null;
  token: string | null;
  isHydrated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  setNome: (nome: string | null) => void;
  setEmail: (email: string | null) => void;
  setImagem: (imagem: string | null) => void;
  setOnboardingRequired: (value: boolean | null) => void;
  setToken: (token: string | null) => void;
  setIsHydrated: (value: boolean) => void;
  resetAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false, // opcional aqui
      nome: null,
      email: null,
      imagem: null,
      onboardingRequired: null,
      token: null,
      isHydrated: false,

      setIsAuthenticated: (auth) => set({ isAuthenticated: auth }),
      setNome: (nome) => set({ nome }),
      setEmail: (email) => set({ email }),
      setImagem: (imagem) => set({ imagem }),
      setOnboardingRequired: (value) => set({ onboardingRequired: value }),
      setToken: (token) => {
        set({ token, isAuthenticated: !!token });
      },
      setIsHydrated: (value) => set({ isHydrated: value }),
      resetAuth: () =>
        set({
          token: null,
          nome: null,
          email: null,
          imagem: null,
          onboardingRequired: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "auth-storage", // nome da chave no localStorage
      partialize: (state) => ({
        nome: state.nome,
        email: state.email,
        imagem: state.imagem,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        onboardingRequired: state.onboardingRequired,
      }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("❌ Error rehydrating Zustand store", error);
        } else {
          // ✅ Quando a hidratação do Zustand terminar:
          state?.setIsHydrated(true);
          console.log("✅ Zustand rehydrated!");
        }
      },
    }
  )
);
