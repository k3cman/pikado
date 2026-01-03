import { createKeypad } from "../components/keypads/KeypadFactory";
import { ScoreBoard } from "../components/ScoreBoard";
import { useGameConfig, useThrowDart } from "../store/useGameStore";

export default function GamePage() {
  const config = useGameConfig();
  //   const dispatch = useAppDispatch();

  //   const strategy = useMemo(
  //     () => createGameStrategy(config.mode, dispatch),
  //     [config.mode, dispatch]
  //   );

  const handleThrow = useThrowDart();

  return (
    <div className="flex flex-col h-screen bg-black overflow-hidden">
      {/* Top: Score Area (Fixed ~200px) */}
      <div className="h-[200px] min-h-[200px] flex-shrink-0 overflow-hidden">
        <ScoreBoard />
      </div>

      {/* Bottom: Keypad (Fills remaining space) */}
      <div className="flex-1 min-h-0 overflow-hidden w-full">
        {createKeypad(config.mode, config.inputFormat ?? "score", handleThrow)}
      </div>
    </div>
  );
}
