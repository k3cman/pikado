import React, { useState } from "react";
import { Keypad } from "./Keypad";
import { useClearStorage, useResetGame } from "../../store/useGameStore";
import { ForwardIcon } from "lucide-react";

interface KeypadProps {
  onPress: (points: number) => void;
  inputFormat: "score" | "single";
}

export const KeypadX01: React.FC<KeypadProps> = ({ onPress, inputFormat }) => {
  const singleKeypad = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const scoreKeypad = [26, 1, 2, 3, 60, 41, 4, 5, 6, 58, 45, 7, 8, 9, 100];
  const [pointsToSubmit, setPointsToSubmit] = useState<string | null>(null);
  const resetGame = useResetGame();
  const clearStorage = useClearStorage();

  const handleNumClick = (points: number) => {
    setPointsToSubmit((prev) =>
      prev ? prev + points.toString() : points.toString()
    );
    // onPress(points);
  };

  const handleReset = () => {
    resetGame();
  };

  const handleRestart = () => {
    clearStorage();
  };

  // Styles for the buttons - using min-h-0 for flex scaling
  const baseBtn =
    "min-h-0 rounded-lg font-bold transition-all active:scale-95 active:translate-y-1 touch-manipulation select-none flex items-center justify-center";

  return (
    <Keypad>
      <Keypad.Section>
        <div className="grid grid-cols-5 gap-1 flex-shrink-0 h-18">
          <button
            className={`${baseBtn} bg-gray-600 text-gray-300 border-b-4 border-gray-800 text-xs sm:text-sm`}
          >
            UNDO
          </button>
          <div
            className={`flex items-center justify-center font-bold text-[2em] rounded-lg col-span-4 bg-indigo-900 text-gray-300 border-b-4 border-indigo-950 text-sm sm:text-base`}
          >
            {pointsToSubmit}
          </div>
        </div>
      </Keypad.Section>
      <Keypad.Grid
        numbers={inputFormat === "single" ? singleKeypad : scoreKeypad}
        onNumberPress={handleNumClick}
      />
      <Keypad.Section>
        <div className="grid grid-cols-3 gap-1 flex-shrink-0 h-18">
          <button
            onClick={() => setPointsToSubmit(null)}
            className={`${baseBtn} bg-gray-600 text-gray-300 border-b-4 border-gray-800 text-sm sm:text-base`}
          >
            CLR
          </button>
          <button
            onClick={() => handleNumClick(0)}
            className={`${baseBtn} bg-gray-600 text-gray-300 border-b-4 border-gray-800 text-sm sm:text-base`}
          >
            O
          </button>
          {pointsToSubmit && pointsToSubmit !== "0" ? (
            <button
              onClick={() => {
                onPress(parseInt(pointsToSubmit ?? "0"));
                setPointsToSubmit(null);
              }}
              className={`${baseBtn} bg-green-900 text-white border-b-4 border-green-950 text-sm sm:text-base`}
            >
              OK
            </button>
          ) : (
            <button
              onClick={() => {
                setPointsToSubmit(null);
                onPress(0);
              }}
              className={`${baseBtn} bg-red-900 text-white border-b-4 border-red-950 text-sm sm:text-base`}
            >
              NO SCORE
            </button>
          )}
        </div>
      </Keypad.Section>
    </Keypad>
  );
};
