import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getTeamFixtureStats,
    getPlayerSeasons,
    getTeamSeasons,
} from "../utils/data-getters.js";
import {
    getTeamStatsRow,
    getTeamPlayerRow,
    getTeamFixtureStatsRows,
} from "../utils/table-rows.js";
import {
    TEAM_STATS,
    PLAYER_STATS,
    TEAM_PLAYER_STATS,
    TEAM_FIXTURE_STATS,
} from "../configs/table-columns.js";
import DataTable from "../components/DataTable";

const TeamSeason = () => {
    const { teamId, season } = useParams();
    const [teamStatsRow, setTeamStatsRow] = useState();
    const [playerRows, setPlayerRows] = useState();
    const [teamFixtureRows, setTeamFixtureRows] = useState();

    useEffect(() => {
        (async () => {
            const teamFixtureStats = await getTeamFixtureStats(teamId, season);

            const teamLeagueSeason = await getTeamSeasons({ teamId, season });

            const playerLeagueSeasons = await getPlayerSeasons({
                teamId,
                season,
            });
            setTeamStatsRow([getTeamStatsRow(teamLeagueSeason)]);
            setPlayerRows(
                playerLeagueSeasons
                    .map((playerObj) => getTeamPlayerRow(playerObj))
                    .sort(
                        (player1, player2) => player2.minutes - player1.minutes
                    )
            );
            setTeamFixtureRows(getTeamFixtureStatsRows(teamFixtureStats));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {teamStatsRow && (
                <DataTable
                    header="Team Stats"
                    columns={TEAM_STATS}
                    rows={teamStatsRow}
                />
            )}
            {playerRows && (
                <DataTable
                    header="Player Stats"
                    columns={[...TEAM_PLAYER_STATS, ...PLAYER_STATS]}
                    rows={playerRows}
                />
            )}
            {teamFixtureRows && (
                <DataTable
                    header="Match Stats"
                    columns={TEAM_FIXTURE_STATS}
                    rows={teamFixtureRows}
                />
            )}
        </>
    );
};

export default TeamSeason;
