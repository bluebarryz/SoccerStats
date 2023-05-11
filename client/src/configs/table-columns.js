import Link from "@mui/material/Link";
import React from "react";

export const PLAYER_STATS = [
    { headerName: "Age", field: "age" },
    { headerName: "MP", field: "matches" },
    { headerName: "Starts", field: "starts" },
    { headerName: "Mins", field: "minutes" },
    { headerName: "Pos", field: "position" },
    { headerName: "Rating", field: "rating" },
    { headerName: "G", field: "goals" },
    { headerName: "A", field: "assists" },
    { headerName: "Shots", field: "shots" },
    { headerName: "On Target", field: "shotsOnTarget" },
    { headerName: "Passes", field: "passes" },
    { headerName: "Key Passes", field: "keyPasses" },
    { headerName: "Tackles", field: "tackles" },
    { headerName: "Interceptions", field: "interceptions" },
    { headerName: "Duels", field: "duels" },
    { headerName: "Duels Won", field: "duelsWon" },
    { headerName: "Yellow Cards", field: "yellowCards" },
    { headerName: "Red Cards", field: "redCards" },
    { headerName: "Dribbles", field: "dribbles" },
    { headerName: "Dribbles Success", field: "dribbleSuccess" },
    { headerName: "Pens Scored", field: "penaltiesScored" },
    { headerName: "Pens Missed", field: "penaltiesMissed" },
];
export const TEAM_PLAYER_STATS = [
    {
        headerName: "Player",
        field: "playerName",
        renderCell: (row) => (
            <Link href={`/players/${row.playerId}`}>{row.playerName}</Link>
        ),
    },
];

export const PLAYER_OVERVIEW = [
    {
        headerName: "Season",
        field: "seasonWithHyphen",
        renderCell: (row) => (
            <Link href={`/teams/${row.teamId}/${row.season}`}>
                {row.seasonWithHyphen}
            </Link>
        ),
    },
];

export const TEAM_OVERVIEW = [
    {
        headerName: "Season",
        field: "seasonWithHyphen",
        renderCell: (row) => (
            <Link href={`/teams/${row.teamId}/${row.season}`}>
                {row.seasonWithHyphen}
            </Link>
        ),
    },
];

export const TEAM_STATS = [
    { headerName: "MP", field: "matches" },
    { headerName: "W", field: "wins" },
    { headerName: "D", field: "draws" },
    { headerName: "L", field: "losses" },
    { headerName: "Points", field: "points" },
    { headerName: "Rank", field: "finish" },
    { headerName: "GF", field: "scored" },
    { headerName: "GA", field: "conceded" },
    { headerName: "GD", field: "goalDiff" },
    { headerName: "Clean Sheets", field: "cleanSheets" },
    { headerName: "Pens Scored", field: "penaltiesScored" },
    { headerName: "Pens Missed", field: "penaltiesMissed" },
    { headerName: "Top Formation", field: "topFormation" },
];

export const TEAM_FIXTURE_STATS = [
    {
        headerName: "Opponent",
        field: "oppName",
        renderCell: (row) => (
            <Link href={`/teams/${row.oppId}/${row.season}`}>
                {row.oppName}
            </Link>
        ),
    },
    { headerName: "Result", field: "result" },
    { headerName: "Venue", field: "venue" },
    { headerName: "Possession", field: "possession" },
    { headerName: "Shots", field: "shots" },
    { headerName: "SOT", field: "shotsOnTarget" },
    { headerName: "Shots inside box", field: "shotsInsideBox" },
    { headerName: "Total Passes", field: "totalPasses" },
    { headerName: "Passes Accuracy", field: "accuratePasses" },
    { headerName: "Fouls", field: "fouls" },
    { headerName: "Corners", field: "corners" },
    { headerName: "Offsides", field: "offsides" },
    { headerName: "Yellow Cards", field: "yellowCards" },
    { headerName: "Red Cards", field: "redCards" },
    { headerName: "GK Saves", field: "gkSaves" },
];

