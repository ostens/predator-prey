import {createAction} from "@reduxjs/toolkit";
import {Coordinate} from "../types/Coordinate";
import {CellState} from "../cell/CellReducer";

export const tickAction = createAction("tick");
export const randomiseAction = createAction("randomise");
export const setCellAction = createAction<{ coord: Coordinate, newCellState: CellState }, "setCell">("setCell");
export const playAction = createAction("play");
export const pauseAction = createAction("pause");

const actions = [tickAction, randomiseAction, setCellAction, playAction, pauseAction];
export type WorldActions = ReturnType<(typeof actions)[number]>;