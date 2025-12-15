import type { AppDispatch } from "@/app/store";
import { throwDart, type GameState } from "../store/gameSlice";
import type { GameStrategy } from "./GameStrategy";

export class GameStrategy501 implements GameStrategy {
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