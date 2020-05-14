import React from "react";
import {Coordinate, selectCellState, useWorldSelector, WorldState} from "../world/WorldReducer";
import {cellConfigs} from "./CellReducer";
import Cell from "./Cell";
import {useAppDispatch} from "../root/RootStore";

export type CellContainerProps = {
    coord: Coordinate;
}

const CellContainer: React.FunctionComponent<CellContainerProps> = ({coord}: CellContainerProps) => {
    const dispatch = useAppDispatch();
    const cellState = useWorldSelector((state: WorldState) => selectCellState(state, coord));
    if(cellState === undefined) return null;

    const props = cellConfigs[cellState];
    return <Cell color={props.color} onClick={() => dispatch(props.getClickAction(coord))} />
}

export default CellContainer;