import React, { CSSProperties, FunctionComponent } from "react";
import { useWorldSelector } from "../world/WorldSelectors";
import { WorldState } from "../world/WorldReducer";

export type CellProps = {
    color: string;
    onClick: () => void;
}

const Cell: FunctionComponent<CellProps> = ({ color, onClick }: CellProps) => {
    const [xMin, xMax] = useWorldSelector((state: WorldState) => state.xRange);
    const [yMin, yMax] = useWorldSelector((state: WorldState) => state.yRange);

    const xRange = xMax - xMin;
    const yRange = yMax - yMin;

    const style: CSSProperties = {
        backgroundColor: color,
        height: `${600/yRange}px`,
        width: `${600/xRange}px`
    }
    return <div style={style} onMouseDown={onClick}>
    </div>
}

export default Cell;