import React from "react";
import { RootState } from "../root/RootReducer";
import { useSelector } from "react-redux";
import { Coordinate } from "../world/WorldReducer";

type WorldProps = {

};

const world: React.FunctionComponent<WorldProps> = ({}: WorldProps) => {
  const xRange = useSelector((rootState: RootState) => rootState.world.xRange);
  const yRange = useSelector((rootState: RootState) => rootState.world.yRange);

  const coords: Array<Coordinate> = [];
  for(let )

  //TODO iterate here

  return <div>
  
  </div>
}

export default world;