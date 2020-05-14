import React from "react";
import {Coordinate, selectCellState} from "../world/WorldReducer";
import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import {cellConfigs} from "./CellReducer";
import Cell from "./Cell";

export type CellContainerProps = {
    coord: Coordinate
}

const CellContainer: React.FunctionComponent<CellContainerProps> = ({coord}: CellContainerProps) => {
    const cellState = useSelector((rootState: RootState) => selectCellState(rootState.world.cells, coord));
    if(cellState === undefined) return null;

    const props = cellConfigs[cellState];
    return <Cell color={props.color} />
}

export default CellContainer;