import {Coordinate, X, Y} from "../types/Coordinate";
import {CellState} from "../cell/CellReducer";

export type Xrange = [X, X];
export type Yrange = [Y, Y];
export type Cell = {
    coord: Coordinate;
    state: CellState;
};
export type Cells = Record<number, Record<number, Cell>>;

export function initCells(xRange: Xrange): Cells {
    const cells: Cells = {};
    for (let x = xRange[0]; x < xRange[1]; x++) {
        cells[x] = {};
    }
    return cells;
}

export function randomCells([xMin, xMax]: Xrange, [yMin, yMax]: Yrange): Cells {
    const cells = initCells([xMin, xMax]);
    for (let x = xMin; x < xMax; x++) {
        for (let y = yMin; y < yMax; y++) {
            const state = Math.random() < 0.5 ? "ALIVE" : "DEAD";
            cells[x][y] = {state, coord: {x: x as X, y: y as Y}};
        }
    }
    return cells;
}