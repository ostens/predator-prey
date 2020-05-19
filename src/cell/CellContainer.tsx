import React from "react";
import {cellConfigs} from "./CellReducer";
import Cell from "./Cell";
import {useAppDispatch} from "../root/RootStore";
import {Coordinate} from "../utils/Coordinate";
import {useSelector} from "react-redux";
import {fromWorldWithArgs, getCellState} from "../world/WorldSelectors";

export type CellContainerProps = {
    coord: Coordinate;
}

const CellContainer: React.FunctionComponent<CellContainerProps> = ({coord}: CellContainerProps) => {
    const dispatch = useAppDispatch();
    const cellState = useSelector(fromWorldWithArgs(getCellState, coord));
    if(cellState === undefined) return null;

    const props = cellConfigs[cellState];
    return <Cell color={props.color} onClick={() => dispatch(props.getClickAction(coord))} />
}

export default CellContainer;