import React, {MouseEventHandler, ReactNode} from "react";
import "./Button.scss";

type ButtonProps = {
  onClick: MouseEventHandler;
  children: ReactNode;
};

const Button: React.FunctionComponent<ButtonProps> = ({ onClick, children}) => {
  return <button className="button" onClick={onClick}>
    {children}
  </button>;
}

export default Button;