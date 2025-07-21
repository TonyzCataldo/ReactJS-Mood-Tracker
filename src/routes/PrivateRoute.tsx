import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, onboardingRequired } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  if (onboardingRequired === null) {
    return null; // aguardando info da API
  }
  if (onboardingRequired === true) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};
export default PrivateRoute;
