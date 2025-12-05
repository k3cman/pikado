import { Link } from "react-router"
import { Button } from "./components/ui/button"

function App() {
  const menuItems = [
    { label: "Play Game", to: "/game", variant: "primary" as const },
    { label: "Scoreboard", to: "/scoreboard", variant: "default" as const },
    { label: "Statistics", to: "/statistics", variant: "default" as const },
    { label: "Profile", to: "/profile", variant: "default" as const },
  ]

  return (
    <div className="h-screen flex flex-col items-center justify-center p-6">
      {/* App Title */}
      <h1 className="text-5xl font-black text-white uppercase tracking-wider mb-12 drop-shadow-lg">
        Game<span className="text-blue-500">Shot</span>
      </h1>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-4 w-full max-w-xs">
        {menuItems.map((item) => (
          <Link key={item.label} to={item.to}>
            <Button variant={item.variant} size="lg" className="w-full">
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  )
}

export default App
