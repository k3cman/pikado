import React from 'react';

interface KeypadProps {
    onPress?: (points: number) => void;
    onUndo?: () => void;
}

// Status indicator component
const StatusIndicator: React.FC<{ hits: number }> = ({ hits }) => {
    if (hits === 0) {
        return <div className="flex items-center justify-center"></div>;
    }
    if (hits === 1) {
        return (
            <div className="flex items-center justify-center text-white text-xl font-bold">
                /
            </div>
        );
    }
    if (hits === 2) {
        return (
            <div className="flex items-center justify-center text-white text-xl font-bold">
                ×
            </div>
        );
    }
    // hits === 3 (closed)
    return (
        <div className="flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-black border-2 border-white flex items-center justify-center">
                <div className="text-white text-sm font-bold">×</div>
            </div>
        </div>
    );
};

export const KeypadCricket: React.FC<KeypadProps> = ({ onPress }) => {
    // Styles for the buttons - matching KeypadX01, using min-h-0 for flex scaling
    const baseBtn = "min-h-0 rounded-lg font-bold transition-all active:scale-95 active:translate-y-1 touch-manipulation select-none flex items-center justify-center";
    const numBtn = "bg-gray-700 text-white border-b-4 border-gray-900 hover:bg-gray-600";

    const handleButtonClick = (points: number, multiplier: number) => {
        if (onPress) {
            onPress(points * multiplier);
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
        <div className="flex flex-col h-full bg-black p-2 gap-1 overflow-hidden">
            <div className="flex-1 min-h-0 flex flex-col gap-1">
                {cricketNumbers.map((num) => (
                    <div key={num} className="grid grid-cols-5 gap-1 flex-1 min-h-0">
                        {/* Left status column */}
                        <StatusIndicator hits={getLeftHits(num)} />
                        
                        {/* Button columns */}
                        <button
                            onClick={() => handleButtonClick(num, 2)}
                            className={`${baseBtn} ${numBtn} text-sm sm:text-base`}
                        >
                            D{num}
                        </button>
                        <button
                            onClick={() => handleButtonClick(num, 1)}
                            className={`${baseBtn} ${numBtn} text-sm sm:text-base`}
                        >
                            {num}
                        </button>
                        <button
                            onClick={() => handleButtonClick(num, 3)}
                            className={`${baseBtn} ${numBtn} text-sm sm:text-base`}
                        >
                            T{num}
                        </button>
                        
                        {/* Right status column */}
                        <StatusIndicator hits={getRightHits(num)} />
                    </div>
                ))}
                
                {/* Bottom Row - Bull buttons */}
                <div className="grid grid-cols-5 gap-1 flex-1 min-h-0">
                    {/* Left status column */}
                    <StatusIndicator hits={0} />
                    
                    {/* Bull buttons */}
                    <button
                        onClick={() => handleButtonClick(25, 2)}
                        className={`${baseBtn} ${numBtn} text-sm sm:text-base`}
                    >
                        DBull
                    </button>
                    <button
                        onClick={() => handleButtonClick(25, 1)}
                        className={`${baseBtn} ${numBtn} text-sm sm:text-base`}
                    >
                        Bull
                    </button>
                    <div className={`${baseBtn} bg-gray-800 border-b-4 border-gray-900`}></div>
                    
                    {/* Right status column */}
                    <StatusIndicator hits={0} />
                </div>
            </div>

            <div className="flex w-full justify-center gap-2 flex-shrink-0 h-14">
                <button
                    onClick={handleOk}
                    className={`${baseBtn} flex-1 bg-green-500 text-white border-b-4 border-green-700 hover:bg-green-600 text-sm sm:text-base`}
                >
                    Ok
                </button>
                <button
                    className={`${baseBtn} flex-1 bg-red-900/50 text-red-300 border-b-4 border-red-950 text-sm sm:text-base`}
                >
                    Undo
                </button>
            </div>
        </div>
    );
};