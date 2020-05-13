import { CellProps } from "./Cell";

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
export type CellConfig = CellProps & {
  tick: (surroundings: CellSurroundings) => CellState
}

export type AllConfigs = Record<CellState, CellConfig>;

export const cellConfigs: AllConfigs = {
    "ALIVE": {
        color: "white",
        tick: (s: CellSurroundings) => {
          const alivecount = Object.values(s).filter(state => state === "ALIVE").length;
          if (alivecount > 3 ) {
            return "DEAD";
          } else if (alivecount < 2 ) {
            return "DEAD";
          } else {
            return "ALIVE";
          }
        }
    },
    "DEAD": {
        color: "black",
        tick: (s: CellSurroundings) => {
          const alivecount = Object.values(s).filter(state => state === "ALIVE").length;
          if (alivecount === 3 ) {
            return "ALIVE";
          } else {
            return "DEAD";
          }
        }
    }
}