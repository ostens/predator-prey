import React, {CSSProperties, FunctionComponent} from "react";

export type CellProps = {
    color: string;
    onClick: () => void;
}

const Cell: FunctionComponent<CellProps> = ({color, onClick}: CellProps) => {
    const style: CSSProperties = {
        backgroundColor: color,
        height: "60px",
        width: "60px"
    }
    return <div style={style} onClick={onClick}>
    </div>
}

export default Cell;