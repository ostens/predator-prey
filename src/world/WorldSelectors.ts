import {useSelector} from "react-redux";
import {RootState} from "../root/RootReducer";
import {WorldState} from "./WorldReducer";
import {Coordinate, X, Y} from "../types/Coordinate";
import {CellState, CellSurroundings} from "../cell/CellReducer";
import {Cell, offsets} from "./WorldUtils";

export function useWorldSelector<TSelected = unknown>(
    selector: (state: WorldState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected {
    return useSelector((state: RootState) => {
        const worldState = state.world as WorldState;
        return selector(worldState);
    }, equalityFn);
}

export function selectCellState(state: WorldState, {x, y}: Coordinate): CellState {
    return selectCellState_Separated(state, x, y);
}

export function selectIsPlaying(state: WorldState): boolean {
    return state.isPlaying;
}

export function selectCellState_Separated({cells}: WorldState, x: X, y: Y): CellState {
    const column = cells[x];
    if (column === undefined) return "DEAD";
    const cell = column[y];
    if (cell === undefined) return "DEAD";
    return cell.state;
}

export function selectSurroundings(state: WorldState, {coord}: Cell): CellSurroundings {
    const surroundings: CellSurroundings = {} as CellSurroundings;
    Object.entries(offsets).forEach(([key, offset]) => {
        const x = (coord.x + offset.x) as X;
        const y = (coord.y + offset.y) as Y;
        surroundings[key as keyof typeof offsets] = selectCellState_Separated(state, x, y);
    });
    return surroundings;
}