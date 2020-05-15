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
            setCellInternal(cells, {state, coord: {x: x as X, y: y as Y}});
        }
    }
    return cells;
}

export function setCellInternal(cells: Cells, cell: Cell) {
    if(cells[cell.coord.x] === undefined) cells[cell.coord.x] = {};
    cells[cell.coord.x][cell.coord.y] = cell;
}
