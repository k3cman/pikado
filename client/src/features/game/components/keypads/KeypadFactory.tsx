import type { GameStateZustand } from "../../store/useGameStore";
import { KeypadCricket } from "./KeypadCricket";
import { KeypadX01 } from "./KeypadX01";

export const createKeypad = (
  mode: GameStateZustand["mode"],
  inputFormat: "score" | "single",
  onPress: (points: number) => void
) => {
  switch (mode) {
    case "501":
      return <KeypadX01 onPress={onPress} inputFormat={inputFormat} />;
    case "cricket":
      return <KeypadCricket onPress={onPress} />;
    default:
      return null;
  }
};
