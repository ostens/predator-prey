import { CellState, cellConfigs, Surroundings, CellSurroundings } from "../cell/CellReducer";
import { createReducer, createAction } from "@reduxjs/toolkit";

export type Coordinate = {
    x: X;
    y: Y;
}

export type X = number & { _brand: "X_COORD" };
export type Y = number & { _brand: "Y_COORD" };

type Xrange = [X, X];
type Yrange = [Y, Y];

type Cell = {
    coord: Coordinate;
    state: CellState;
};
type Cells = Record<number, Record<number, Cell>>;
type WorldState = {
    cells: Cells,
    xRange: Xrange,
    yRange: Yrange
}

export function selectCellState(cells: Cells, { x, y }: Coordinate): CellState | undefined {
    const column = cells[x];
    if (column === undefined) return undefined;
    const cell = column[y];
    if (cell === undefined) return undefined;
    return cell.state;
}

const offsets: Surroundings<Coordinate> = {
    topLeft: { x: -1 as X, y: -1 as Y },
    top: { x: 0 as X, y: -1 as Y },
    topRight: { x: 1 as X, y: -1 as Y },
    left: { x: -1 as X, y: 0 as Y },
    right: { x: 1 as X, y: 0 as Y },
    bottomLeft: { x: -1 as X, y: 1 as Y },
    bottom: { x: 0 as X, y: 1 as Y },
    bottomRight: { x: 1 as X, y: 1 as Y }
}
function applyOffset(a: Coordinate, b: Coordinate): Coordinate {
    return {
        x: (a.x + b.x) as X,
        y: (a.y + b.y) as Y
    }
}
function withinBounds(state: WorldState, coordinate: Coordinate): boolean {
    if(coordinate.x < state.xRange[0]) return false;
    if(coordinate.x > state.xRange[1]) return false;
    if(coordinate.y < state.yRange[0]) return false;
    if(coordinate.y > state.yRange[1]) return false;
    return true;
}
export function selectSurroundings<C extends Cell>(state: WorldState, cell: C): CellSurroundings {
    const surroundings: CellSurroundings = {};
    Object.entries(offsets).forEach(([key, offset]) => {
        const coordinate = applyOffset(cell.coord, offset);
        if(withinBounds(state, coordinate)) {
            surroundings[key as keyof typeof offsets] = selectCellState(state.cells, coordinate)
        }
    });
    return surroundings;
}

function randomCells([xMin, xMax]: Xrange, [yMin, yMax]: Yrange): Cells {
    const cells: Cells = {};
    for(let x = xMin; x < xMax; x++) {
        cells[x] = {};
        for(let y = yMin; y < yMax; y++) {
            const state = Math.random() < 0.5 ? "ALIVE" : "DEAD";
            const coord = {x: x as X, y: y as Y};
            cells[x][y] = {state, coord};
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

export const worldReducer = createReducer(initState, {
    [tickAction.type]: tick
});

function tick (state: WorldState): WorldState {
    const cells: Cells = {};
    for(let x = state.xRange[0]; x < state.xRange[1]; x++) {
        cells[x] = {};
    }

    Object.values(state.cells).forEach(column => {
        Object.values(column).forEach(cell => {
            const { tick } = cellConfigs[cell.state];
            const surroundings = selectSurroundings(state, cell)
            const newState = tick(surroundings);
            cells[cell.coord.x][cell.coord.y] = {...cell, state: newState}
        })
    })

    return {
        ...state,
        cells
    };;
}