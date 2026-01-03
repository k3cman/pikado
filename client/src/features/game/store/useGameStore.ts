import { create } from "zustand";
import { useShallow } from "zustand/shallow";
import {persist, createJSONStorage} from "zustand/middleware";

export interface Player {
    id: string;
    name: string;
    score: number;
    // We keep track of the score at the START of the turn for the "Bust" rule
    scoreAtStartOfTurn: number;
}

export interface GameState {
    mode: '501' | 'cricket';
    bestOfLegs: number;
    bestOfSets: number;
    startScore: '301' | '501' | '701' | undefined;
    inputFormat: 'score' | 'single' | undefined;
    players: Player[];
    currentPlayerId: string;
    // dartsThrownInTurn: number; // 0, 1, 2, or 3
    // winnerId: string | null;
    history: unknown[];
    startGame: (config: Partial<GameState>) => void;
    throwDart: (points: number) => void;
}

const dummyPlayers: Player[] = [
    {
        id: '1',
        name: 'Player 1',
        score: 501,
        scoreAtStartOfTurn: 501,
    },
    {
        id: '2',
        name: 'Player 2',
        score: 501,
        scoreAtStartOfTurn: 501,
    },
];

const useGameStore = create<GameState>()(
    persist(
        (set) => ({
            mode: '501',
    bestOfLegs: 3,
    bestOfSets: 3,
    startScore: undefined,
    inputFormat: 'score',
    players: dummyPlayers,
    currentPlayerId: '',
    history: [],

    startGame: (config: Partial<GameState>) => set((state) => ({
        ...state,
        mode: config.mode ,
        bestOfLegs: config.bestOfLegs,
        bestOfSets: config.bestOfSets,
        startScore: config.startScore,
        inputFormat: config.inputFormat,
    })),

    throwDart: (points: number) => {
        console.log(points);
    }
        }), {
            name: 'current-game',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

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
export const usePlayers = () => useGameStore(
    useShallow(state => ({
        players: state.players,
    currentPlayerId: state.currentPlayerId,
    }))
);
// export const useGameConfig = () => useShallow(useGameStore((state) => ({
   
// })));

export const useGameConfig = () => useGameStore(useShallow((state) => ({
    mode: state.mode,
    bestOfLegs: state.bestOfLegs,
    bestOfSets: state.bestOfSets,
    startScore: state.startScore,
    inputFormat: state.inputFormat,
})))