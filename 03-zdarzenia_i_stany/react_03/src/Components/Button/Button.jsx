const Button = ({ label, onClickAction }) => {
  return <button onClick={onClickAction}>{label}</button>;
};

export default Button;
