import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import TeamSeason from "./pages/TeamSeason";
import PlayerOverview from "./pages/PlayerOverview";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TeamOverview from "./pages/TeamOverview";
import { LeagueSeason } from "./pages/LeagueSeason";
import { LeagueOverview } from "./pages/LeagueOverview";
import PlayerMatchLogs from "./pages/PlayerMatchLogs";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/teams/:teamId/:season",
        element: <TeamSeason />,
    },
    {
        path: "/teams/:teamId",
        element: <TeamOverview />,
    },
    {
        path: "/players/:playerId",
        element: <PlayerOverview />,
    },
    {
        path: "/league/:season",
        element: <LeagueSeason />,
    },
    {
        path: "/league",
        element: <LeagueOverview />,
    },
    {
        path: "/player-match-logs/:playerId/:season",
        element: <PlayerMatchLogs />,
    },
]);

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
            <Navbar />
            <main>
                <RouterProvider router={router} />
            </main>
        </ThemeProvider>
    </React.StrictMode>
);
