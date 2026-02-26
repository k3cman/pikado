import { ArrowLeft } from "lucide-react";
import { createKeypad } from "../components/keypads/KeypadFactory";
import { ScoreBoard } from "../components/ScoreBoard";
import {
  useClearStorage,
  useGameConfig,
  useThrowDart,
} from "../store/useGameStore";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function GamePage() {
  const config = useGameConfig();
  const navigate = useNavigate();

  const handleThrow = useThrowDart();
  const clearStorage = useClearStorage();

  if (config.winnerId !== null) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white text-4xl font-bold">
        🎉
        <span>Game Over!</span>
        <Button
          className="mt-4"
          variant="primary"
          onClick={() => navigate("/game")}
        >
          Play Again
        </Button>
        <Button className="mt-4" onClick={() => navigate("/")}>
          Go Home
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      {/* Top: Score Area (Fixed ~200px) */}
      <div className="h-[50px] min-h-[50px] flex-shrink-0 overflow-hidden grid grid-cols-3 pl-4 pr-4">
        <button
          onClick={() => navigate(-1)}
          className="text-white hover:text-gray-300 transition-colors z-50"
          aria-label="Go back"
        >
          <ArrowLeft size={28} />
        </button>
        <div className="flex items-center justify-center font-bold text-2xl">
          501
        </div>
        <div className="flex items-center justify-end font-bold text-2xl">
          <Button
            size="sm"
            onClick={() => {
              clearStorage();
              navigate("/game");
            }}
          >
            End
          </Button>
        </div>
      </div>
      <div className="h-[35%] min-h-[35%] flex-shrink-0 overflow-hidden">
        <ScoreBoard />
      </div>

      {/* Bottom: Keypad (Fills remaining space) */}
      <div className="flex-1 min-h-0 overflow-hidden w-full">
        {createKeypad(config.mode, config.inputFormat ?? "score", handleThrow)}
      </div>
    </div>
  );
}
