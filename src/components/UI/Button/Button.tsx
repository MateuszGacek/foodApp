type ButtonProps = {
  children: React.ReactNode;
  textOnly?: string;
  className?: string;
};

const Button = ({ children, textOnly, className, ...props }: ButtonProps) => {
  const cssClasses = textOnly ? `text-button ${className}` : "button";
  return (
    <button {...props} className={cssClasses}>
      {children}
    </button>
  );
};

export default Button;
