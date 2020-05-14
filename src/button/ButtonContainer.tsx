import React from "react";

import Button from "./Button";
import { tickAction } from "../world/WorldReducer";
import {useAppDispatch} from "../root/RootStore";

export type ButtonContainerProps = {
}

const ButtonContainer: React.FunctionComponent<ButtonContainerProps> = (ButtonContainerProps) => {
  const dispatch = useAppDispatch();

  return <Button onClick={() => dispatch(tickAction())} />;
}

export default ButtonContainer;