import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {rootReducer, RootState} from "./RootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./RootSaga";
import { useDispatch } from "react-redux";
import {ReducerActions} from "../types/Reducers";
import {worldReducer} from "../world/WorldReducer";

export type RootActions = ReducerActions<typeof worldReducer>;

const sagaMiddleware = createSagaMiddleware();

// TODO: type sagas
export const rootStore = configureStore<RootState, RootActions, any>({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware<RootState>(),
    sagaMiddleware,
  ] as const
});
export type AppDispatch = typeof rootStore.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

sagaMiddleware.run(rootSaga);
