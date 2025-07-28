import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const onboardingRequired = useAuthStore((state) => state.onboardingRequired);

  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  if (onboardingRequired === true) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
};
export default PrivateRoute;
