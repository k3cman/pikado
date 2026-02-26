import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import { persist, createJSONStorage } from "zustand/middleware";

export interface Player {
  id: string;
  name: string;
  score: number;
  scoreAtStartOfTurn: number;
}

export interface GameHistoryEntry {
  playerId: string;
  points: number;
  timestamp: number;
  bust?: boolean;
}

export interface CompletedGame {
  id: string;
  players: Player[];
  startScore: number;
  mode: "501" | "cricket";
  winnerId: string;
  finishedAt: number;
  history: GameHistoryEntry[];
}

const HISTORY_KEY = "pikado-history";

const appendToHistory = (game: CompletedGame) => {
  const raw = localStorage.getItem(HISTORY_KEY);
  const existing: CompletedGame[] = raw ? JSON.parse(raw) : [];
  const updated = [...existing, game];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export interface GameState {
  mode: "501" | "cricket";
  bestOfLegs: number;
  bestOfSets: number;
  startScore: "301" | "501" | "701" | undefined;
  inputFormat: "score" | "single" | undefined;
  players: Player[];
  currentPlayerId: string;
  winnerId: string | null;
  history: GameHistoryEntry[];

  startGame: (config: Partial<GameState>) => void;
  throwDart: (points: number) => void;
  undo: () => void;
  endTurn: () => void;
  resetGame: () => void;
  clearStorage: () => void;
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
        set((state) => {
          const newPlayers = config.players || state.players;
          return {
            ...state,
            mode: config.mode ?? state.mode,
            bestOfLegs: config.bestOfLegs ?? state.bestOfLegs,
            bestOfSets: config.bestOfSets ?? state.bestOfSets,
            startScore: config.startScore ?? state.startScore,
            inputFormat: config.inputFormat ?? state.inputFormat,
            players: newPlayers,
            winnerId: null,
            currentPlayerId: newPlayers[0]?.id || state.currentPlayerId,
            history: [],
          };
        }),

      endTurn: () =>
        set((state) => {
          if (state.winnerId) return state;

          const currentIndex = state.players.findIndex(
            (p) => p.id === state.currentPlayerId
          );
          const nextIndex = (currentIndex + 1) % state.players.length;
          const nextPlayer = state.players[nextIndex];

          return {
            ...state,
            currentPlayerId: nextPlayer.id,
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

      clearStorage: () => {
        localStorage.removeItem("current-game");
        get().resetGame();
      },

      throwDart: (totalPoints: number) => {
        const state = get();

        if (state.winnerId) return;

        const player = state.players.find(
          (p) => p.id === state.currentPlayerId
        );
        if (!player) return;

        const newScore = player.score - totalPoints;

        const historyEntry: GameHistoryEntry = {
          playerId: state.currentPlayerId,
          points: totalPoints,
          timestamp: Date.now(),
        };

        // CHECK 1: WINNING SHOT
        if (newScore === 0) {
          set((state) => {
            const updatedHistory = [...state.history, historyEntry];
            const updatedPlayers = state.players.map((p) =>
              p.id === state.currentPlayerId ? { ...p, score: 0 } : p
            );

            appendToHistory({
              id: crypto.randomUUID(),
              players: updatedPlayers,
              startScore:
                state.startScore === "301"
                  ? 301
                  : state.startScore === "501"
                  ? 501
                  : state.startScore === "701"
                  ? 701
                  : 501,
              mode: state.mode,
              winnerId: state.currentPlayerId,
              finishedAt: Date.now(),
              history: updatedHistory,
            });

            return {
              ...state,
              players: updatedPlayers,
              winnerId: state.currentPlayerId,
              history: updatedHistory,
            };
          });

          return;
        }

        // CHECK 2: BUST
        if (newScore < 0 || newScore === 1) {
          set((state) => ({
            ...state,
            players: state.players.map((p) =>
              p.id === state.currentPlayerId
                ? { ...p, score: p.scoreAtStartOfTurn }
                : p
            ),
            history: [...state.history, { ...historyEntry, bust: true }],
          }));
        }
        // CHECK 3: VALID SHOT
        else {
          set((state) => ({
            ...state,
            players: state.players.map((p) =>
              p.id === state.currentPlayerId ? { ...p, score: newScore } : p
            ),
            history: [...state.history, historyEntry],
          }));
        }

        get().endTurn();
      },

      undo: () => {
        const state = get();
        if (state.winnerId !== null || state.history.length === 0) return;

        const lastEntry = state.history[state.history.length - 1];
        const newHistory = state.history.slice(0, -1);

        set({
          ...state,
          history: newHistory,
          currentPlayerId: lastEntry.playerId,
          players: state.players.map((p) => {
            if (p.id !== lastEntry.playerId) return p;
            if (lastEntry.bust) return p;
            return { ...p, score: p.score + lastEntry.points };
          }),
        });
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
export const useUndo = () => useGameStore((state) => state.undo);
export const useClearStorage = () =>
  useGameStore((state) => state.clearStorage);
export const usePlayers = () =>
  useGameStore(
    useShallow((state) => ({
      players: state.players,
      currentPlayerId: state.currentPlayerId,
    }))
  );

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
