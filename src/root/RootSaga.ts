import worldSaga from "../world/WorldSagas";
import {SagaActionTypes} from "../utils/Sagas";

export default function* rootSaga() {
    yield worldSaga();
}

export type RootSagaActionTypes = SagaActionTypes<typeof worldSaga>;
