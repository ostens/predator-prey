import {configureStore, getDefaultMiddleware, Action} from "@reduxjs/toolkit";
import {rootReducer, RootReducerActions, RootReducerActionTypes, RootState} from "./RootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga, {RootSagaActionTypes} from "./RootSaga";
import { useDispatch } from "react-redux";
import {Dispatch} from "react";

type RootActionTypes = RootReducerActionTypes | RootSagaActionTypes;
export type RootActions = Action<RootActionTypes>;

const sagaMiddleware = createSagaMiddleware();

export const rootStore = configureStore<RootState, RootReducerActions, any>({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware<RootState>(),
    sagaMiddleware,
  ] as const
});

export type AppDispatch = Dispatch<RootActions>;
export const useAppDispatch = () => useDispatch<AppDispatch>();

sagaMiddleware.run(rootSaga);
