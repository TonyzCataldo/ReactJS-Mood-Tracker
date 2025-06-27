import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import OnBoarding from "./pages/OnBoarding";

import api from "./axios/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    Boolean(localStorage.getItem("token"))
  );

  const [onboardingRequired, setOnboardingRequired] = useState<boolean | null>(
    null
  );

  const fetchOnboardingStatus = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await api.get("/check-onboarding", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const required = response.data.onboarding_required;

      setOnboardingRequired(required);
    } catch (error) {
      console.error("Erro ao checar onboarding:", error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchOnboardingStatus();
    }
  }, [isAuthenticated]);

  //console.log(localStorage.getItem("token"));
  //console.log(isAuthenticated);

  console.log(onboardingRequired);
  console.log(localStorage.getItem("imagem_url"));
  console.log(localStorage.getItem("nome"));
  console.log(localStorage.getItem("token"));

  if (isAuthenticated && onboardingRequired === null) {
    return null;
  }

  return (
    <>
      <div
        className="min-h-dvh"
        style={{
          background: "linear-gradient(180deg, #F5F5FF 72.99%, #E0E0FF 100%)",
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={isAuthenticated ? "/dashboard" : "/signin"}
                replace
              />
            }
          />
          <Route
            path="/signin"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <SignIn onLogin={() => setIsAuthenticated(true)} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <SignUp
                  onSignUp={() => {
                    setIsAuthenticated(true);
                    setOnboardingRequired(true);
                  }}
                />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                onboardingRequired={onboardingRequired}
              >
                <Dashboard
                  onLogout={() => {
                    setIsAuthenticated(false);
                    setOnboardingRequired(null); // limpa onboarding
                  }}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              onboardingRequired === true ? (
                <OnBoarding
                  onFinish={() => {
                    setOnboardingRequired(false);
                    fetchOnboardingStatus(); // 🔁 força recarregar status da API
                  }}
                />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />

          <Route
            path="*"
            element={
              isAuthenticated ? (
                onboardingRequired ? (
                  <Navigate to="/onboarding" replace />
                ) : (
                  <Navigate to="/dashboard" replace />
                )
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
