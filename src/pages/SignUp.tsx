import logo from "../assets/logo.svg";
import SignMain from "../components/SignMain";
import { formReducer, initialState } from "../reducers/authFormReducer";
import { useReducer, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { AxiosError } from "axios";
import DefaultContainer from "../components/DefaultContainer";

const SignUp = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [apiMessage, setApiMessage] = useState(true);
  const { setIsAuthenticated, setOnboardingRequired } = useAuth();

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

      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("usuario_id", loginResponse.data.usuario_id);

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
      <DefaultContainer
        py="settings"
        isVisible={apiMessage}
        setIsVisible={setApiMessage}
      >
        <div className="flex flex-col items-center gap-56">
          <h2 className="font-RedditSans text-[2rem]/[140%] tracking-[-0.019rem] font-bold text-neutral-900">
            Please wait around 50 seconds for the API to work.
          </h2>
          <h2 className="font-RedditSans text-[2rem]/[140%] tracking-[-0.019rem] font-bold text-neutral-900">
            Por favor aguarde cerca de 50 segundos para que a API funcione.
          </h2>
        </div>
      </DefaultContainer>
    </div>
  );
};
export default SignUp;
