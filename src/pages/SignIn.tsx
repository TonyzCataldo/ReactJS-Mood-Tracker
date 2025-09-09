import logo from "../assets/logo.svg";
import SignMain from "../components/SignMain";
import { useSignIn } from "../hooks/useSignIn/useSignIn";
import { useCleanAuthGuard } from "../hooks/useCleanAuthGuard/useCleanAuthGuard";

const SignIn = () => {
  const { handleSignIn, state, dispatch } = useSignIn();

  useCleanAuthGuard();

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
