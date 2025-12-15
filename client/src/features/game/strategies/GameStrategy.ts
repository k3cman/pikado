import type { AppDispatch } from "@/app/store";
import { GameStrategyCricket } from "./GameStrategyCricket";
import { GameStrategy501 } from "./GameStrategyX01";

export interface GameStrategy {
    handleThrow: (points: number) => void;
}

export const createGameStrategy = (mode: '501' | 'cricket', dispatch: AppDispatch) => {
    switch(mode) {
        case '501':
            return new GameStrategy501(dispatch);
        case 'cricket':
            return new GameStrategyCricket(dispatch);
        default:
            throw new Error(`Unsupported mode: ${mode}`);
    }
}