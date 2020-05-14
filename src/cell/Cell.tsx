import React, {FunctionComponent} from "react";

export type CellProps = {
    color: string
}

const Cell: FunctionComponent<CellProps> = ({color}: CellProps) => {
    return <div>
        {color}
    </div>
}

export default Cell;