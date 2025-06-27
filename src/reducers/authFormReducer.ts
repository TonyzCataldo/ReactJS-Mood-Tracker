export type FormState = {
  email: string;
  senha: string;
  erro: string;
};

export type Action =
  | { type: "SET_EMAIL"; payload: string }
  | { type: "SET_SENHA"; payload: string }
  | { type: "SET_ERRO"; payload: string }
  | { type: "RESET_FORM" };

export const initialState: FormState = {
  email: "",
  senha: "",
  erro: "",
};

export function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_SENHA":
      return { ...state, senha: action.payload };
    case "SET_ERRO":
      return { ...state, erro: action.payload };

    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
}
