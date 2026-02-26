import React, { useState } from "react";
import { Keypad } from "./Keypad";
import {
  useClearStorage,
  useResetGame,
  useUndo,
} from "../../store/useGameStore";
import useGameStore from "../../store/useGameStore";
import { useNavigate } from "react-router";

interface KeypadProps {
  onPress: (points: number) => void;
  inputFormat: "score" | "single";
}

const BASE_BUTTON_CLASS =
  "min-h-0 rounded-lg font-bold transition-all active:scale-95 active:translate-y-1 touch-manipulation select-none flex items-center justify-center";

const BUTTON_VARIANTS = {
  gray: "bg-gray-600 text-gray-300 border-b-4 border-gray-800",
  green: "bg-green-900 text-white border-b-4 border-green-950",
  red: "bg-red-900 text-white border-b-4 border-red-950",
  display: "bg-indigo-900 text-gray-300 border-b-4 border-indigo-950",
} as const;

export const KeypadX01: React.FC<KeypadProps> = ({ onPress, inputFormat }) => {
  const singleKeypad = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const scoreKeypad = [26, 1, 2, 3, 60, 41, 4, 5, 6, 58, 45, 7, 8, 9, 100];
  const [pointsToSubmit, setPointsToSubmit] = useState<string | null>(null);
  const resetGame = useResetGame();
  const clearStorage = useClearStorage();
  const undo = useUndo();
  const canUndo =
    useGameStore((s) => s.history.length > 0 && s.winnerId === null);
  const navigate = useNavigate();

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
    navigate("/game");
  };

  // Styles for the buttons - using min-h-0 for flex scaling

  return (
    <Keypad>
      <Keypad.Section>
        <div className="grid grid-cols-5 gap-1 flex-shrink-0 h-18">
          <button
            type="button"
            onClick={undo}
            disabled={!canUndo}
            className={`${BASE_BUTTON_CLASS} ${BUTTON_VARIANTS.gray} text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            UNDO
          </button>
          <div
            className={`flex items-center justify-center font-bold text-[2em] rounded-lg col-span-4 ${BUTTON_VARIANTS.display} text-sm sm:text-base`}
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
            className={`${BASE_BUTTON_CLASS} ${BUTTON_VARIANTS.gray} text-sm sm:text-base`}
          >
            CLR
          </button>
          <button
            onClick={() => handleNumClick(0)}
            className={`${BASE_BUTTON_CLASS} ${BUTTON_VARIANTS.gray} text-sm sm:text-base`}
          >
            O
          </button>
          {pointsToSubmit && pointsToSubmit !== "0" ? (
            <button
              onClick={() => {
                onPress(parseInt(pointsToSubmit ?? "0"));
                setPointsToSubmit(null);
              }}
              className={`${BASE_BUTTON_CLASS} ${BUTTON_VARIANTS.green} text-sm sm:text-base`}
            >
              OK
            </button>
          ) : (
            <button
              onClick={() => {
                setPointsToSubmit(null);
                onPress(0);
              }}
              className={`${BASE_BUTTON_CLASS} ${BUTTON_VARIANTS.red} text-sm sm:text-base`}
            >
              NO SCORE
            </button>
          )}
        </div>
      </Keypad.Section>
      <Keypad.Section>
        <div className="grid grid-cols-2 gap-1 flex-shrink-0 h-18 mt-1">
          <button
            onClick={handleReset}
            className={`${BASE_BUTTON_CLASS} ${BUTTON_VARIANTS.gray} text-xs sm:text-sm`}
          >
            Reset Leg
          </button>
          <button
            onClick={handleRestart}
            className={`${BASE_BUTTON_CLASS} ${BUTTON_VARIANTS.red} text-xs sm:text-sm`}
          >
            Restart Game
          </button>
        </div>
      </Keypad.Section>
    </Keypad>
  );
};
