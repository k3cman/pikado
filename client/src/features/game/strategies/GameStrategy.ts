import { GameStrategyCricket } from "./GameStrategyCricket";
import { GameStrategy501 } from "./GameStrategyX01";

export interface GameStrategy {
  handleThrow: (points: number) => void;
}

export const createGameStrategy = (mode: "501" | "cricket") => {
  switch (mode) {
    case "501":
      return new GameStrategy501();
    case "cricket":
      return new GameStrategyCricket();
    default:
      throw new Error(`Unsupported mode: ${mode}`);
  }
};