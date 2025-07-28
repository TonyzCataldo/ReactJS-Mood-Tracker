import logo from "../assets/logo.svg";
import SignMain from "../components/SignMain";
import { formReducer, initialState } from "../reducers/authFormReducer";
import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import { useAuth } from "../context/AuthContext";
import { useAuthStore } from "../store/useAuthStore";

const SignIn = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const navigate = useNavigate();
  //const { setIsAuthenticated } = useAuth();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setToken = useAuthStore((state) => state.setToken);

  const handleSignIn = async (e: React.FormEvent) => {
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
      const response = await axios.post(
        "https://mood-api-k2mz.onrender.com/login",
        {
          email: state.email,
          senha: state.senha,
        }
      );

      //localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      //localStorage.setItem("usuario_id", response.data.usuario_id);

      dispatch({ type: "RESET_FORM" });
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (err: any) {
      dispatch({
        type: "SET_ERRO",
        payload: err.response?.data?.msg || "Error in log in",
      });
    }
  };

  useEffect(() => {
    //localStorage.removeItem("token");
    //localStorage.removeItem("usuario_id");
    //localStorage.removeItem("nome");
    // localStorage.removeItem("email");
    //localStorage.removeItem("imagem_url");
    useAuthStore.getState().resetAuth();
  }, []);

  return (
    <div className="flex flex-col items-center py-20">
      <img src={logo} alt="mood tracker logo" className="mb-8"></img>
      <SignMain
        titleText="Welcome back!"
        descriptionText="Log in to continue tracking your mood and sleep."
        buttonText="Log In"
        redirectText="Haven't got an account?"
        redirectUrl="/SignUp"
        linkText=" Sign up."
        onSubmit={handleSignIn}
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
export default SignIn;
