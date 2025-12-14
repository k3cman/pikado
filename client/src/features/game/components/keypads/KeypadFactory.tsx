import type { GameState } from "../../store/gameSlice";
import { KeypadCricket } from "./KeypadCricket";
import { KeypadX01 } from "./KeypadX01";

export const createKeypad = (mode: GameState['mode']) => {
    switch (mode) {
        case '501':
            return <KeypadX01 onPress={() => {}} onUndo={() => {}} />;
        case 'cricket':
            return <KeypadCricket />;
        default:
            return null;
    }
}