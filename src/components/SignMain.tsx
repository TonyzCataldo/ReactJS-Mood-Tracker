import AuthForm from "../components/AuthForm";
import type { FormState, Action } from "../reducers/authFormReducer";

import { Link } from "react-router-dom";

type SignMainProps = {
  titleText: string;
  descriptionText: string;
  buttonText: string;
  redirectText: string;
  redirectUrl: string;
  linkText: string;
  onSubmit: (e: React.FormEvent) => void;
  state: FormState;
  dispatch: React.Dispatch<Action>;
};

const SignMain = ({
  titleText,
  descriptionText,
  buttonText,
  redirectText,
  redirectUrl,
  linkText,
  onSubmit,
  state,
  dispatch,
}: SignMainProps) => {
  return (
    <main className="w-[91.47%] max-w-[33.125rem] bg-white py-10 px-4 rounded-2xl sm:px-8">
      <h1 className="font-RedditSans font-bold text-[2rem]/[140%] tracking-[-0.019rem] text-neutral-900 mb-2">
        {titleText}
      </h1>
      <p className=" font-RedditSans text-[1.125rem]/[140%] tracking-[-0.019rem] text-neutral-600 mb-8">
        {descriptionText}
      </p>
      <AuthForm
        email={state.email}
        senha={state.senha}
        onEmailChange={(e) =>
          dispatch({ type: "SET_EMAIL", payload: e.target.value })
        }
        onSenhaChange={(e) =>
          dispatch({ type: "SET_SENHA", payload: e.target.value })
        }
        onSubmit={onSubmit}
        erro={state.erro}
        buttonText={buttonText}
      />
      <p className=" font-RedditSans text-[1.125rem]/[140%] tracking-[-0.019rem] text-neutral-600 mt-5 text-center">
        {redirectText}
        <Link to={redirectUrl} className="text-blue-600">
          {linkText}
        </Link>
      </p>
    </main>
  );
};

export default SignMain;
