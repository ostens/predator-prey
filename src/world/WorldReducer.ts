import {cellConfigs} from "../cell/CellReducer";
import {createReducer} from "@reduxjs/toolkit";
import {Reducer} from "react";
import {X, Y} from "../types/Coordinate";
import {randomiseAction, setCellAction, tickAction, WorldActions} from "./WorldActions";
import {Cells, initCells, randomCells, Xrange, Yrange} from "./WorldUtils";
import {selectSurroundings} from "./WorldSelectors";

export type WorldState = {
    cells: Cells,
    xRange: Xrange,
    yRange: Yrange
}

const xRangeInit: Xrange = [0 as X, 5 as X]
const yRangeInit: Yrange = [0 as Y, 5 as Y]

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
    const cells = initCells(state.xRange);

    Object.values(state.cells).forEach(column => {
        Object.values(column).forEach(cell => {
            const {tick} = cellConfigs[cell.state];
            const surroundings = selectSurroundings(state, cell)
            const newState = tick(surroundings);
            cells[cell.coord.x][cell.coord.y] = {...cell, state: newState}
        })
    })

    return {...state, cells};
}

function randomise(state: WorldState): WorldState {
    const cells = randomCells(state.xRange, state.yRange);
    return {...state, cells};
}

function setCell(state: WorldState, {payload}: ReturnType<typeof setCellAction>): WorldState {
    const {x, y} = payload.coord;
    return {
        ...state,
        cells: {
            ...state.cells,
            [x]: {
                ...state.cells[x],
                [y]: {
                    ...state.cells[x][y],
                    state: payload.newCellState
                }
            }
        }
    };
}

