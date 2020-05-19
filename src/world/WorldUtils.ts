import {Coordinate, X, Y} from "../types/Coordinate";
import {CellState} from "../cell/CellReducer";
import {Surroundings} from "../types/Surroundings";

export type Xrange = [X, X];
export type Yrange = [Y, Y];
export type Cell = {
    coord: Coordinate;
    state: CellState;
};
export type Cells = Record<number, Record<number, Cell>>;
export const offsets: Surroundings<Coordinate> = {
    topLeft: {x: -1 as X, y: -1 as Y},
    top: {x: 0 as X, y: -1 as Y},
    topRight: {x: 1 as X, y: -1 as Y},
    left: {x: -1 as X, y: 0 as Y},
    right: {x: 1 as X, y: 0 as Y},
    bottomLeft: {x: -1 as X, y: 1 as Y},
    bottom: {x: 0 as X, y: 1 as Y},
    bottomRight: {x: 1 as X, y: 1 as Y}
}
export function randomCells([xMin, xMax]: Xrange, [yMin, yMax]: Yrange): Cells {
    const cells: Cells = {};
    for (let x = xMin; x < xMax; x++) {
        for (let y = yMin; y < yMax; y++) {
            const state = Math.random() < 0.3 ? "ALIVE" : "DEAD";
            setCellInternal(cells, { state, coord: { x: x as X, y: y as Y } });
        }
    }
    return cells;
}

export function gliderGunCells([xMin, xMax]: Xrange, [yMin, yMax]: Yrange): Cells {
    const cells: Cells = {};
    for (let x = xMin; x < xMax; x++) {
        for (let y = yMin; y < yMax; y++) {
            const state = "DEAD";
            setCellInternal(cells, { state, coord: { x: x as X, y: y as Y } });
        }
    }
    gliderGun.forEach(coordinate => setCellInternal(cells, {
        coord: coordinate,
        state: "ALIVE"
    }));
    return cells;
}

export function setCellInternal(cells: Cells, cell: Cell) {
    if(cells[cell.coord.x] === undefined) cells[cell.coord.x] = {};
    cells[cell.coord.x][cell.coord.y] = cell;
}

const gliderGun: Array<Coordinate> = [
    { x: 1 as X, y: 5 as Y }, 
    { x: 1 as X, y: 6 as Y },
    { x: 2 as X, y: 5 as Y },
    { x: 2 as X, y: 6 as Y },
    { x: 11 as X, y: 5 as Y }, 
    { x: 11 as X, y: 6 as Y },
    { x: 11 as X, y: 7 as Y },
    { x: 12 as X, y: 4 as Y },
    { x: 12 as X, y: 8 as Y },
    { x: 13 as X, y: 3 as Y },
    { x: 13 as X, y: 9 as Y },
    { x: 14 as X, y: 3 as Y },
    { x: 14 as X, y: 9 as Y },
    { x: 15 as X, y: 6 as Y },
    { x: 16 as X, y: 4 as Y },
    { x: 16 as X, y: 8 as Y },
    { x: 17 as X, y: 5 as Y },
    { x: 17 as X, y: 6 as Y },
    { x: 17 as X, y: 7 as Y },
    { x: 18 as X, y: 6 as Y },
    { x: 21 as X, y: 3 as Y },
    { x: 21 as X, y: 4 as Y },
    { x: 21 as X, y: 5 as Y },
    { x: 22 as X, y: 3 as Y },
    { x: 22 as X, y: 4 as Y },
    { x: 22 as X, y: 5 as Y },
    { x: 23 as X, y: 2 as Y },
    { x: 23 as X, y: 6 as Y },
    { x: 25 as X, y: 1 as Y },
    { x: 25 as X, y: 2 as Y },
    { x: 25 as X, y: 6 as Y },
    { x: 25 as X, y: 7 as Y },
    { x: 35 as X, y: 3 as Y },
    { x: 35 as X, y: 4 as Y },
    { x: 36 as X, y: 3 as Y },
    { x: 36 as X, y: 4 as Y },
];
