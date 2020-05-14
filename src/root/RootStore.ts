import {configureStore} from "@reduxjs/toolkit";
import {RootActions, rootReducer, RootState} from "./RootReducer";
import { useDispatch } from "react-redux";

export const rootStore = configureStore<RootState, RootActions, []>({
  reducer: rootReducer
});
export type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
