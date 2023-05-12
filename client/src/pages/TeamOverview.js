import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamSeasons } from "../utils/data-getters.js";
import { getTeamOverviewRow } from "../utils/table-rows.js";
import { TEAM_STATS, TEAM_OVERVIEW } from "../configs/table-columns.js";
import DataTable from "../components/DataTable";
import { TeamBio } from "../components/TeamBio.js";

const TeamOverview = () => {
    const { teamId } = useParams();
    const [teamStatRows, setTeamStatRows] = useState();

    useEffect(() => {
        (async () => {
            const teamSeasons = await getTeamSeasons({ teamId });
            setTeamStatRows(
                teamSeasons.map((teamObj) => getTeamOverviewRow(teamObj))
            );
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <TeamBio />
            {teamStatRows && (
                <DataTable
                    header="Team Stats"
                    columns={[...TEAM_OVERVIEW, ...TEAM_STATS]}
                    rows={teamStatRows}
                />
            )}
        </>
    );
};

export default TeamOverview;
