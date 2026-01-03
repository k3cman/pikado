import { create } from "zustand";
import { useShallow } from "zustand/shallow";

export interface PlayerZustand {
    id: string;
    name: string;
    score: number;
    // We keep track of the score at the START of the turn for the "Bust" rule
    scoreAtStartOfTurn: number;
}

export interface GameStateZustand {
    mode: '501' | 'cricket';
    bestOfLegs: number;
    bestOfSets: number;
    startScore: '301' | '501' | '701' | undefined;
    inputFormat: 'score' | 'single' | undefined;
    players: PlayerZustand[];
    currentPlayerId: string;
    // dartsThrownInTurn: number; // 0, 1, 2, or 3
    // winnerId: string | null;
    history: unknown[];
    startGame: (config: Partial<GameStateZustand>) => void;
    throwDart: (points: number) => void;
}

const dummyPlayers: PlayerZustand[] = [
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

const useGameStore = create<GameStateZustand>((set) => ({
    mode: '501',
    bestOfLegs: 3,
    bestOfSets: 3,
    startScore: undefined,
    inputFormat: 'score',
    players: dummyPlayers,
    currentPlayerId: '',
    history: [],

    startGame: (config: Partial<GameStateZustand>) => set((state) => ({
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
}))

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