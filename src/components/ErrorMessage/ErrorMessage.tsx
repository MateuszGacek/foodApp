type errorProp = {
  title: string;
  message: string;
};

const ErrorMessage = ({ title, message }: errorProp) => {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
