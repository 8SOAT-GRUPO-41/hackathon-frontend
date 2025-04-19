import { create } from "zustand";
import { persist } from "zustand/middleware";
import { authService } from "./api";

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, password: string) => {
        try {
          const { user } = await authService.login(email, password);
          set({ user, isAuthenticated: true });
        } catch (error) {
          console.error("Erro no login:", error);
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false });
      },

      checkAuth: () => {
        const isAuth = authService.isAuthenticated();
        if (!isAuth && get().isAuthenticated) {
          // Se não estiver autenticado mas o estado diz que está, corrige o estado
          set({ isAuthenticated: false });
        }
        return isAuth;
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
