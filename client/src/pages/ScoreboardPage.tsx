import type { CompletedGame } from "@/features/game/store/useGameStore";

export default function ScoreboardPage() {
  const raw =
    typeof window !== "undefined"
      ? window.localStorage.getItem("pikado-history")
      : null;
  const history: CompletedGame[] = raw ? JSON.parse(raw) : [];

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black text-gray-400 uppercase tracking-widest mb-4">
        Scoreboard
      </h1>
      {history.length === 0 ? (
        <p className="text-gray-500">No completed games yet.</p>
      ) : (
        <div className="w-full max-w-xl space-y-2 text-sm text-gray-300">
          <p className="text-gray-400 mb-2">
            Showing {history.length} completed game
            {history.length === 1 ? "" : "s"} stored locally.
          </p>
          <ul className="space-y-1">
            {history
              .slice()
              .reverse()
              .map((game) => {
                const winner = game.players.find(
                  (p) => p.id === game.winnerId
                );
                return (
                  <li
                    key={game.id}
                    className="flex items-center justify-between rounded-md bg-gray-900 px-3 py-2"
                  >
                    <span className="font-semibold">
                      {game.mode} – {winner?.name ?? "Unknown winner"}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(game.finishedAt).toLocaleString()}
                    </span>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
}
