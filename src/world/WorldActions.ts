import {createAction} from "@reduxjs/toolkit";
import {Coordinate} from "../types/Coordinate";
import {CellState} from "../cell/CellReducer";

export const tickAction = createAction("tick");
export const randomiseAction = createAction("randomise");
export const setCellAction = createAction<{ coord: Coordinate, newCellState: CellState }, "setCell">("setCell");

const actions = [tickAction, randomiseAction, setCellAction];
export type WorldActions = ReturnType<(typeof actions)[number]>;