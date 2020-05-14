import {combineReducers} from "@reduxjs/toolkit";
import {worldReducer} from "../world/WorldReducer";
import {ReducerActions} from "../types/Redux";

export type RootState = {
    world: ReturnType<typeof worldReducer>;
};
export type RootActions = ReducerActions<typeof worldReducer>;

export const rootReducer = combineReducers<RootState, RootActions>({world: worldReducer});
