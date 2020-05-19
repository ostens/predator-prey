import {createAction} from "@reduxjs/toolkit";
import {Coordinate} from "../utils/Coordinate";
import {CellState} from "../cell/CellReducer";

export const tickAction = createAction("tick");
export const randomiseAction = createAction("randomise");
export const gliderGunAction = createAction("gliderGun");
export const clearAction = createAction("clear");
export const setCellAction = createAction<{ coord: Coordinate, newCellState: CellState }, "setCell">("setCell");
export const playAction = createAction("play");
export const pauseAction = createAction("pause");
