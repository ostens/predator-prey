import React, {FunctionComponent, useEffect} from "react";
import "./World.scss";
import {fromWorld, getCells} from "./WorldSelectors";
import {useSelector} from "react-redux";
import {Cells} from "./WorldUtils";
import {cellConfigs} from "../cell/CellReducer";

type WorldProps = {};

const World: FunctionComponent<WorldProps> = (props: WorldProps) => {
    const width = 500;
    const height = 500;
    const cellSize = 5;

    const cells: Cells = useSelector(fromWorld(getCells));

    const canvasRef: React.MutableRefObject<HTMLCanvasElement | null> = React.useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current
        if(canvas === null) return;
        const context = canvas.getContext("2d");
        if(context === null) return;
        context.clearRect(0, 0, width, height);
        for(let xStr in cells) {
            const row = cells[xStr];
            for(let yStr in row) {
                const {state, coord} = row[yStr];
                context.fillStyle = cellConfigs[state].color;
                if(context.fillStyle === "white") continue;
                context.fillRect(coord.x * cellSize, coord.y * cellSize, cellSize, cellSize);
            }
        }
    })

    return <canvas ref={canvasRef} width={width} height={height}/>

}

export default World;