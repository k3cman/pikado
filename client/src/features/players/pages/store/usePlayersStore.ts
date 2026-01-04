import { supabase } from "@/lib/supabase";
import { create } from "zustand";

export interface Player {
  id: string;
  name: string;
}

interface PlayersState {
  players: Player[];
  fetchPlayers: () => Promise<Player[]>;
  addPlayer: (name: string) => Promise<Player>;
  // updatePlayer: (player: Player) => void;
  // deletePlayer: (id: string) => void;
}

const usePlayersStore = create<PlayersState>()((set, get) => ({
  players: [],
  fetchPlayers: async () => {
    const { data, error } = await supabase.from("players").select("*");
    if (error) throw error;
    set({ players: data });
    return data;
  },
  addPlayer: async (name: string) => {
    const { data, error } = await supabase
      .from("players")
      .insert({ name })
      .select()
      .single();
    if (error) throw error;
    set((state) => ({ players: [...state.players, data] }));
    return data;
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
