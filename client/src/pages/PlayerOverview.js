import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerSeasons } from "../utils/data-getters.js";
import { getPlayerOverviewRow } from "../utils/table-rows.js";
import { PLAYER_STATS, PLAYER_OVERVIEW } from "../configs/table-columns.js";
import DataTable from "../components/DataTable";
import { PlayerMatchLogLinks } from "../components/PlayerMatchLogLinks.js";
import { PlayerBio } from "../components/PlayerBio.js";

const PlayerOverview = () => {
    const { playerId } = useParams();
    const [playerSeasonRows, setPlayerSeasonRows] = useState();

    useEffect(() => {
        (async () => {
            const playerSeasons = await getPlayerSeasons({ playerId });
            setPlayerSeasonRows(
                playerSeasons.map((playerObj) =>
                    getPlayerOverviewRow(playerObj)
                )
            );
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {playerSeasonRows && (
                <>
                    <PlayerBio />
                    <DataTable
                        header="Player Stats"
                        columns={[...PLAYER_OVERVIEW, ...PLAYER_STATS]}
                        rows={playerSeasonRows}
                    />
                    <PlayerMatchLogLinks
                        seasons={playerSeasonRows.map((row) => row.season)}
                        playerId={playerId}
                    />
                </>
            )}
        </>
    );
};

export default PlayerOverview;
