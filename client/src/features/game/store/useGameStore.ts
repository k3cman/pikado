import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Player {
  id: string;
  name: string;
  score: number;
  // We keep track of the score at the START of the turn for the "Bust" rule
  scoreAtStartOfTurn: number;
}

export interface GameState {
  mode: "501" | "cricket";
  bestOfLegs: number;
  bestOfSets: number;
  startScore: "301" | "501" | "701" | undefined;
  inputFormat: "score" | "single" | undefined;
  players: Player[];
  currentPlayerId: string;
  winnerId: string | null;
  history: unknown[];
  startGame: (config: Partial<GameState>) => void;
  throwDart: (points: number) => void;
  endTurn: () => void;
  resetGame: () => void; // Reset to initial state
  clearStorage: () => void; // Clear localStorage
}

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      mode: "501",
      bestOfLegs: 3,
      bestOfSets: 3,
      startScore: undefined,
      inputFormat: "score",
      players: [] as Player[],
      currentPlayerId: "1",
      winnerId: null,
      history: [],

      startGame: (config: Partial<GameState>) =>
        set((state) => ({
          ...state,
          mode: config.mode,
          bestOfLegs: config.bestOfLegs,
          bestOfSets: config.bestOfSets,
          startScore: config.startScore,
          inputFormat: config.inputFormat,
          players: config.players,
          winnerId: null,
          history: [],
        })),

      endTurn: () =>
        set((state) => {
          if (state.winnerId) return state; // Game over

          const currentIndex = state.players.findIndex(
            (p) => p.id === state.currentPlayerId
          );
          const nextIndex = (currentIndex + 1) % state.players.length;
          const nextPlayer = state.players[nextIndex];

          return {
            ...state,
            currentPlayerId: nextPlayer.id,
            // Snapshot score for next turn (for bust calculation)
            players: state.players.map((p) =>
              p.id === nextPlayer.id ? { ...p, scoreAtStartOfTurn: p.score } : p
            ),
          };
        }),

      resetGame: () => {
        const state = get();
        const startScore =
          state.startScore === "301"
            ? 301
            : state.startScore === "501"
            ? 501
            : state.startScore === "701"
            ? 701
            : 501;

        set({
          ...state,
          players: state.players.map((p) => ({
            ...p,
            score: startScore,
            scoreAtStartOfTurn: startScore,
          })),
          currentPlayerId: state.players[0]?.id || "1",
          winnerId: null,
          history: [],
        });
      },

      // Clear localStorage persistence
      clearStorage: () => {
        localStorage.removeItem("current-game");
        // Reset to initial state
        get().resetGame();
      },

      // Main 501 Logic
      throwDart: (totalPoints: number) => {
        const state = get();

        // Game over check
        if (state.winnerId) return;

        // Find current player
        const player = state.players.find(
          (p) => p.id === state.currentPlayerId
        );
        if (!player) return;

        // Calculate new score
        const newScore = player.score - totalPoints;

        // CHECK 1: Valid Shot (Score > 1)
        if (newScore === 0) {
          set((state) => ({
            ...state,
            players: state.players.map((p) =>
              p.id === state.currentPlayerId ? { ...p, score: 0 } : p
            ),
            winnerId: state.currentPlayerId,
          }));
          // Game over, don't switch players
          return;
        }
        // CHECK 2: WINNING SHOT (Score is exactly 0)
        // Note: Keypad already handles multiplier, so if we get here with 0,
        // it means it was a valid finish (double out)
        if (newScore < 0 || newScore === 1) {
          // Reset score to what it was at start of turn
          set((state) => ({
            ...state,
            players: state.players.map((p) =>
              p.id === state.currentPlayerId
                ? { ...p, score: p.scoreAtStartOfTurn }
                : p
            ),
          }));
        }
        // CHECK 3: BUST (Score < 0 OR Score is 1)
        else {
          set((state) => ({
            ...state,
            players: state.players.map((p) =>
              p.id === state.currentPlayerId ? { ...p, score: newScore } : p
            ),
          }));
        }

        get().endTurn();
      },
    }),
    {
      name: "current-game",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useGameStore;

export const useStartGame = () => useGameStore((state) => state.startGame);
export const useThrowDart = () => useGameStore((state) => state.throwDart);
export const useResetGame = () => useGameStore((state) => state.resetGame);
export const useClearStorage = () =>
  useGameStore((state) => state.clearStorage);
export const usePlayers = () =>
  useGameStore(
    useShallow((state) => ({
      players: state.players,
      currentPlayerId: state.currentPlayerId,
    }))
  );
// export const useGameConfig = () => useShallow(useGameStore((state) => ({

// })));

export const useGameConfig = () =>
  useGameStore(
    useShallow((state) => ({
      mode: state.mode,
      bestOfLegs: state.bestOfLegs,
      bestOfSets: state.bestOfSets,
      startScore: state.startScore,
      inputFormat: state.inputFormat,
      winnerId: state.winnerId,
    }))
  );
