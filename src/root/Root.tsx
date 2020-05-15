import React, {FunctionComponent} from 'react';
import World from "../world/World";
import {useAppDispatch} from "./RootStore";
import Button from "../button/Button";
import "./Root.scss";
import {clearAction, randomiseAction, tickAction} from "../world/WorldActions";

const Root: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    return <div>
        <World/>
        <Button onClick={() => dispatch(tickAction())}>Tick</Button>
        <Button onClick={() => dispatch(randomiseAction())}>Randomise</Button>
        <Button onClick={() => dispatch(clearAction())}>Clear</Button>
    </div>;
}

export default Root;
