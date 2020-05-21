import {RootState} from "../root/RootReducer";
import {WorldState} from "./WorldReducer";
import {Coordinate, X, Y} from "../utils/Coordinate";
import {CellState, CellSurroundings} from "../cell/CellReducer";
import {Cell, offsets} from "./WorldUtils";

export function fromWorldWithArgs<T, A extends any[]>(func: (state: WorldState, ...args: A) => T, ...args: A): (state: RootState) => T {
    return (state: RootState) => func(state.world as WorldState, ...args);
}

export function fromWorld<T>(func: (state: WorldState) => T): (state: RootState) => T {
    return (state: RootState) => func(state.world as WorldState);
}

export function getCellState(state: WorldState, {x, y}: Coordinate): CellState {
    return getCellStateXY(state, x, y);
}

export function getCellStateXY({cells}: WorldState, x: X, y: Y): CellState {
    const column = cells[x];
    if (column === undefined) return "DEAD";
    const cell = column[y];
    if (cell === undefined) return "DEAD";
    return cell.state;
}

export function getSuroundings(state: WorldState, {coord}: Cell): CellSurroundings {
    const surroundings: CellSurroundings = {} as CellSurroundings;
    Object.entries(offsets).forEach(([key, offset]) => {
        const x = (coord.x + offset.x) as X;
        const y = (coord.y + offset.y) as Y;
        surroundings[key as keyof typeof offsets] = getCellStateXY(state, x, y);
    });
    return surroundings;
}

export const getIsPlaying = (state: WorldState) => state.isPlaying
export const getTickDelay = (state: WorldState) => state.tickDelay
export const getXRange = (state: WorldState) => state.xRange;
export const getYRange = (state: WorldState) => state.yRange;
export const getCells = (state: WorldState) => state.cells;
export const getCoords = (state: WorldState) => {
    const cells = getCells(state);
    const coords = Object.values(cells).flatMap(row => Object.values(row).map(cell => cell.coord));
    return coords;
}