import { all } from "redux-saga/effects";

import playPause from "../world/WorldSagas";

export default function* rootSaga() {
  yield all([
    playPause()
  ]);
}
