type ButtonProps = {
  children: React.ReactNode;
  textOnly?: boolean;
  className?: string;
  onClick?: () => void;
};

const Button = ({
  onClick,
  children,
  textOnly,
  className,
  ...props
}: ButtonProps) => {
  const cssClasses = textOnly ? `text-button ${className}` : "button";
  return (
    <button onClick={onClick} {...props} className={cssClasses}>
      {children}
    </button>
  );
};

export default Button;
