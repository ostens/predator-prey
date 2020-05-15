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

export function selectCellState(state: WorldState, {x, y}: Coordinate): CellState | undefined {
    return selectCellState_Separated(state, x, y);
}

export function selectCellState_Separated({cells}: WorldState, x: X, y: Y): CellState | undefined {
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

function withinBounds(state: WorldState, x: X, y: Y): boolean {
    return (x >= state.xRange[0]) &&
        (x <= state.xRange[1]) &&
        (y >= state.yRange[0]) &&
        (y <= state.yRange[1]);
}

export function selectSurroundings(state: WorldState, {coord}: Cell): CellSurroundings {
    const surroundings: CellSurroundings = {};
    Object.entries(offsets).forEach(([key, offset]) => {
        const x = (coord.x + offset.x) as X;
        const y = (coord.y + offset.y) as Y;
        if (withinBounds(state, x, y)) {
            surroundings[key as keyof typeof offsets] = selectCellState_Separated(state, x, y);
        }
    });
    return surroundings;
}