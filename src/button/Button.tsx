import React from "react";
import "./Button.scss";

type ButtonProps = {
  onClick: React.MouseEventHandler
};

const Button: React.FunctionComponent<ButtonProps> = ({ onClick }) => {
  return <button className="button" onClick={onClick}>Tick</button>;
}

export default Button;