import { useReducer } from "react";
import { formReducer, initialState } from "../../reducers/authFormReducer";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { emailValidation } from "../../utils/validators/emailValidator";

import axios from "axios";

export const useSignIn = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const navigate = useNavigate();
  const setIsAuthenticated = useAuthStore((state) => state.setIsAuthenticated);
  const setToken = useAuthStore((state) => state.setToken);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = emailValidation(state.email);
    if (validation) {
      dispatch({
        type: "SET_ERRO",
        payload: validation,
      });
      return;
    }
    try {
      const res = await axios.post("https://mood-api-k2mz.onrender.com/login", {
        email: state.email,
        senha: state.senha,
      });
      setToken(res.data.token);
      dispatch({ type: "RESET_FORM" });
      setIsAuthenticated(true);
      navigate("/dashboard");
    } catch (error: any) {
      dispatch({
        type: "SET_ERRO",
        payload: error.response?.data?.msg || "Error in log in",
      });
    }
  };
  return { handleSignIn, state, dispatch };
};
