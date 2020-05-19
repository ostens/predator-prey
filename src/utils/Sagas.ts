import {ActionCreator} from "./Reducers";
import {all, AllEffect, put, PutEffect, select, SelectEffect, takeEvery} from "redux-saga/effects";
import {RootState} from "../root/RootReducer";
import {RootActions} from "../root/RootStore";
import { SagaIterator } from "redux-saga";

type ActionMap<A extends string> = Array<[A, (payload: any) => SagaIterator]>;
export type Saga<A extends string> = AllEffect<unknown> & {_actions: A};

export class SagaBuilder{
    addCase<TYPE extends string, PAYLOAD>(actionCreator: ActionCreator<TYPE, any, PAYLOAD>, worker: (payload: PAYLOAD) => SagaIterator): SagaBuilderFilled<TYPE>{
        return new SagaBuilderFilled<TYPE>([[actionCreator.type, worker]])
    }
}

class SagaBuilderFilled<A extends string>{
    private readonly actionMap: ActionMap<A>;

    constructor(actionMap: ActionMap<A>) {
        this.actionMap = actionMap;
    }

    addCase<TYPE extends string, PAYLOAD>(actionCreator: ActionCreator<TYPE, any, PAYLOAD>, worker: (payload: PAYLOAD) => SagaIterator): SagaBuilderFilled<A | TYPE> {
        return new SagaBuilderFilled<A | TYPE>([...this.actionMap, [actionCreator.type, worker]] as ActionMap<A | TYPE>)
    }

    build(): Saga<A> {
        const takes = this.actionMap.map(([actionType,worker]) => takeEvery(actionType, worker));
        return all(takes) as Saga<A>;
    }
}

export type SagaActionTypes<S extends () => Generator<Saga<any>, any, any>> = Extract<ReturnType<ReturnType<S>["next"]>["value"], Saga<any>>["_actions"];

export function sagaSelect<T>(selector: (state: RootState) => T): SelectEffect {
    return select(selector);
}

export function sagaPut<A extends RootActions>(action: A): PutEffect<A> {
    return put(action);
}

