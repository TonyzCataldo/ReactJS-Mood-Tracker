import logo from "../assets/logo.svg";
import SignMain from "../components/SignMain";
import { formReducer, initialState } from "../reducers/authFormReducer";
import { useReducer } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { useCleanAuthGuard } from "../hooks/useCleanAuthGuard/useCleanAuthGuard";

const SignUp = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setOnboardingRequired = useAuthStore(
    (state) => state.setOnboardingRequired
  );
  const setToken = useAuthStore((state) => state.setToken);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    //tratamento do input email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(state.email)) {
      dispatch({
        type: "SET_ERRO",
        payload: "Please enter a valid email address.",
      });
      return;
    }

    try {
      await axios.post("https://mood-api-k2mz.onrender.com/register", {
        email: state.email,
        senha: state.senha,
      });
      const loginResponse = await axios.post(
        "https://mood-api-k2mz.onrender.com/login",
        {
          email: state.email,
          senha: state.senha,
        }
      );

      setToken(loginResponse.data.token);
      dispatch({ type: "RESET_FORM" });
      setIsAuthenticated(true);
      setOnboardingRequired(true);
    } catch (err: unknown) {
      const error = err as AxiosError<{ msg: string }>;

      dispatch({
        type: "SET_ERRO",
        payload: error.response?.data?.msg || "Erro ao registrar",
      });
    }
  };

  useCleanAuthGuard();

  return (
    <div className="flex flex-col items-center py-20">
      <img src={logo} alt="mood tracker logo" className="mb-8"></img>
      <SignMain
        titleText="Create an account"
        descriptionText="Join to track your daily mood and sleep with ease."
        buttonText="Sign Up"
        redirectText="Already got an account?"
        redirectUrl="/SignIn"
        linkText=" Log in."
        onSubmit={handleSignUp}
        state={state}
        dispatch={dispatch}
      />
      <div className="flex flex-col mt-8 gap-4 items-center">
        <p className="font-RedditSans text-[0.938rem]/[140%] tracking-[-0.019rem] font-medium text-neutral-900">
          *Please wait around 50 seconds for the API to work.
        </p>
        <p className="font-RedditSans text-[0.938rem]/[140%] tracking-[-0.019rem] font-medium text-neutral-900">
          *Por favor espere 50 segundos para que a API funcione.
        </p>
      </div>
    </div>
  );
};
export default SignUp;
