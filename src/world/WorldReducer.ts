import {CellState, cellConfigs, CellSurroundings} from "../cell/CellReducer";
import {createReducer, createAction} from "@reduxjs/toolkit";
import {Reducer} from "react";
import {RootState} from "../root/RootReducer";
import {useSelector} from "react-redux";
import {Coordinate, X, Y} from "../types/Coordinate";
import {Surroundings} from "../types/Surroundings";

type Xrange = [X, X];
type Yrange = [Y, Y];

type Cell = {
    coord: Coordinate;
    state: CellState;
};
type Cells = Record<number, Record<number, Cell>>;
export type WorldState = {
    cells: Cells,
    xRange: Xrange,
    yRange: Yrange
}

export function selectCellState(state: WorldState, coord: Coordinate): CellState | undefined {
    return selectCellStateInternal(state.cells, coord);
}

function selectCellStateInternal(cells: Cells, {x, y}: Coordinate): CellState | undefined {
    const column = cells[x];
    if (column === undefined) return undefined;
    const cell = column[y];
    if (cell === undefined) return undefined;
    return cell.state;
}

const offsets: Surroundings<Coordinate> = {
    topLeft: {x: -1 as X, y: -1 as Y},
    top: {x: 0 as X, y: -1 as Y},
    topRight: {x: 1 as X, y: -1 as Y},
    left: {x: -1 as X, y: 0 as Y},
    right: {x: 1 as X, y: 0 as Y},
    bottomLeft: {x: -1 as X, y: 1 as Y},
    bottom: {x: 0 as X, y: 1 as Y},
    bottomRight: {x: 1 as X, y: 1 as Y}
}

function applyOffset(a: Coordinate, b: Coordinate): Coordinate {
    return {
        x: (a.x + b.x) as X,
        y: (a.y + b.y) as Y
    }
}

function withinBounds(state: WorldState, coordinate: Coordinate): boolean {
    if (coordinate.x < state.xRange[0]) return false;
    if (coordinate.x > state.xRange[1]) return false;
    if (coordinate.y < state.yRange[0]) return false;
    if (coordinate.y > state.yRange[1]) return false;
    return true;
}

export function selectSurroundings<C extends Cell>(state: WorldState, cell: C): CellSurroundings {
    const surroundings: CellSurroundings = {};
    Object.entries(offsets).forEach(([key, offset]) => {
        const coordinate = applyOffset(cell.coord, offset);
        if (withinBounds(state, coordinate)) {
            surroundings[key as keyof typeof offsets] = selectCellStateInternal(state.cells, coordinate)
        }
    });
    return surroundings;
}

function initCells(xRange: Xrange): Cells {
    const cells: Cells = {};
    for (let x = xRange[0]; x < xRange[1]; x++) {
        cells[x] = {};
    }
    return cells;
}

function randomCells([xMin, xMax]: Xrange, [yMin, yMax]: Yrange): Cells {
    const cells = initCells([xMin, xMax]);
    for (let x = xMin; x < xMax; x++) {
        for (let y = yMin; y < yMax; y++) {
            const state = Math.random() < 0.5 ? "ALIVE" : "DEAD";
            cells[x][y] = {state, coord: {x: x as X, y: y as Y}};
        }
    }
    return cells;
}

const xRangeInit: Xrange = [0 as X, 5 as X]
const yRangeInit: Yrange = [0 as Y, 5 as Y]

const initState: WorldState = {
    cells: randomCells(xRangeInit, yRangeInit),
    xRange: xRangeInit,
    yRange: yRangeInit
};

export const tickAction = createAction("tick");
export const randomiseAction = createAction("randomise");
export const setCellAction = createAction<{ coord: Coordinate, newCellState: CellState }, "setCell">("setCell");

const actions = [tickAction, randomiseAction, setCellAction];
export const worldReducer: Reducer<WorldState | undefined, ReturnType<(typeof actions)[number]>> = createReducer(initState, builder =>
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

export function useWorldSelector<TSelected = unknown>(
    selector: (state: WorldState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
    return useSelector((state: RootState) => {
        const worldState = state.world as WorldState;
        return selector(worldState);
    }, equalityFn);
}
