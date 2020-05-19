import {combineReducers} from "@reduxjs/toolkit";
import {worldReducer} from "../world/WorldReducer";
import {RootActions} from "./RootStore";

export type RootState = {
    world: ReturnType<typeof worldReducer>;
};


export const rootReducer = combineReducers<RootState, RootActions>({world: worldReducer});
