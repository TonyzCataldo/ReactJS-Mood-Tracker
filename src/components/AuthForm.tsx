import Button from "./Button";

type AuthFormProps = {
  email: string;
  senha: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSenhaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  erro?: string;
  buttonText: string;
};

const AuthForm = ({
  email,
  senha,
  onEmailChange,
  onSenhaChange,
  onSubmit,
  erro,
  buttonText,
}: AuthFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex flex-col" noValidate>
      <label
        className="text-[1.125rem]/[140%] tracking-[-0.019rem] text-neutral-900 font-RedditSans mb-2"
        htmlFor="email"
      >
        Email address
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="name@mail.com"
        required
        className="border-[1px] mb-5 py-3 px-4 font-RedditSans placeholder:font-RedditSans border-neutral-300 rounded-[10px] placeholder:text-[1.125rem]/[140%] placeholder:tracking-[-0.019rem] placeholder:text-neutral-600 text-[1.125rem]/[140%] tracking-[-0.019rem] text-neutral-900 outline-none focus:border-blue-600"
      />

      <label
        htmlFor="senha"
        className="text-[1.125rem]/[140%] tracking-[-0.019rem] text-neutral-900 font-RedditSans mb-2"
      >
        Password
      </label>
      <input
        id="senha"
        type="password"
        value={senha}
        onChange={onSenhaChange}
        required
        className="border-[1px] mb-1 py-3 px-4 font-RedditSans placeholder:font-RedditSans border-neutral-300 rounded-[10px] placeholder:text-[1.125rem]/[140%] placeholder:tracking-[-0.019rem] placeholder:text-neutral-600 text-[1.125rem]/[140%] tracking-[-0.019rem] text-neutral-900 outline-none focus:border-blue-600"
      />

      {erro && <p style={{ color: "red", textAlign: "center" }}>{erro}</p>}

      <div className="mt-7 flex flex-col">
        <Button
          buttonText={buttonText}
          py="0.75rem"
          fontSize="1.25rem"
          lineHeight="140%"
          letterSpacing="0"
        />
      </div>
    </form>
  );
};

export default AuthForm;
