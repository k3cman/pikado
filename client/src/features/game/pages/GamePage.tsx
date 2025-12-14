import { useAppSelector } from '../../../app/hooks';
import { KeypadCricket } from '../components/keypads/KeypadCricket';
import { KeypadX01 } from '../components/keypads/KeypadX01';
import { selectGameConfig } from '../store/gameSlice';


export default function GamePage() {
    const config = useAppSelector(selectGameConfig);
    // const { mode } = useParams<{ mode: string }>(); // e.g. "501"
    // const navigate = useNavigate();

    // 2. USE THE HOOKS
    // const dispatch = useAppDispatch();
    // const { winnerId } = useAppSelector((state) => state.game);

    // Initialize Game Logic
    // useEffect(() => {
    //     // Only 301/501/701 supported for now
    //     if (mode && ['301', '501', '701'].includes(mode)) {
    //         dispatch(startGame({
    //             mode: mode as any,
    //             players: ['Player 1', 'Player 2']
    //         }));
    //     } else {
    //         // If mode is invalid, go back home
    //         navigate('/');
    //     }

    //     // Cleanup when leaving page
    //     return () => { dispatch(resetGame()); }
    // }, [mode, dispatch, navigate]);


    // Handler passed to Keypad
    // const handleShot = (points: number, multiplier: number) => {
    //     dispatch(throwDart({ points, multiplier }));
    // };

    // Handler passed to Keypad
    // const handleUndo = () => {
    //     console.log("Undo logic goes here");
    // };

    // --- RENDER ---

    // 1. WINNER SCREEN
    // if (winnerId) {
    //     return (
    //         <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white animate-in fade-in">
    //             <h1 className="text-8xl font-black text-yellow-500 mb-4 drop-shadow-lg">WINNER!</h1>
    //             <p className="text-4xl mb-8">Game Shot: {winnerId}</p>
    //             <button
    //                 onClick={() => navigate('/')}
    //                 className="px-8 py-4 bg-blue-600 text-xl font-bold rounded-full hover:bg-blue-500 shadow-lg transition-transform active:scale-95"
    //             >
    //                 Back to Menu
    //             </button>
    //         </div>
    //     );
    // }

    // 2. MAIN GAME UI
    return (
        <div className="flex flex-col h-screen bg-black overflow-hidden">
            <KeypadCricket />
            {/* Top: Score Area (Flex grow to take available space) */}
            <div className="flex-grow flex items-center justify-center overflow-y-auto p-2">
                {/* <ScoreBoard /> */}
            </div>

            {/* Bottom: Controls (Fixed at bottom) */}
            <div className="w-full max-w-lg mx-auto bg-gray-900 border-t border-gray-800">
                {/* <Keypad onPress={handleShot} onUndo={handleUndo} /> */}
            </div>
        </div>
    );
}