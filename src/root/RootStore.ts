import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./RootReducer";
import { useDispatch } from "react-redux";

export const rootStore = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();