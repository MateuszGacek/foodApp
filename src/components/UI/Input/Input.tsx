import { InputHTMLAttributes } from "react";
type InputProps = {
  label: string;
  id: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, id, ...props }: InputProps) => {
  return (
    <p className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} required {...props} />
    </p>
  );
};

export default Input;
