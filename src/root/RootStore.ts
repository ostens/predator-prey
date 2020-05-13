import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./RootReducer";
import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: rootReducer
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();