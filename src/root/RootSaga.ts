import {select, SelectEffect, PutEffect, put, takeEvery, ForkEffect} from "redux-saga/effects";

import worldSaga from "../world/WorldSagas";
import {RootState} from "./RootReducer";
import {RootActions} from "./RootStore";

export default function* rootSaga() {
    yield worldSaga();
}

export function sagaSelect<T>(selector: (state: RootState) => T): SelectEffect {
    return select(selector);
}

export function sagaPut<A extends RootActions>(action: A): PutEffect<A> {
    return put(action);
}

export function sagaTakeEvery<A extends RootActions>(actionCreator: {type: A["type"]}, worker: (action: A) => void): ForkEffect {
    return takeEvery(actionCreator.type, worker)
}
