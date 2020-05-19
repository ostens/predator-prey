import {cellConfigs, CellState} from "../cell/CellReducer";
import {Coordinate, X, Y} from "../utils/Coordinate";
import {
    clearAction,
    randomiseAction,
    setCellAction,
    tickAction,
    playAction,
    pauseAction,
    gliderGunAction
} from "./WorldActions";
import {Cells, offsets, randomCells, setCellInternal, Xrange, Yrange, gliderGunCells} from "./WorldUtils";
import {getCellStateXY, getSuroundings} from "./WorldSelectors";
import {PayloadType, ReducerBuilder} from "../utils/Reducers";

export type WorldState = {
    cells: Cells,
    xRange: Xrange,
    yRange: Yrange,
    isPlaying: boolean,
    tickDelay: number
}

const xRangeInit: Xrange = [0 as X, 40 as X]
const yRangeInit: Yrange = [0 as Y, 40 as Y]

const initState: WorldState = {
    cells: randomCells(xRangeInit, yRangeInit),
    xRange: xRangeInit,
    yRange: yRangeInit,
    isPlaying: false,
    tickDelay: 200
};

export const worldReducer = new ReducerBuilder(initState)
    .addCase(tickAction, tick)
    .addCase(randomiseAction, randomise)
    .addCase(gliderGunAction, gliderGun)
    .addCase<"setCell", { coord: Coordinate, newCellState: CellState }>(setCellAction, setCell)
    .addCase(playAction, play)
    .addCase(pauseAction, pause)
    .addCase(clearAction, clear)
    .build();

function tick(state: WorldState): WorldState {
    const aliveCells: Cells = {};
    Object.values(state.cells).forEach(column => {
        Object.values(column).forEach(cell => {
            const {tick} = cellConfigs[cell.state];
            const surroundings = getSuroundings(state, cell);
            const newState = tick(surroundings);
            if (newState === "ALIVE") {
                setCellInternal(aliveCells, {...cell, state: newState});
            }
        })
    });

    const cells: Cells = {};
    Object.values(aliveCells).forEach(column =>
        Object.values(column).forEach(({coord}) =>
            Object.values(offsets).forEach(offset =>
                setCellInternal(cells, {
                    coord: {
                        x: (coord.x + offset.x) as X,
                        y: (coord.y + offset.y) as Y
                    },
                    state: "DEAD"
                })
            )
        )
    )

    Object.values(aliveCells).forEach(column =>
        Object.values(column).forEach(cell =>
            setCellInternal(cells, cell)
        )
    )

    const cellCount = Object.values(cells).reduce((acc, column) => acc + Object.keys(column).length, 0)
    console.log(cellCount, "relevant cells");

    return {...state, cells};
}

function randomise(state: WorldState): WorldState {
    state.cells = randomCells(state.xRange, state.yRange);
    return state;
}

function gliderGun(state: WorldState): WorldState {
    state.cells = gliderGunCells(state.xRange, state.yRange);
    return state;
}

function play(state: WorldState): WorldState {
    state.isPlaying = true;
    return state;
}

function pause(state: WorldState): WorldState {
    state.isPlaying = false;
    return state;
}

function clear(state: WorldState): WorldState {
    state.cells = {};
    return state;
}

function setCell(state: WorldState, payload: PayloadType<typeof setCellAction>): WorldState {
    setCellInternal(state.cells, {coord: payload.coord, state: payload.newCellState});
    if (payload.newCellState === "ALIVE") {
        Object.values(offsets).forEach(offset => {
            const x = (payload.coord.x + offset.x) as X;
            const y = (payload.coord.y + offset.y) as Y;
            const currentState = getCellStateXY(state, x, y);
            if (currentState !== "ALIVE") {
                setCellInternal(state.cells, {
                    coord: {x, y},
                    state: "DEAD"
                })
            }
        })
    }
    return state;
}


