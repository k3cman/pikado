import type { CompletedGame } from "@/features/game/store/useGameStore";

export default function StatisticsPage() {
  const raw =
    typeof window !== "undefined"
      ? window.localStorage.getItem("pikado-history")
      : null;
  const history: CompletedGame[] = raw ? JSON.parse(raw) : [];

  const totalGames = history.length;
  const totalPoints = history.reduce(
    (sum, game) =>
      sum + game.history.reduce((inner, entry) => inner + entry.points, 0),
    0
  );

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black text-gray-400 uppercase tracking-widest mb-4">
        Statistics
      </h1>
      {totalGames === 0 ? (
        <p className="text-gray-500">No games played yet.</p>
      ) : (
        <div className="text-gray-300 text-sm space-y-2">
          <p>Total games (local): {totalGames}</p>
          <p>Total points thrown (all games): {totalPoints}</p>
        </div>
      )}
    </div>
  );
}
