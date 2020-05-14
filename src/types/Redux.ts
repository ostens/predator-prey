import {Reducer} from "@reduxjs/toolkit";

export type ReducerActions<T extends Reducer<any, any>> = Parameters<T>[1];