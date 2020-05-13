import React from "react";
import { useDispatch } from "react-redux";

import Button from "./Button";
import { tickAction } from "../world/WorldReducer";

export type ButtonContainerProps = {
}

const ButtonContainer: React.FunctionComponent<ButtonContainerProps> = (ButtonContainerProps) => {
  const dispatch = useDispatch();

  return <Button onClick={() => dispatch(tickAction)} />;
}

export default ButtonContainer;