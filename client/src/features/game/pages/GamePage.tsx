import { useAppSelector } from '../../../app/hooks';
import { createKeypad } from '../components/keypads/KeypadFactory';
import { ScoreBoard } from '../components/ScoreBoard';
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
            {/* Top: Score Area (Fixed ~200px) */}
            <div className="h-[200px] min-h-[200px] flex-shrink-0 overflow-hidden">
                <ScoreBoard />
            </div>

            {/* Bottom: Keypad (Fills remaining space) */}
            <div className="flex-1 min-h-0 overflow-hidden w-full">
                {createKeypad(config.mode, config.inputFormat ?? 'score')}
            </div>
        </div>
    );
}