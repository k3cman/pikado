import App from "@/App";
import GamePage from "@/features/game/pages/GamePage";
import GameSetupPage from "@/features/game/pages/GameSetupPage";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/components/layouts/RootLayout";

const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: App,
            },
            {
                path: '/game',
                Component: GameSetupPage,
            },
            {
                path: '/game/play/:mode',
                Component: GamePage,
            }
        ]
    },

])

export default router;