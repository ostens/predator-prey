import { all, takeEvery, select, put, delay } from "redux-saga/effects";
import { SagaIterator } from '@redux-saga/core';

import { playAction, tickAction } from "./WorldActions";
import {getTickDelay, getIsPlaying, fromWorld} from "./WorldSelectors";

export function* play(): SagaIterator {
  while (yield select(fromWorld(getIsPlaying))) {
    yield put(tickAction());
    yield delay(yield select(fromWorld(getTickDelay)));
  }
}

export default function* rootSaga(): SagaIterator {
  yield all([
    yield takeEvery(playAction, play),
  ]);
}
