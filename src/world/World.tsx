import React, {CSSProperties, FunctionComponent} from "react";
import CellContainer from "../cell/CellContainer";
import "./World.scss";
import {Coordinate, X, Y} from "../types/Coordinate";
import {fromWorld, getXRange, getYRange} from "./WorldSelectors";
import {useSelector} from "react-redux";

type WorldProps = {

};

const World: FunctionComponent<WorldProps> = (props: WorldProps) => {
  const [xMin, xMax] = useSelector(fromWorld(getXRange));
  const [yMin, yMax] = useSelector(fromWorld(getYRange));

  const coords: Array<Coordinate> = [];
  for(let x = xMin; x < xMax; x++) {
    for(let y = yMin; y < yMax; y++) {
      coords.push({x: x as X, y: y as Y});
    }}

  const cols = xMax - xMin;
  const rows = yMax - yMin;

  const style: CSSProperties = {
    gridAutoFlow: `column`,
    gridTemplateColumns: `repeat(${cols}, ${500/cols}px)`,
    gridTemplateRows: `repeat(${rows}, ${500/rows}px)`,
  }

  return <div className={"grid"} style={style}>
    {coords.map(coord => <CellContainer key={`${coord.x},${coord.y}`} coord={coord}/>)}
  </div>
}

export default World;