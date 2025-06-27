import logo from "../assets/logo.svg";
import SignMain from "../components/SignMain";
import { formReducer, initialState } from "../reducers/authFormReducer";
import { useReducer } from "react";

import axios from "axios";

const SignUp = ({ onSignUp }: { onSignUp: () => void }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

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
      await axios.post("http://localhost:5000/register", {
        email: state.email,
        senha: state.senha,
      });
      const loginResponse = await axios.post("http://localhost:5000/login", {
        email: state.email,
        senha: state.senha,
      });

      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("usuario_id", loginResponse.data.usuario_id);

      dispatch({ type: "RESET_FORM" });
      onSignUp();
    } catch (err: any) {
      dispatch({
        type: "SET_ERRO",
        payload: err.response?.data?.msg || "Erro ao registrar",
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
    </div>
  );
};
export default SignUp;
