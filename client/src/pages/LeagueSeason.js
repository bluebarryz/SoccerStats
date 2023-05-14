import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLeagueSeason, getStandings } from "../utils/data-getters.js";
import { getStandingRows, getTopScorerRows } from "../utils/table-rows.js";
import {
    STANDINGS,
    TOP_ASSISTS,
    TOP_SCORERS,
} from "../configs/table-columns.js";
import DataTable from "../components/DataTable";
import { getHyphenatedSeason } from "../utils/utils.js";

export const LeagueSeason = () => {
    const { season } = useParams();
    const [standingRows, setStandingRows] = useState();
    const [topScorerRows, setTopScorerRows] = useState();
    const [topAssistRows, setTopAssistRows] = useState();

    useEffect(() => {
        (async () => {
            const standings = await getStandings({ season });
            const leagueSeason = await getLeagueSeason(season);
            setStandingRows(getStandingRows(standings));
            setTopScorerRows(getTopScorerRows(leagueSeason.topScorers));
            setTopAssistRows(getTopScorerRows(leagueSeason.topAssists));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <h1 className="pageHeading">
                Premier League {`${getHyphenatedSeason(season)} `}
                Season
            </h1>
            {standingRows && (
                <DataTable
                    header="Standings"
                    columns={STANDINGS}
                    rows={standingRows}
                />
            )}
            {topScorerRows && (
                <DataTable
                    header="Top Scorers"
                    columns={TOP_SCORERS}
                    rows={topScorerRows}
                />
            )}
            {topAssistRows && (
                <DataTable
                    header="Top Assists"
                    columns={TOP_ASSISTS}
                    rows={topAssistRows}
                />
            )}
        </>
    );
};
