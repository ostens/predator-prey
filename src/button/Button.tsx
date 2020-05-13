import React from "react";
import "./Button.scss";

type ButtonProps = {
};

const component: React.FunctionComponent<ButtonProps> = ({ }: ButtonProps) => {
  return <button className="button" onClick={() => { }}>Tick</button>; //dispatch tick action
}

export default component;