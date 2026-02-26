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
import { PlayersPage } from "@/features/players/pages/PlayersPage";
import { AddPlayerPage } from "@/features/players/pages/AddPlayerPage";

const router = createBrowserRouter(
  [
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
        path: "/players",
        Component: PlayersPage,
        loader: requireAuth,
      },
      {
        path: "/players/add",
        Component: AddPlayerPage,
        loader: requireAuth,
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
  ],
  { basename: (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "/" }
);

export default router;
