import {combineReducers} from "@reduxjs/toolkit";
import {worldReducer} from "../world/WorldReducer";
import {Reducer} from "react";

type ReducerActions<T extends Reducer<any, any>> = Parameters<T>[1];

export type RootState = {
    world: ReturnType<typeof worldReducer>;
};
export type RootActions = ReducerActions<typeof worldReducer>;

export const rootReducer = combineReducers<RootState, RootActions>({world: worldReducer});
