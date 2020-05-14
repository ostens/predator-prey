import React, {CSSProperties, FunctionComponent} from "react";

export type CellProps = {
    color: string
}

const Cell: FunctionComponent<CellProps> = ({color}: CellProps) => {
    const style: CSSProperties = {
        backgroundColor: color,
        height: "60px",
        width: "60px"
    }
    return <div style={style}>
    </div>
}

export default Cell;