import React, {FunctionComponent} from 'react';
import World from "../world/World";
import {useAppDispatch} from "./RootStore";
import Button from "../button/Button";
import {randomiseAction, tickAction} from "../world/WorldReducer";
import "./Root.scss";

const Root: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    return <div>
        <World/>
        <Button onClick={() => dispatch(tickAction())}>Tick</Button>
        <Button onClick={() => dispatch(randomiseAction())}>Randomise</Button>
    </div>;
}

export default Root;
