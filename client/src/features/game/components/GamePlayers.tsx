// src/features/game/components/GamePlayers.tsx
import { Field } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Player } from "@/features/players/pages/store/usePlayersStore";

interface GamePlayersProps {
  players: Player[];
  player1Id: string;
  player2Id: string;
  onPlayer1Change: (playerId: string) => void;
  onPlayer2Change: (playerId: string) => void;
}

export const GamePlayers = ({
  players,
  player1Id,
  player2Id,
  onPlayer1Change,
  onPlayer2Change,
}: GamePlayersProps) => {
  const player1Options = players.filter((p) => p.id !== player2Id);
  const player2Options = players.filter((p) => p.id !== player1Id);

  return (
    <div className="w-full grid grid-cols-2 md:grid-cols-2 gap-2 lg:grid-cols-3 mb-4">
      <Field>
        <Label>Player 1</Label>
        <Select value={player1Id} onValueChange={onPlayer1Change}>
          <SelectTrigger>
            <SelectValue placeholder="Select a player" />
          </SelectTrigger>
          <SelectContent>
            {player1Options.map((player) => (
              <SelectItem key={player.id} value={player.id}>
                {player.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
      <Field>
        <Label>Player 2</Label>
        <Select value={player2Id} onValueChange={onPlayer2Change}>
          <SelectTrigger>
            <SelectValue placeholder="Select a player" />
          </SelectTrigger>
          <SelectContent>
            {player2Options.map((player) => (
              <SelectItem key={player.id} value={player.id}>
                {player.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </Field>
    </div>
  );
};
