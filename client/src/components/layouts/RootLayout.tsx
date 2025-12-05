import { Outlet, useNavigate, useLocation } from "react-router"
import { ArrowLeft } from "lucide-react"

export function RootLayout() {
    const navigate = useNavigate()
    const location = useLocation()
    const isHome = location.pathname === "/"
    const isGamePlay = location.pathname.startsWith("/game/play")
    const showBackButton = !isHome && !isGamePlay

    return (
        <main className="min-h-screen bg-black text-white">
            {/* Back Button - hidden on home page and game play */}
            {showBackButton && (
                <button
                    onClick={() => navigate(-1)}
                    className="fixed top-4 left-4 p-2 text-white hover:text-gray-300 transition-colors z-50"
                    aria-label="Go back"
                >
                    <ArrowLeft size={28} />
                </button>
            )}
            <Outlet />
        </main>
    )
}