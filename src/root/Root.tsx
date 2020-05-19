import React, { FunctionComponent } from 'react';
import World from "../world/World";
import { useAppDispatch } from "./RootStore";
import Button from "../button/Button";
import "./Root.scss";
import { randomiseAction, gliderGunAction, tickAction, clearAction, pauseAction, playAction } from "../world/WorldActions";
import { WorldState } from "../world/WorldReducer"
import {fromWorld} from "../world/WorldSelectors";
import {useSelector} from "react-redux";

const Root: FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const isPlaying = useSelector(fromWorld((state: WorldState) => state.isPlaying));

    const handleClick = () => {
        return isPlaying ? dispatch(pauseAction()) : dispatch(playAction())
    }

    return <div>
        <World />
        <Button onClick={() => dispatch(tickAction())}>Tick</Button>
        <Button onClick={() => dispatch(randomiseAction())}>Randomise</Button>
        <Button onClick={handleClick}>{isPlaying ? "Pause" : "Start"}</Button>
        <Button onClick={() => dispatch(clearAction())}>Clear</Button>
        <Button onClick={() => dispatch(gliderGunAction())}>Glider gun</Button>
    </div>;
}

export default Root;
