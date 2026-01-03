import { useNavigate, useParams } from "react-router";
import { GameForm } from "../components/GameForm";
import { Separator } from "@/components/ui/separator";
import type { GameFormData } from "../types";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { GamePlayers } from "../components/GamePlayers";
import { useStartGame } from "../store/useGameStore";

export default function GameSetupPage() {
  const { register, control, getValues } = useForm<GameFormData>({
    defaultValues: {
      inputFormat: "score",
      startScore: "501",
      bestOfLegs: 3,
      bestOfSets: 3,
    },
  });
  const navigate = useNavigate();
  const { mode } = useParams<{ mode: "501" | "cricket" | undefined }>();
  const startGame = useStartGame();

  // const handleStartGame = () => {
  //     dispatch(startGame({
  //         mode: mode as '501' | 'cricket',
  //         bestOfLegs: getValues('bestOfLegs') ?? 3,
  //         bestOfSets: getValues('bestOfSets') ?? 3,
  //         startScore: getValues('startScore') ?? '501',
  //         inputFormat: getValues().inputFormat,
  //     }))

  //     navigate(`/game/play/${mode}`);
  // }

  const handleStartGame = () => {
    startGame({
      mode: mode as "501" | "cricket",
      bestOfLegs: getValues("bestOfLegs") ?? 3,
      bestOfSets: getValues("bestOfSets") ?? 3,
      startScore: getValues("startScore") ?? "501",
      inputFormat: getValues().inputFormat,
    });

    navigate(`/game/play/${mode}`);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black text-gray-400 uppercase tracking-widest mb-8">
        Setup <span className="text-blue-500">{mode}</span> Game
      </h1>
      <GamePlayers />
      <Separator className="my-8" />
      {mode ? (
        <GameForm mode={mode} control={control} register={register} />
      ) : (
        <div>Invalid mode</div>
      )}

      <Separator className="my-8" />
      <Button
        variant="primary"
        size="lg"
        className="w-full"
        onClick={handleStartGame}
      >
        Start
      </Button>
    </div>
  );
}
