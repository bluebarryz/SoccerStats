import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerFixtureStats } from "../utils/data-getters.js";
import { getPlayerFixtureStatsRows } from "../utils/table-rows.js";
import { PLAYER_FIXTURE_STATS } from "../configs/table-columns.js";
import DataTable from "../components/DataTable";
import { PlayerBio } from "../components/PlayerBio.js";

const PlayerMatchLogs = () => {
    const { playerId, season } = useParams();
    const [playerFixtureTables, setPlayerFixtureTables] = useState();

    useEffect(() => {
        (async () => {
            const playerFixtureStats = await getPlayerFixtureStats(
                playerId,
                season
            );
            setPlayerFixtureTables(
                playerFixtureStats.map((stats) =>
                    getPlayerFixtureStatsRows(stats)
                )
            );
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        playerFixtureTables && (
            <>
                <PlayerBio />
                {playerFixtureTables.map(
                    (rows) =>
                        rows.length > 0 && (
                            <DataTable
                                key={rows[0].teamName}
                                header={`Match Logs - ${rows[0].teamName}`}
                                columns={PLAYER_FIXTURE_STATS}
                                rows={rows}
                            />
                        )
                )}
            </>
        )
    );
};

export default PlayerMatchLogs;
