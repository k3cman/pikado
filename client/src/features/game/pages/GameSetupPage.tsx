// src/features/game/pages/GameSetupPage.tsx
import { useNavigate, useParams } from "react-router";
import { GameForm } from "../components/GameForm";
import { Separator } from "@/components/ui/separator";
import type { GameFormData } from "../types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { GamePlayers } from "../components/GamePlayers";
import { useStartGame, type Player as GamePlayer } from "../store/useGameStore";
import {
  useFetchPlayers,
  usePlayers,
} from "@/features/players/pages/store/usePlayersStore";
import { useEffect, useState } from "react";

export default function GameSetupPage() {
  const {
    register,
    control,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<GameFormData>({
    defaultValues: {
      inputFormat: "score",
      startScore: "501",
      bestOfLegs: 3,
      bestOfSets: 3,
    },
  });

  const navigate = useNavigate();
  const fetchPlayers = useFetchPlayers();
  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);
  const { mode } = useParams<{ mode: "501" | "cricket" | undefined }>();
  const startGame = useStartGame();

  const players = usePlayers();
  const [player1Id, setPlayer1Id] = useState<string>("");
  const [player2Id, setPlayer2Id] = useState<string>("");

  const handleStartGame = () => {
    const startScoreValue =
      getValues("startScore") === "301"
        ? 301
        : getValues("startScore") === "501"
        ? 501
        : getValues("startScore") === "701"
        ? 701
        : 501;

    // Get selected players and transform to game players
    const selectedStorePlayers = players.filter(
      (p) => p.id === player1Id || p.id === player2Id
    );

    let gamePlayers: GamePlayer[];

    if (selectedStorePlayers.length === 0) {
      // No players selected: use default Player 1 and Player 2
      gamePlayers = [
        {
          id: "default-1",
          name: "Player 1",
          score: startScoreValue,
          scoreAtStartOfTurn: startScoreValue,
        },
        {
          id: "default-2",
          name: "Player 2",
          score: startScoreValue,
          scoreAtStartOfTurn: startScoreValue,
        },
      ];
    } else if (selectedStorePlayers.length === 1) {
      // One real player selected: pair with a default opponent
      const realPlayer = selectedStorePlayers[0];
      gamePlayers = [
        {
          id: realPlayer.id,
          name: realPlayer.name,
          score: startScoreValue,
          scoreAtStartOfTurn: startScoreValue,
        },
        {
          id: "default-2",
          name: "Player 2",
          score: startScoreValue,
          scoreAtStartOfTurn: startScoreValue,
        },
      ];
    } else {
      // Two real players selected
      gamePlayers = selectedStorePlayers.map((player) => ({
        id: player.id,
        name: player.name,
        score: startScoreValue,
        scoreAtStartOfTurn: startScoreValue,
      }));
    }

    startGame({
      mode: mode as "501" | "cricket",
      bestOfLegs: getValues("bestOfLegs") ?? 3,
      bestOfSets: getValues("bestOfSets") ?? 3,
      startScore: getValues("startScore") ?? "501",
      inputFormat: getValues().inputFormat,
      players: gamePlayers,
    });

    navigate(`/game/play/${mode}`);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black text-gray-400 uppercase tracking-widest mb-8">
        Setup <span className="text-blue-500">{mode}</span> Game
      </h1>
      <GamePlayers
        players={players}
        player1Id={player1Id}
        player2Id={player2Id}
        onPlayer1Change={setPlayer1Id}
        onPlayer2Change={setPlayer2Id}
      />
      <div className="w-full max-w-lg text-xs text-gray-400 mb-2">
        {!player1Id && !player2Id && (
          <span>
            No players selected – default Player 1 and Player 2 will be used.
          </span>
        )}
        {(!!player1Id !== !!player2Id) && (
          <span>
            {" "}
            Only one player selected – a default opponent will be created.
          </span>
        )}
      </div>
      {mode ? (
        <GameForm
          mode={mode}
          control={control}
          register={register}
          errors={errors}
        />
      ) : (
        <div>Invalid mode</div>
      )}

      <Separator className="my-8" />
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleSubmit(() => handleStartGame())}
      >
        Start
      </Button>
    </div>
  );
}
