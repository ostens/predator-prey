import {cellConfigs} from "../cell/CellReducer";
import {createReducer} from "@reduxjs/toolkit";
import {Reducer} from "react";
import {X, Y} from "../types/Coordinate";
import {randomiseAction, setCellAction, tickAction, WorldActions} from "./WorldActions";
import {Cells, offsets, randomCells, setCellInternal, Xrange, Yrange} from "./WorldUtils";
import {selectSurroundings} from "./WorldSelectors";

export type WorldState = {
    cells: Cells,
    xRange: Xrange,
    yRange: Yrange
}

const xRangeInit: Xrange = [0 as X, 100 as X]
const yRangeInit: Yrange = [0 as Y, 100 as Y]

const initState: WorldState = {
    cells: randomCells(xRangeInit, yRangeInit),
    xRange: xRangeInit,
    yRange: yRangeInit
};


export const worldReducer: Reducer<WorldState | undefined, WorldActions> = createReducer(initState, builder =>
    builder
        .addCase(tickAction, tick)
        .addCase(randomiseAction, randomise)
        .addCase(setCellAction, setCell)
);

function tick(state: WorldState): WorldState {
    const aliveCells: Cells = {};
    Object.values(state.cells).forEach(column => {
        Object.values(column).forEach(cell => {
            const {tick} = cellConfigs[cell.state];
            const surroundings = selectSurroundings(state, cell);
            const newState = tick(surroundings);
            if (newState === "ALIVE") {
                setCellInternal(aliveCells, {...cell, state: newState});
            }
        })
    });

    const cells: Cells = {};
    Object.values(aliveCells).forEach(column =>
        Object.values(column).forEach(({coord}) =>
            Object.values(offsets).forEach(offset =>
                setCellInternal(cells, {
                    coord: {
                        x: (coord.x + offset.x) as X,
                        y: (coord.y + offset.y) as Y
                    },
                    state: "DEAD"
                })
            )
        )
    )

    Object.values(aliveCells).forEach(column =>
        Object.values(column).forEach(cell =>
                setCellInternal(cells, cell)
        )
    )

    const cellCount = Object.values(cells).reduce((acc, column) => acc + Object.keys(column).length, 0)
    console.log(cellCount, "relevant cells");

    return {...state, cells};
}

function randomise(state: WorldState): void {
    state.cells = randomCells(state.xRange, state.yRange);
}

function setCell(state: WorldState, {payload}: ReturnType<typeof setCellAction>): void {
    setCellInternal(state.cells, {coord: payload.coord, state: payload.newCellState});
}



