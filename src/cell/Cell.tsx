import React from "react";

export type CellProps = {
    color: string
}

const cell: React.FunctionComponent<CellProps> = ({color}: CellProps) => {
    return <div>
        {color}
    </div>
}

export default cell;