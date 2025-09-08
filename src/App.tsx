import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import OnBoarding from "./pages/OnBoarding";
import { useAuthStore } from "./store/useAuthStore";
import { useFetchOnboardingStatus } from "./hooks/useFetchOnboardingStatus/useFetchOnboardingStatus";

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const onboardingRequired = useAuthStore((state) => state.onboardingRequired);

  useFetchOnboardingStatus();

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
