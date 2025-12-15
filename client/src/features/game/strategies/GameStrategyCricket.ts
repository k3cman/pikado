import type { AppDispatch } from "@/app/store";
import { throwDart } from "../store/gameSlice";
import type { GameStrategy } from "./GameStrategy";

export class GameStrategyCricket implements GameStrategy {
    private dispatch: AppDispatch;

    constructor(
        dispatch: AppDispatch
    ){
        this.dispatch = dispatch;
    }
    handleThrow(points:number){
        this.dispatch(throwDart({points}))
    }
}