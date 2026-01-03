import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function SelectGamePage() {
  const gameModes = [
    {
      label: "501",
      link: "/game/setup/501",
    },
    // {
    //   label: "Cricket",
    //   link: "/game/setup/cricket",
    // },
  ];
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black text-gray-400 uppercase tracking-widest mb-8 text-center">
        Select Game Mode
      </h1>
      <div className="flex flex-col items-center gap-4 w-full max-w-xs">
        {gameModes.map((gameMode) => (
          <Link key={gameMode.label} to={gameMode.link} className="w-full">
            <Button variant="primary" size="lg" className="w-full">
              {gameMode.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
