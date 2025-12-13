import { useParams } from "react-router";
import { GameForm } from "../components/GameForm";

export default function GameSetupPage() {
    const {mode} = useParams<{mode: '501' | 'cricket' | undefined}>();
    return (
        <div className="h-screen flex flex-col items-center justify-center p-4">
            {mode ? <GameForm mode={mode} /> : <div>Invalid mode</div>}
        </div>
    )
}