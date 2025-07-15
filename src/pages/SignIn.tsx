import logo from "../assets/logo.svg";
import SignMain from "../components/SignMain";
import { formReducer, initialState } from "../reducers/authFormReducer";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SignIn = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

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

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("usuario_id", response.data.usuario_id);

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
    </div>
  );
};
export default SignIn;
