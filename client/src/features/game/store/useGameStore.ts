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
  startScore: "301" | "101" | "701" | undefined;
  inputFormat: "score" | "single" | undefined;
  players: Player[];
  currentPlayerId: string;
  dartsThrownInTurn: number;
  winnerId: string | null;
  history: unknown[];
  startGame: (config: Partial<GameState>) => void;
  throwDart: (points: number) => void;
  endTurn: () => void;
  resetGame: () => void; // Reset to initial state
  clearStorage: () => void; // Clear localStorage
}

const dummyPlayers: Player[] = [
  {
    id: "1",
    name: "Player 1",
    score: 101,
    scoreAtStartOfTurn: 101,
  },
  {
    id: "2",
    name: "Player 2",
    score: 101,
    scoreAtStartOfTurn: 101,
  },
];

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      mode: "501",
      bestOfLegs: 3,
      bestOfSets: 3,
      startScore: undefined,
      inputFormat: "score",
      players: dummyPlayers,
      dartsThrownInTurn: 0,
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
            dartsThrownInTurn: 0,
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
            : state.startScore === "101"
            ? 101
            : state.startScore === "701"
            ? 701
            : 101;

        set({
          ...state,
          players: state.players.map((p) => ({
            ...p,
            score: startScore,
            scoreAtStartOfTurn: startScore,
          })),
          currentPlayerId: state.players[0]?.id || "1",
          dartsThrownInTurn: 0,
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
        if (newScore > 1) {
          set((state) => ({
            ...state,
            players: state.players.map((p) =>
              p.id === state.currentPlayerId ? { ...p, score: newScore } : p
            ),
            dartsThrownInTurn: state.dartsThrownInTurn + 1,
          }));

          // Check if turn is over (3 darts thrown)
          const updatedState = get();
          if (updatedState.dartsThrownInTurn >= 3) {
            get().endTurn();
          }
        }
        // CHECK 2: WINNING SHOT (Score is exactly 0)
        // Note: Keypad already handles multiplier, so if we get here with 0,
        // it means it was a valid finish (double out)
        else if (newScore === 0) {
          set((state) => ({
            ...state,
            players: state.players.map((p) =>
              p.id === state.currentPlayerId ? { ...p, score: 0 } : p
            ),
            winnerId: state.currentPlayerId,
          }));
        }
        // CHECK 3: BUST (Score < 0 OR Score is 1)
        else {
          // Reset score to what it was at start of turn
          set((state) => ({
            ...state,
            players: state.players.map((p) =>
              p.id === state.currentPlayerId
                ? { ...p, score: p.scoreAtStartOfTurn }
                : p
            ),
          }));
          // End turn immediately (Bust ends your turn)
          get().endTurn();
        }
      },
    }),
    {
      name: "current-game",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// const useGameStore = create<GameState>(
//     persist((set) => ({
//         mode: '501',
//         bestOfLegs: 3,
//         bestOfSets: 3,
//         startScore: undefined,
//         inputFormat: 'score',
//         players: dummyPlayers,
//         currentPlayerId: '',
//         history: [],

//         startGame: (config: Partial<GameState>) => set((state) => ({
//             ...state,
//             mode: config.mode ,
//             bestOfLegs: config.bestOfLegs,
//             bestOfSets: config.bestOfSets,
//             startScore: config.startScore,
//             inputFormat: config.inputFormat,
//         })),

//         throwDart: (points: number) => {
//             console.log(points);
//         }
//     }), {
//         name: 'current-game',
//         storage: createJSONStorage(() => localStorage),
//     }
// ))

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
    }))
  );
