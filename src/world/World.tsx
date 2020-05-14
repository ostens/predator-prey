import React, {CSSProperties, FunctionComponent} from "react";
import {Coordinate, useWorldSelector, WorldState, X, Y} from "./WorldReducer";
import CellContainer from "../cell/CellContainer";
import "./World.scss";

type WorldProps = {

};

const World: FunctionComponent<WorldProps> = (props: WorldProps) => {
  const [xMin, xMax] = useWorldSelector((state: WorldState) => state.xRange);
  const [yMin, yMax] = useWorldSelector((state: WorldState) => state.yRange);

  const coords: Array<Coordinate> = [];
  for(let x = xMin; x < xMax; x++) {
    for(let y = yMin; y < yMax; y++) {
      coords.push({x: x as X, y: y as Y});
    }
  }

  const cols = xMax - xMin;
  const style: CSSProperties = {
    gridTemplateColumns: `repeat(${cols}, 60px)`
  }

  return <div className={"grid"} style={style}>
    {coords.map(coord => <CellContainer key={`${coord.x},${coord.y}`} coord={coord}/>)}
  </div>
}

export default World;