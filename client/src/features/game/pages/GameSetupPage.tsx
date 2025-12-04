import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function GameSetupPage() {
    const gameModes = [
        {
            label: '501',
            link: '/game/play/501'
        },
        {
            label: 'Cricket',
            link: '/game/play/cricket'
        }
    ]
    return (
        <>
            <h1>Select game mode</h1>
            <div className="flex flex-col items-center gap-2">
                {gameModes.map((gameMode) => (
                    <Button key={gameMode.label}>
                        <Link to={gameMode.link}>{gameMode.label}</Link>
                    </Button>
                ))}
            </div>
        </>
    )
}