import { Routes, Route, Navigate } from "react-router-dom";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import OnBoarding from "./pages/OnBoarding";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated, onboardingRequired } = useAuth();

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
              <PrivateRoute
                isAuthenticated={isAuthenticated}
                onboardingRequired={onboardingRequired}
              >
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
