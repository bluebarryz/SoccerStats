import React from "react";
import Link from "@mui/material/Link";
import { getHyphenatedSeason } from "../utils/utils";

export const PlayerMatchLogLinks = ({ seasons, playerId }) => {
    return (
        <div style={{ marginBottom: "2em" }}>
            <h2>Match Logs</h2>
            {seasons.map((season) => (
                <Link
                    href={`/player-match-logs/${playerId}/${season}`}
                    sx={{ marginRight: "1em" }}
                    key={season}
                >
                    {getHyphenatedSeason(season)}
                </Link>
            ))}
        </div>
    );
};
