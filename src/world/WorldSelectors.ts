import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import {WorldState} from "./WorldReducer";
import {Coordinate, X, Y} from "../types/Coordinate";
import {CellState, CellSurroundings} from "../cell/CellReducer";
import {Surroundings} from "../types/Surroundings";
import {Cell} from "./WorldUtils";

export function useWorldSelector<TSelected = unknown>(
    selector: (state: WorldState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
    return useSelector((state: RootState) => {
        const worldState = state.world as WorldState;
        return selector(worldState);
    }, equalityFn);
}

export function selectCellState({cells}: WorldState, {x,y}: Coordinate): CellState | undefined {
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
            surroundings[key as keyof typeof offsets] = selectCellState(state, coordinate)
        }
    });
    return surroundings;
}