import { delay } from "redux-saga/effects";

import { playAction, tickAction } from "./WorldActions";
import {getTickDelay, getIsPlaying, fromWorld} from "./WorldSelectors";
import {SagaBuilder, sagaPut, sagaSelect} from "../utils/Sagas";
import { SagaIterator } from "redux-saga";

function* play(): SagaIterator {
  while (yield sagaSelect(fromWorld(getIsPlaying))) {
    yield sagaPut(tickAction());
    yield delay(yield sagaSelect(fromWorld(getTickDelay)));
  }
}

export default function* worldSaga() {
  const sagaBuilder = new SagaBuilder()
      .addCase(playAction, play)
      .build();
  yield sagaBuilder;
}
