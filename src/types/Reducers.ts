import {Reducer, createReducer, PayloadAction, Draft, Action} from "@reduxjs/toolkit";

type ActionMap<S, A extends ActionCreator<any, any, any>> = Array<[A, (state: Draft<S>, payload: ReturnType<A>["payload"]) => S]>;
type ActionCreator<TYPE extends string, ARGS extends any[], PAYLOAD extends any> = {type: TYPE} & ((...args: ARGS) => PayloadAction<PAYLOAD, TYPE>);

export class ReducerBuilder<S>{
    private readonly initialState: S;
    constructor(initialState: S) {
        this.initialState = initialState;
    }

    addCase<TYPE extends string, PAYLOAD>(actionCreator: ActionCreator<TYPE, any, PAYLOAD>, reducer: (state: Draft<S>, payload: PAYLOAD) => S): ReducerBuilderFilled<S, typeof actionCreator> {
        return new ReducerBuilderFilled<S, typeof actionCreator>(this.initialState, [[actionCreator, reducer]] as ActionMap<S, typeof actionCreator>)
    }
}

class ReducerBuilderFilled<S, A extends ActionCreator<any, any, any>>{
    private readonly initialState: S;
    private readonly actionMap: ActionMap<S, A>;

    constructor(initialState: S, actionMap: ActionMap<S, A>) {
        this.initialState = initialState;
        this.actionMap = actionMap;
    }

    addCase<TYPE extends string, PAYLOAD>(actionCreator: ActionCreator<TYPE, any, PAYLOAD>, reducer: (state: Draft<S>, payload: PAYLOAD) => S): ReducerBuilderFilled<S, A | typeof actionCreator> {
        return new ReducerBuilderFilled<S, A | typeof actionCreator>(this.initialState, [...this.actionMap, [actionCreator, reducer]] as ActionMap<S, A | typeof actionCreator>)
    }

    build(): Reducer<S, Action<A["type"]>> {
        return createReducer(this.initialState, (builder => {
            this.actionMap.forEach(([action, reducer]) => {
                builder.addCase(action.type, (state: Draft<S>, action: ReturnType<A>) => {
                    return reducer(state, action.payload)
                })
            })
        }))
    }
}

export type ReducerActions<T extends Reducer<any, any>> = Parameters<T>[1];
export type PayloadType<A extends ActionCreator<any, any, any>> = ReturnType<A>["payload"]
