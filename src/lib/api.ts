import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// Criar uma instância do axios com a URL base
const api = axios.create({
  baseURL: "/api/v1", // Usando proxy do Vite
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token a todas as requisições
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com respostas e erros
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Se o erro for 401 (Unauthorized) e não for uma requisição de refresh
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== "/refresh-token"
    ) {
      originalRequest._retry = true;

      try {
        // Tenta obter um novo token usando o refresh token
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post("/api/v1/refresh-token", {
          refreshToken,
        });

        const { token } = response.data;
        localStorage.setItem("accessToken", token);

        // Reenviar a requisição original com o novo token
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Se o refresh falhar, redireciona para o login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("auth-storage");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Interface para o usuário
interface User {
  id: string;
  email: string;
  name?: string;
}

// Interface para resposta de login
interface LoginResponse {
  token: string;
  refreshToken: string;
  userId: string;
}

// Serviço de autenticação
export const authService = {
  login: async (email: string, password: string): Promise<{ user: User }> => {
    const response = await api.post<LoginResponse>("/login", {
      email,
      password,
    });
    const { token, refreshToken, userId } = response.data;

    // Armazenar tokens no localStorage
    localStorage.setItem("accessToken", token);
    localStorage.setItem("refreshToken", refreshToken);

    // Criar objeto de usuário a partir do userId
    const user: User = {
      id: userId,
      email: email,
    };

    return { user };
  },

  logout: (): void => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },

  // Verifica se o usuário está autenticado
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem("accessToken");
  },
};

export default api;
