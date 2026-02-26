import { create } from "zustand";

export interface Player {
  id: string;
  name: string;
}

interface PlayersState {
  players: Player[];
  fetchPlayers: () => Promise<Player[]>;
  addPlayer: (name: string) => Promise<Player>;
  deletePlayer: (id: string) => Promise<void>;
  // updatePlayer: (player: Player) => void;
  // deletePlayer: (id: string) => void;
}

const PLAYERS_KEY = "pikado-players";

const usePlayersStore = create<PlayersState>()((set) => ({
  players: [],
  fetchPlayers: async () => {
    const raw = localStorage.getItem(PLAYERS_KEY);
    const data: Player[] = raw ? JSON.parse(raw) : [];
    set({ players: data });
    return data;
  },
  addPlayer: async (name: string) => {
    const raw = localStorage.getItem(PLAYERS_KEY);
    const players: Player[] = raw ? JSON.parse(raw) : [];
    const newPlayer: Player = {
      id: crypto.randomUUID(),
      name,
    };
    const updated = [...players, newPlayer];
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(updated));
    set((state) => ({ players: [...state.players, newPlayer] }));
    return newPlayer;
  },
  deletePlayer: async (id: string) => {
    const raw = localStorage.getItem(PLAYERS_KEY);
    const players: Player[] = raw ? JSON.parse(raw) : [];
    const updated = players.filter((p) => p.id !== id);
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(updated));
    set((state) => ({ players: state.players.filter((p) => p.id !== id) }));
  },
  // addPlayer: (player) => {
  //     set((state) => ({ players: [...state.players, player] }));
  // },
  // updatePlayer: (player) => {
  //     set((state) => ({ players: state.players.map((p) => p.id === player.id ? player : p) }));
  // },
}));

export const usePlayers = () => usePlayersStore((state) => state.players);
export const useFetchPlayers = () =>
  usePlayersStore((state) => state.fetchPlayers);
export const useAddPlayer = () => usePlayersStore((state) => state.addPlayer);
export const useDeletePlayer = () =>
  usePlayersStore((state) => state.deletePlayer);
