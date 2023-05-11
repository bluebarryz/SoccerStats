import React from "react";
import { useEffect, useState } from "react";
import { getStandings } from "../utils/data-getters.js";
import { getLeagueOverviewRow } from "../utils/table-rows.js";
import { LEAGUE_OVERVIEW } from "../configs/table-columns.js";
import DataTable from "../components/DataTable";

export const LeagueOverview = () => {
    const [leagueOverviewRows, setLeagueOverviewRows] = useState();

    useEffect(() => {
        (async () => {
            const standings = await getStandings({});
            setLeagueOverviewRows(
                standings.map((seasonStandings) =>
                    getLeagueOverviewRow(seasonStandings)
                )
            );
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {console.log(leagueOverviewRows)}
            {leagueOverviewRows && (
                <DataTable
                    header="League Overview"
                    columns={LEAGUE_OVERVIEW}
                    rows={leagueOverviewRows}
                />
            )}
        </>
    );
};
