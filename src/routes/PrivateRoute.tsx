import { Navigate } from "react-router-dom";

const PrivateRoute = ({
  children,
  isAuthenticated,
  onboardingRequired,
}: {
  children: React.ReactNode;
  isAuthenticated: boolean;
  onboardingRequired: boolean | null;
}) => {
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
