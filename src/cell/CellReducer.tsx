import {Coordinate} from "../utils/Coordinate";
import {Surroundings} from "../utils/Surroundings";
import {setCellAction} from "../world/WorldActions";
import {RootActions} from "../root/RootStore";

export type CellState = "ALIVE" | "DEAD";
export type CellSurroundings = Surroundings<CellState>;
export type CellConfig = {
    color: string;
    tick: (surroundings: CellSurroundings) => CellState;
    getClickAction: (coordinate: Coordinate) => RootActions;
}

export const cellConfigs: Record<CellState, CellConfig> = {
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