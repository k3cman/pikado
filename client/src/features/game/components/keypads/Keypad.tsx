import React from "react";
import { cn } from "@/lib/utils";

const KeypadSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex-shrink-0", className)}>{children}</div>;
};

const NumberGrid = ({
  numbers,
  onNumberPress,
}: {
  numbers: number[];
  onNumberPress: (number: number) => void;
}) => {
  return (
    <div className="flex-1 min-h-0 grid grid-cols-5 gap-1">
      {numbers.map((number) => (
        <button
          key={number}
          onClick={() => onNumberPress(number)}
          className="min-h-0 rounded-lg font-bold text-xl transition-all active:scale-95 active:translate-y-1 touch-manipulation select-none flex items-center justify-center bg-gray-700 text-white border-b-4 border-gray-900 hover:bg-gray-600 text-sm sm:text-base"
        >
          {number}
        </button>
      ))}
    </div>
  );
};

const KeypadRoot = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}): React.ReactElement => {
  return (
    <div
      className={cn(
        "flex flex-col h-full bg-black p-2 gap-1 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
};

export const Keypad = KeypadRoot as typeof KeypadRoot & {
  Root: typeof KeypadRoot;
  Section: typeof KeypadSection;
  Grid: typeof NumberGrid;
};

Keypad.Root = KeypadRoot;
Keypad.Section = KeypadSection;
Keypad.Grid = NumberGrid;
