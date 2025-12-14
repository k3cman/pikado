import React from 'react';

interface KeypadProps {
    onPress?: (points: number, multiplier: number) => void;
    onUndo?: () => void;
}

// Status indicator component
const StatusIndicator: React.FC<{ hits: number }> = ({ hits }) => {
    if (hits === 0) {
        return <div className="h-16 flex items-center justify-center"></div>;
    }
    if (hits === 1) {
        return (
            <div className="h-16 flex items-center justify-center text-white text-2xl font-bold">
                /
            </div>
        );
    }
    if (hits === 2) {
        return (
            <div className="h-16 flex items-center justify-center text-white text-2xl font-bold">
                ×
            </div>
        );
    }
    // hits === 3 (closed)
    return (
        <div className="h-16 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-black border-2 border-white flex items-center justify-center">
                <div className="text-white text-xl font-bold">×</div>
            </div>
        </div>
    );
};

export const KeypadCricket: React.FC<KeypadProps> = ({ onPress, onUndo }) => {
    // Styles for the buttons - matching KeypadX01
    const baseBtn = "h-16 rounded-lg font-bold text-xl transition-all active:scale-95 active:translate-y-1 touch-manipulation select-none";
    const numBtn = "bg-gray-700 text-white border-b-4 border-gray-900 hover:bg-gray-600";

    const handleButtonClick = (points: number, multiplier: number) => {
        if (onPress) {
            onPress(points, multiplier);
        }
    };

    const handleOk = () => {
        // Ok button handler - placeholder
    };

    // Numbers 20-15 for Cricket
    const cricketNumbers = [20, 19, 18, 17, 16, 15];

    // Placeholder data for status indicators (left and right player hits)
    // In real implementation, this would come from props or state
    const getLeftHits = (num: number): number => {
        // Placeholder: return 0, 1, 2, or 3 based on number
        const mockData: Record<number, number> = { 20: 3, 19: 3, 18: 0, 17: 0, 16: 3, 15: 0 };
        return mockData[num] || 0;
    };

    const getRightHits = (num: number): number => {
        // Placeholder: return 0, 1, 2, or 3 based on number
        const mockData: Record<number, number> = { 20: 0, 19: 0, 18: 3, 17: 0, 16: 0, 15: 2 };
        return mockData[num] || 0;
    };

    return (
        <div className="flex flex-col gap-2 p-2 bg-black pb-8">
            <div className="flex flex-col gap-2">
                {cricketNumbers.map((num) => (
                    <div key={num} className="grid grid-cols-5 gap-2">
                        {/* Left status column */}
                        <StatusIndicator hits={getLeftHits(num)} />
                        
                        {/* Button columns */}
                        <button
                            onClick={() => handleButtonClick(num, 2)}
                            className={`${baseBtn} ${numBtn}`}
                        >
                            D{num}
                        </button>
                        <button
                            onClick={() => handleButtonClick(num, 1)}
                            className={`${baseBtn} ${numBtn}`}
                        >
                            {num}
                        </button>
                        <button
                            onClick={() => handleButtonClick(num, 3)}
                            className={`${baseBtn} ${numBtn}`}
                        >
                            T{num}
                        </button>
                        
                        {/* Right status column */}
                        <StatusIndicator hits={getRightHits(num)} />
                    </div>
                ))}
            </div>

            {/* Bottom Row - Bull buttons */}
            <div className="grid grid-cols-5 gap-2 mt-2">
                {/* Left status column */}
                <StatusIndicator hits={0} />
                
                {/* Bull buttons */}
                <button
                    onClick={() => handleButtonClick(25, 2)}
                    className={`${baseBtn} ${numBtn}`}
                >
                    DBull
                </button>
                <button
                    onClick={() => handleButtonClick(25, 1)}
                    className={`${baseBtn} ${numBtn}`}
                >
                    Bull
                </button>
                <div className={`${baseBtn} bg-gray-800 border-b-4 border-gray-900`}></div>
                
                {/* Right status column */}
                <StatusIndicator hits={0} />
            </div>

            <div className="flex w-full justify-center gap-4">
                <button
                    onClick={handleOk}
                    className={`${baseBtn} w-full bg-green-500 text-white border-b-4 border-green-700 hover:bg-green-600 mb-2`}
                >
                    Ok
                </button>
                <button
                    onClick={handleOk}
                    className={`${baseBtn} w-full bg-green-500 text-white border-b-4 border-green-700 hover:bg-green-600 mb-2`}
                >
                    Undo
                </button>
            </div>
        </div>
    );
};