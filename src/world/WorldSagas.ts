import { all, takeEvery, delay, select, put } from "redux-saga/effects";
import { SagaIterator } from '@redux-saga/core';

import { playAction, tickAction } from "./WorldActions";
import { RootState } from "../root/RootReducer";

const getIsPlaying = (state: RootState): boolean => {
  const isPlaying = state.world?.isPlaying as boolean;
  return isPlaying;
}

const getDelay = (state: RootState): number => {
  const delay = state.world?.delay as number;
  return delay;
}

export function* play(): SagaIterator {
  let playing: boolean = yield select(getIsPlaying);
  let delayTime: number = yield select(getDelay);
  while (playing) {
    yield put(tickAction());
    yield delay(delayTime);
    playing = yield select(getIsPlaying);
  }
}

export default function* rootSaga(): SagaIterator {
  yield all([
    yield takeEvery(playAction, play),
  ]);
}
