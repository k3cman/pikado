import React from "react";
import { usePlayers } from "../store/useGameStore";

export const ScoreBoard: React.FC = () => {
  // READ from Redux
  const { players, currentPlayerId } = usePlayers();

  return (
    <div className="w-full grid grid-cols-2 gap-4 p-4 bg-gray-900 text-white shadow-lg">
      {players.map((player) => {
        const isCurrent = player.id === currentPlayerId;

        return (
          <div
            key={player.id}
            className={`
              relative flex flex-col items-center justify-center p-6 rounded-xl border-4 transition-all duration-300
              ${
                isCurrent
                  ? "border-blue-500 bg-gray-800 scale-105 z-10 shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  : "border-gray-700 bg-gray-800/50 opacity-60"
              }
            `}
          >
            {/* Player Name */}
            <h2 className="text-xl font-bold text-gray-400 uppercase tracking-widest">
              {player.name}
            </h2>

            {/* The Big Score Number */}
            <div
              className={`text-7xl font-black tracking-tighter my-2 ${
                isCurrent ? "text-white" : "text-gray-500"
              }`}
            >
              {player.score}
            </div>

            {/* <div className="flex gap-3 mt-4 h-4">
                            {isCurrent && [1, 2, 3].map((dartNum) => (
                                <div
                                    key={dartNum}
                                    className={`
                    w-4 h-4 rounded-full border-2 border-gray-600
                    ${dartNum <= dartsThrownInTurn ? 'bg-green-500 border-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]' : 'bg-transparent'}
                  `}
                                />
                            ))}
                        </div> */}
          </div>
        );
      })}
    </div>
  );
};
