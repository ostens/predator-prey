import {Reducer, createReducer, PayloadAction, Draft, Action} from "@reduxjs/toolkit";

type ActionMap<S, A extends string> = Array<[A, (state: Draft<S>, payload: any) => S]>;
export type ActionCreator<TYPE extends string, ARGS extends any[], PAYLOAD extends any> = {type: TYPE} & ((...args: ARGS) => PayloadAction<PAYLOAD, TYPE>);

export class ReducerBuilder<S>{
    private readonly initialState: S;
    constructor(initialState: S) {
        this.initialState = initialState;
    }

    addCase<TYPE extends string, PAYLOAD>(actionCreator: ActionCreator<TYPE, any, PAYLOAD>, reducer: (state: Draft<S>, payload: PAYLOAD) => S): ReducerBuilderFilled<S, TYPE> {
        return new ReducerBuilderFilled<S, TYPE>(this.initialState, [[actionCreator.type, reducer]] as ActionMap<S, TYPE>)
    }
}

class ReducerBuilderFilled<S, A extends string>{
    private readonly initialState: S;
    private readonly actionMap: ActionMap<S, A>;

    constructor(initialState: S, actionMap: ActionMap<S, A>) {
        this.initialState = initialState;
        this.actionMap = actionMap;
    }

    addCase<TYPE extends string, PAYLOAD>(actionCreator: ActionCreator<TYPE, any, PAYLOAD>, reducer: (state: Draft<S>, payload: PAYLOAD) => S): ReducerBuilderFilled<S, A | TYPE> {
        return new ReducerBuilderFilled<S, A | TYPE>(this.initialState, [...this.actionMap, [actionCreator, reducer]] as ActionMap<S, A | TYPE>)
    }

    build(): Reducer<S, Action<A>> {
        return createReducer(this.initialState, (builder => {
            this.actionMap.forEach(([action, reducer]) => {
                builder.addCase(action, (state: Draft<S>, action: any) => {
                    return reducer(state, action.payload)
                })
            })
        }))
    }
}

export type ReducerActionTypes<T extends Reducer> = Parameters<T>[1]["type"];
export type PayloadType<A extends ActionCreator<any, any, any>> = ReturnType<A>["payload"]
