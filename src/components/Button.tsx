type ButtonProps = {
  buttonText: string;
  py: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
};

const Button = ({
  buttonText,
  py,
  fontSize,
  lineHeight,
  letterSpacing,
}: ButtonProps) => {
  return (
    <button
      type="submit"
      className="bg-blue-600 text-white font-RedditSans px-8 font-semibold rounded-[10px] cursor-pointer"
      style={{
        paddingTop: py,
        paddingBottom: py,
        fontSize: fontSize,
        lineHeight: lineHeight,
        letterSpacing: letterSpacing,
      }}
    >
      {buttonText}
    </button>
  );
};
export default Button;
