
import { combineReducers } from "@reduxjs/toolkit";
import { worldReducer } from "../world/WorldReducer";

export const rootReducer = combineReducers({
  world: worldReducer
});
export type RootState = ReturnType<typeof rootReducer>;