export const PLAYER_FIXTURE_STATS = [
    {
        headerName: "Team",
        field: "teamName",
        renderCell: (row) => (
            <Link href={`/teams/${row.teamId}/${row.season}`}>
                {row.teamName}
            </Link>
        ),
    },
    {
        headerName: "Opp",
        field: "oppName",
        renderCell: (row) => (
            <Link href={`/teams/${row.oppId}/${row.oppId}`}>{row.oppName}</Link>
        ),
    },
    { headerName: "Result", field: "result" },
    { headerName: "Venue", field: "venue" },
    { headerName: "Mins", field: "minutes" },
    { headerName: "Starter", field: "isStarter" },
    { headerName: "Shots", field: "shots" },
    { headerName: "SOT", field: "shotsOnTarget" },
    { headerName: "G", field: "goals" },
    { headerName: "A", field: "assists" },
    { headerName: "Tot Passes", field: "totalPasses" },
    { headerName: "Acc Passes", field: "accuratePasses" },
    { headerName: "Tackles", field: "tackles" },
    { headerName: "Blocks", field: "blocks" },
    { headerName: "Interceptios", field: "interceptions" },
    { headerName: "Duels", field: "duels" },
    { headerName: "Duels Won", field: "duelsWon" },
    { headerName: "Yellow Cards", field: "yellowCards" },
    { headerName: "Red Cards", field: "redCards" },
    { headerName: "Dribbles", field: "dribbles" },
    { headerName: "Dribbles Success", field: "dribbleSuccess" },
    { headerName: "Pens Scored", field: "penaltiesScored" },
    { headerName: "Pens Missed", field: "penaltiesMissed" },
];

export const STANDINGS = [
    { headerName: "Rank", field: "finish" },
    {
        headerName: "Team",
        field: "teamName",
        renderCell: (row) => (
            <Link href={`/teams/${row.teamId}/${row.season}`}>
                {row.teamName}
            </Link>
        ),
    },
    { headerName: "MP", field: "matches" },
    { headerName: "W", field: "wins" },
    { headerName: "D", field: "draws" },
    { headerName: "L", field: "losses" },
    { headerName: "GF", field: "scored" },
    { headerName: "GA", field: "conceded" },
    { headerName: "GD", field: "goalDiff" },
    { headerName: "Points", field: "points" },
];

export const TOP_SCORERS = [
    { headerName: "Rank", field: "rank" },
    {
        headerName: "Player",
        field: "playerName",
        renderCell: (row) => (
            <Link href={`/players/${row.playerId}`}>{row.playerName}</Link>
        ),
    },
    { headerName: "Goals", field: "goals" },
    { headerName: "Assists", field: "assists" },
];

export const TOP_ASSISTS = [
    { headerName: "Rank", field: "rank" },
    {
        headerName: "Player",
        field: "playerName",
        renderCell: (row) => (
            <Link href={`/players/${row.playerId}`}>{row.playerName}</Link>
        ),
    },
    { headerName: "Assists", field: "assists" },
    { headerName: "Goals", field: "goals" },
];

export const LEAGUE_OVERVIEW = [
    {
        headerName: "Season",
        field: "seasonWithHyphen",
        renderCell: (row) => (
            <Link href={`/league/${row.season}`}>{row.seasonWithHyphen}</Link>
        ),
    },
    {
        headerName: "Top Four",
        field: "topFour",
        renderCell: (row) => (
            <div>
                1.{" "}
                <Link href={`/teams/${row.topFour[0].team.id}/${row.season}`}>
                    {row.topFour[0].team.name}
                </Link>{" "}
                2.{" "}
                <Link href={`/teams/${row.topFour[1].team.id}/${row.season}`}>
                    {row.topFour[1].team.name}
                </Link>{" "}
                3.{" "}
                <Link href={`/teams/${row.topFour[2].team.id}/${row.season}`}>
                    {row.topFour[2].team.name}
                </Link>{" "}
                4.{" "}
                <Link href={`/teams/${row.topFour[3].team.id}/${row.season}`}>
                    {row.topFour[3].team.name}
                </Link>{" "}
            </div>
        ),
    },
];
