import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import OnBoarding from "./pages/OnBoarding";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import api from "./axios/api";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  //
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const onboardingRequired = useAuthStore((state) => state.onboardingRequired);
  const isHydrated = useAuthStore((state) => state.isHydrated);
  const token = useAuthStore((state) => state.token);
  const setOnboardingRequired = useAuthStore(
    (state) => state.setOnboardingRequired
  );
  const resetAuth = useAuthStore((state) => state.resetAuth);

  console.log("app render");
  console.log(onboardingRequired);
  console.log(isHydrated);

  useEffect(() => {
    if (!isHydrated) return;
    if (isAuthenticated) {
      const fetchOnboardingStatus = async () => {
        try {
          const res = await api.get("/check-onboarding", {
            headers: { Authorization: `Bearer ${token}` },
          });

          setOnboardingRequired(res.data.onboarding_required);
        } catch (error) {
          console.error("Erro ao checar onboarding:", error);
          resetAuth();
          navigate("/signin");
        }
      };
      fetchOnboardingStatus();
    }
  }, [isHydrated, isAuthenticated]);

  if (isHydrated && isAuthenticated && onboardingRequired === null) {
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
              isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn />
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? <Navigate to="/dashboard" /> : <SignUp />
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/onboarding"
            element={
              onboardingRequired === true ? (
                <OnBoarding />
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
