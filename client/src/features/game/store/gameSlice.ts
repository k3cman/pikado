import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// --- Types ---
export interface Player {
    id: string;
    name: string;
    score: number;
    // We keep track of the score at the START of the turn for the "Bust" rule
    scoreAtStartOfTurn: number;
}

export interface GameState {
    mode: '301' | '501' | '701' | 'cricket';
    players: Player[];
    currentPlayerId: string;
    dartsThrownInTurn: number; // 0, 1, 2, or 3
    winnerId: string | null;
    history: any[]; // For Undo (simplified for now)
}

const initialState: GameState = {
    mode: '501',
    players: [],
    currentPlayerId: '',
    dartsThrownInTurn: 0,
    winnerId: null,
    history: [],
};

// --- Helper: Switch Turn ---
const endTurn = (state: GameState) => {
    state.dartsThrownInTurn = 0;

    // Find index of current player
    const currentIndex = state.players.findIndex(p => p.id === state.currentPlayerId);
    // Calculate next index (loops back to 0)
    const nextIndex = (currentIndex + 1) % state.players.length;

    state.currentPlayerId = state.players[nextIndex].id;

    // Snapshot the score for the new player (for next Bust calculation)
    state.players[nextIndex].scoreAtStartOfTurn = state.players[nextIndex].score;
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        // 1. Initialize Game
        startGame: (state, action: PayloadAction<{ mode: GameState['mode'], players: string[] }>) => {
            const startScore = parseInt(action.payload.mode); // e.g., 501

            state.mode = action.payload.mode;
            state.players = action.payload.players.map(name => ({
                id: name, // simple ID for now
                name,
                score: startScore,
                scoreAtStartOfTurn: startScore
            }));
            state.currentPlayerId = state.players[0].id;
            state.dartsThrownInTurn = 0;
            state.winnerId = null;
        },

        // 2. The Main 501 Logic
        throwDart: (state, action: PayloadAction<{ points: number; multiplier: number }>) => {
            if (state.winnerId) return; // Game over, no more throws

            const player = state.players.find(p => p.id === state.currentPlayerId);
            if (!player) return;

            const totalValue = action.payload.points * action.payload.multiplier;
            const newScore = player.score - totalValue;

            // --- LOGIC CHECKS ---

            // CHECK 1: Valid Shot (Score > 1)
            if (newScore > 1) {
                player.score = newScore;
                state.dartsThrownInTurn += 1;
            }
            // CHECK 2: WINNING SHOT (Score is 0 AND it's a Double)
            else if (newScore === 0 && action.payload.multiplier === 2) {
                player.score = 0;
                state.winnerId = player.id;
                return; // Stop execution, game won
            }
            // CHECK 3: BUST (Score < 0 OR Score is 1 OR Score is 0 but not double)
            else {
                // Reset score to what it was at start of turn
                player.score = player.scoreAtStartOfTurn;
                // End turn immediately (Bust ends your turn)
                endTurn(state);
                return;
            }

            // Check if turn is over (3 darts)
            if (state.dartsThrownInTurn >= 3) {
                endTurn(state);
            }
        },

        // 3. Simple Reset
        resetGame: (state) => {
            return initialState;
        }
    },
});

export const { startGame, throwDart, resetGame } = gameSlice.actions;
export default gameSlice.reducer;