import App from "@/App";
import GamePage from "@/features/game/pages/GamePage";
import ScoreboardPage from "@/pages/ScoreboardPage";
import StatisticsPage from "@/pages/StatisticsPage";
import ProfilePage from "@/pages/ProfilePage";
import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/components/layouts/RootLayout";
import SelectGamePage from "@/features/game/pages/SelectGamePage";
import GameSetupPage from "@/features/game/pages/GameSetupPage";
import LoginPage from "@/pages/Login";
import { requireAuth } from "./guards";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/game",
        Component: SelectGamePage,
      },
      {
        path: "/game/setup/:mode",
        Component: GameSetupPage,
      },
      {
        path: "/game/play/:mode",
        Component: GamePage,
      },
      {
        path: "/scoreboard",
        Component: ScoreboardPage,
        loader: requireAuth,
      },
      {
        path: "/statistics",
        Component: StatisticsPage,
        loader: requireAuth,
      },
      {
        path: "/profile",
        Component: ProfilePage,
        loader: requireAuth,
      },
    ],
  },
]);

export default router;
