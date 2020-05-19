import {combineReducers, Action} from "@reduxjs/toolkit";
import {worldReducer} from "../world/WorldReducer";
import {ReducerActionTypes} from "../utils/Reducers";

export type RootState = {
    world: ReturnType<typeof worldReducer>;
};
export type RootReducerActionTypes  = ReducerActionTypes<typeof worldReducer>;
export type RootReducerActions = Action<RootReducerActionTypes>;

export const rootReducer = combineReducers<RootState, RootReducerActions>({world: worldReducer});
