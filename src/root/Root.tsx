import React, {FunctionComponent} from 'react';
import World from "../world/World";
import {useAppDispatch} from "./RootStore";
import Button from "../button/Button";
import "./Root.scss";
import {randomiseAction, tickAction, clearAction, pauseAction, playAction} from "../world/WorldActions";
import {useWorldSelector, selectIsPlaying} from "../world/WorldSelectors";
import {WorldState} from "../world/WorldReducer"

const Root: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const isPlaying = useWorldSelector((state: WorldState) => selectIsPlaying(state));

    const handleClick = () => {
        return isPlaying ? dispatch(pauseAction()) : dispatch(playAction())
    }

    return <div>
        <World/>
        <Button onClick={() => dispatch(tickAction())}>Tick</Button>
        <Button onClick={() => dispatch(randomiseAction())}>Randomise</Button>
        <Button onClick={handleClick}>{isPlaying ? "Pause" : "Start"}</Button>
        <Button onClick={() => dispatch(clearAction())}>Clear</Button>
    </div>;
}

export default Root;
