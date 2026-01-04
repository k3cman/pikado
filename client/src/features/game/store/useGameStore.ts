// src/features/game/store/useGameStore.ts
import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import { persist, createJSONStorage } from "zustand/middleware";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/useAuthStore";

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
}

export interface GameState {
  matchId: string | null;
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
  endTurn: () => void;
  resetGame: () => void;
  clearStorage: () => void;

  // Supabase sync actions
  createMatch: () => Promise<void>;
  syncDartThrow: (points: number) => Promise<void>;
  syncToServer: () => Promise<void>;
}

// ✅ Helper to check if user is authenticated
const isAuthenticated = (): boolean => {
  const user = useAuthStore.getState().user;
  return user !== null;
};

const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      matchId: null,
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
          set((state) => ({
            ...state,
            players: state.players.map((p) =>
              p.id === state.currentPlayerId ? { ...p, score: 0 } : p
            ),
            winnerId: state.currentPlayerId,
            history: [...state.history, historyEntry],
          }));

          // ✅ Only sync if authenticated
          if (state.matchId && isAuthenticated()) {
            get().syncToServer().catch(console.error);
          }
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
            history: [...state.history, historyEntry],
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

        // ✅ Only sync if authenticated
        if (state.matchId && isAuthenticated()) {
          get().syncDartThrow(totalPoints).catch(console.error);
        }
      },

      // ✅ Create match - skip if guest
      createMatch: async () => {
        // ✅ Early return if not authenticated
        if (!isAuthenticated()) {
          console.log("Guest mode: Skipping match creation");
          return;
        }

        const state = get();

        if (state.players.length === 0) {
          console.error("No players selected");
          return;
        }

        try {
          const { data: game, error } = await supabase
            .from("games")
            .insert({
              mode: state.mode,
              best_of_legs: state.bestOfLegs,
              best_of_sets: state.bestOfSets,
              start_score: state.startScore,
              input_format: state.inputFormat,
              status: "in_progress",
            })
            .select()
            .single();

          if (error) throw error;

          const gamePlayers = state.players.map((player) => ({
            game_id: game.id,
            player_id: player.id,
            player_name: player.name,
            score: player.score,
            score_at_start_of_turn: player.scoreAtStartOfTurn,
            current_player: player.id === state.currentPlayerId,
          }));

          const { error: playersError } = await supabase
            .from("game_players")
            .insert(gamePlayers);

          if (playersError) throw playersError;

          set({ matchId: game.id });
        } catch (error) {
          console.error("Failed to create match:", error);
        }
      },

      // ✅ Sync dart throw - skip if guest
      syncDartThrow: async (points: number) => {
        // ✅ Early return if not authenticated
        if (!isAuthenticated()) {
          return;
        }

        const state = get();
        if (!state.matchId) return;

        try {
          await supabase.from("game_history").insert({
            game_id: state.matchId,
            player_id: state.currentPlayerId,
            points,
            turn_number: Math.floor(state.history.length / 3) + 1,
            dart_number: 1,
          });
        } catch (error) {
          console.error("Failed to sync dart throw:", error);
        }
      },

      // ✅ Sync game state - skip if guest
      syncToServer: async () => {
        // ✅ Early return if not authenticated
        if (!isAuthenticated()) {
          return;
        }

        const state = get();
        if (!state.matchId) return;

        try {
          const updateData: any = {
            updated_at: new Date().toISOString(),
          };

          if (state.winnerId) {
            updateData.winner_id = state.winnerId;
            updateData.status = "completed";
          }

          const { error: gameError } = await supabase
            .from("games")
            .update(updateData)
            .eq("id", state.matchId);

          if (gameError) throw gameError;

          await supabase
            .from("game_players")
            .delete()
            .eq("game_id", state.matchId);

          const gamePlayers = state.players.map((player) => ({
            game_id: state.matchId!,
            player_id: player.id,
            player_name: player.name,
            score: player.score,
            score_at_start_of_turn: player.scoreAtStartOfTurn,
            current_player: player.id === state.currentPlayerId,
          }));

          const { error: playersError } = await supabase
            .from("game_players")
            .insert(gamePlayers);

          if (playersError) throw playersError;
        } catch (error) {
          console.error("Failed to sync game state:", error);
        }
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
export const useCreateMatch = () => useGameStore((state) => state.createMatch);
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
      matchId: state.matchId,
      mode: state.mode,
      bestOfLegs: state.bestOfLegs,
      bestOfSets: state.bestOfSets,
      startScore: state.startScore,
      inputFormat: state.inputFormat,
      winnerId: state.winnerId,
    }))
  );
