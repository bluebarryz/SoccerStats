import React from "react";
import { logosMap, namesMap } from "../configs/logosMap.js";
import Link from "@mui/material/Link";
import { getHyphenatedSeason } from "../utils/utils";

const seasons = [2016, 2017, 2018, 2019, 2020, 2021];

export const Navbar = () => {
    return (
        <div class="navbar">
            <a id="homeLink" href="/">
                SoccerStats
            </a>
            <a href="/league">Premier League</a>
            <div class="dropdown" id="seasonsDropdown" href="/">
                Seasons
            </div>
            <div class="dropdown" id="teamsDropdown" href="/teams/33">
                Teams
            </div>
            <div class="dropdown-content" id="seasonsDropdown-content">
                {seasons.map((season) => (
                    <Link
                        href={`/league/${season}`}
                        sx={{ marginRight: "1em" }}
                        key={season}
                    >
                        {getHyphenatedSeason(season)}
                    </Link>
                ))}
            </div>
            <div class="dropdown-content" id="teamsDropdown-content">
                {Array.from(logosMap.keys()).map((teamId) => (
                    <Link key={teamId} href={`/teams/${teamId}`}>
                        <img
                            width="20em"
                            style={{ marginRight: "5px" }}
                            src={`/logos/${logosMap.get(teamId)}.png`}
                        />
                        {namesMap.get(teamId)}
                    </Link>
                ))}
            </div>
        </div>
    );
};
