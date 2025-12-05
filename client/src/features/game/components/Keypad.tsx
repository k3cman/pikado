import React, { useState } from 'react';

interface KeypadProps {
    onPress: (points: number, multiplier: number) => void;
    onUndo: () => void;
}

export const Keypad: React.FC<KeypadProps> = ({ onPress, onUndo }) => {
    // Local state for the multiplier (Double/Triple)
    const [multiplier, setMultiplier] = useState<1 | 2 | 3>(1);

    const handleNumClick = (points: number) => {
        onPress(points, multiplier);
        setMultiplier(1); // Reset to Single after throw
    };

    const toggleMultiplier = (val: 2 | 3) => {
        setMultiplier(prev => (prev === val ? 1 : val));
    };

    // Styles for the buttons
    const baseBtn = "h-16 rounded-lg font-bold text-xl transition-all active:scale-95 active:translate-y-1 touch-manipulation select-none";
    const numBtn = "bg-gray-700 text-white border-b-4 border-gray-900 hover:bg-gray-600";

    return (
        <div className="flex flex-col gap-2 p-2 bg-black pb-8">

            {/* 1. Multiplier Row */}
            <div className="grid grid-cols-3 gap-2 mb-2">
                <button
                    onClick={() => toggleMultiplier(2)}
                    className={`${baseBtn} ${multiplier === 2 ? 'bg-green-500 text-black border-green-700 translate-y-1 border-b-0' : 'bg-gray-800 text-green-500 border-b-4 border-gray-900'}`}
                >
                    DOUBLE (x2)
                </button>
                <button
                    onClick={() => toggleMultiplier(3)}
                    className={`${baseBtn} ${multiplier === 3 ? 'bg-orange-500 text-black border-orange-700 translate-y-1 border-b-0' : 'bg-gray-800 text-orange-500 border-b-4 border-gray-900'}`}
                >
                    TRIPLE (x3)
                </button>
                <button
                    onClick={onUndo}
                    className={`${baseBtn} bg-red-900/50 text-red-300 border-b-4 border-red-950`}
                >
                    UNDO
                </button>
            </div>

            {/* 2. Number Grid (1-20) */}
            <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((num) => (
                    <button
                        key={num}
                        onClick={() => handleNumClick(num)}
                        className={`${baseBtn} ${numBtn}`}
                    >
                        {num}
                    </button>
                ))}
            </div>

            {/* 3. Bottom Row (Bull & Miss) */}
            <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                    onClick={() => handleNumClick(25)}
                    className={`${baseBtn} bg-red-600 text-white border-b-4 border-red-800`}
                >
                    BULL
                </button>
                <button
                    onClick={() => {
                        setMultiplier(1);
                        handleNumClick(0);
                    }}
                    className={`${baseBtn} bg-gray-600 text-gray-300 border-b-4 border-gray-800`}
                >
                    MISS
                </button>
            </div>
        </div>
    );
};