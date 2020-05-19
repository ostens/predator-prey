import React, { CSSProperties, FunctionComponent } from "react";
import {fromWorld, getXRange, getYRange} from "../world/WorldSelectors";
import {useSelector} from "react-redux";

export type CellProps = {
    color: string;
    onClick: () => void;
}

const Cell: FunctionComponent<CellProps> = ({ color, onClick }: CellProps) => {
    const [xMin, xMax] = useSelector(fromWorld(getXRange));
    const [yMin, yMax] = useSelector(fromWorld(getYRange));

    const xRange = xMax - xMin;
    const yRange = yMax - yMin;

    const style: CSSProperties = {
        backgroundColor: color,
        height: `${500/yRange}px`,
        width: `${500/xRange}px`
    }
    return <div style={style} onMouseDown={onClick}>
    </div>
}

export default Cell;