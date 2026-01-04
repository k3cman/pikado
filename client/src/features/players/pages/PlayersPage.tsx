import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import {
  useFetchPlayers,
  usePlayers,
  type Player,
  useDeletePlayer,
} from "./store/usePlayersStore";
import { useEffect } from "react";
import { PencilIcon, TrashIcon } from "lucide-react";

export const PlayersPage = () => {
  const players = usePlayers();
  const fetchPlayers = useFetchPlayers();
  const deletePlayer = useDeletePlayer();
  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black text-gray-400 uppercase tracking-widest mb-8">
        Players List
      </h1>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-4">
        {players.map((player: Player) => {
          return (
            <div
              key={player.id}
              className="w-full p-4 border border-gray-700 flex justify-between items-center"
            >
              <span className="text-lg font-bold uppercase">{player.name}</span>
              <div className="flex gap-2">
                <Button variant="primary" size="sm">
                  <PencilIcon className="w-4 h-4" />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => deletePlayer(player.id)}
                >
                  <TrashIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Button variant="primary" size="sm" className="w-full">
        <Link to="/players/add">Add</Link>
      </Button>
    </div>
  );
};
