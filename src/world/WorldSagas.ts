import { delay } from "redux-saga/effects";

import { playAction, tickAction } from "./WorldActions";
import {getTickDelay, getIsPlaying, fromWorld} from "./WorldSelectors";
import {sagaPut, sagaSelect, sagaTakeEvery} from "../root/RootSaga";

export function* play() {
  while (yield sagaSelect(fromWorld(getIsPlaying))) {
    yield sagaPut(tickAction());
    yield delay(yield sagaSelect(fromWorld(getTickDelay)));
  }
}

export default function* worldSaga() {
  yield sagaTakeEvery<typeof playAction>(playAction, play);
}
