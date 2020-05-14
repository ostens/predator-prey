import {Coordinate, setCellAction} from "../world/WorldReducer";
import {RootActions} from "../root/RootReducer";

export type CellState = "ALIVE" | "DEAD";

export type Surroundings<T> = {
    topLeft: T;
    top: T;
    topRight: T;
    left: T;
    right: T;
    bottomLeft: T;
    bottom: T;
    bottomRight: T;
};
export type CellSurroundings = Partial<Surroundings<CellState>>;
export type CellConfig = {
    color: string;
    tick: (surroundings: CellSurroundings) => CellState;
    getClickAction: (coordinate: Coordinate) => RootActions;
}

export type AllConfigs = Record<CellState, CellConfig>;

export const cellConfigs: AllConfigs = {
    "ALIVE": {
        color: "white",
        getClickAction: (coord: Coordinate) => setCellAction({coord, newCellState: "DEAD"}),
        tick: (s: CellSurroundings) => {
            const aliveCount = Object.values(s).filter(state => state === "ALIVE").length;
            if (aliveCount > 3) {
                return "DEAD";
            } else if (aliveCount < 2) {
                return "DEAD";
            } else {
                return "ALIVE";
            }
        }
    },
    "DEAD": {
        color: "black",
        getClickAction: (coord: Coordinate) => setCellAction({coord, newCellState: "ALIVE"}),
        tick: (s: CellSurroundings) => {
            const aliveCount = Object.values(s).filter(state => state === "ALIVE").length;
            if (aliveCount === 3) {
                return "ALIVE";
            } else {
                return "DEAD";
            }
        }
    }
}