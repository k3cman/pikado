import { Link } from "react-router";
import { Button } from "./components/ui/button";
import { useUser } from "./store/useAuthStore";

function App() {
  const user = useUser();

  const menuItems = [
    { label: "Play Game", to: "/game", variant: "primary" as const },
    { label: "Scoreboard", to: "/scoreboard", variant: "default" as const },
    { label: "Statistics", to: "/statistics", variant: "default" as const },
    { label: "Profile", to: "/profile", variant: "default" as const },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6">
      {/* App Title */}
      <h1 className="text-5xl font-black text-white uppercase tracking-wider mb-4 drop-shadow-lg">
        Game<span className="text-blue-500">Shot</span>
      </h1>

      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
        </div>
      ) : (
        <div>
          <p>Please sign in to continue</p>
        </div>
      )}
      {/* Navigation Menu */}
      <nav className="flex flex-col gap-4 w-full max-w-xs mt-8">
        {menuItems.map((item) => (
          <Link key={item.label} to={item.to}>
            <Button variant={item.variant} size="lg" className="w-full">
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default App;
