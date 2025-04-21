import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UploadPage from "./pages/UploadPage";
import ResultsPage from "./pages/ResultsPage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Toaster } from "sonner";

// Layout para páginas protegidas
const ProtectedLayout: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Rotas protegidas */}
        <Route path="/" element={<ProtectedLayout />}>
          <Route index element={<Navigate to="/upload" replace />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="results" element={<ResultsPage />} />
          {/* Adicione outras rotas protegidas aqui */}
        </Route>

        {/* Redireciona rotas desconhecidas para login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
