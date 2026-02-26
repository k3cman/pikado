import type { GameStrategy } from "./GameStrategy";

export class GameStrategyCricket implements GameStrategy {
  handleThrow(_points: number) {
    // Cricket scoring not yet implemented; game uses useGameStore directly
  }
}