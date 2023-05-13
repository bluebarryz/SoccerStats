export const getTeamFixtureStats = async (teamId, season) => {
    const res = await fetch(
        `http://localhost:5000/team-fixture-stats?teamId=${teamId}&season=${season}`,
        {
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
        }
    );
    const teamFixtureStats = await res.json();
    return teamFixtureStats;
};

export const getTeamSeasons = async (payload) => {
    const query = new URLSearchParams(payload).toString();
    const res = await fetch(
        `http://localhost:5000/team-league-seasons?${query}`,
        {
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
        }
    );
    const teamLeagueSeasons = await res.json();
    return teamLeagueSeasons;
};

export const getPlayerSeasons = async (payload) => {
    const query = new URLSearchParams(payload).toString();
    const res = await fetch(
        `http://localhost:5000/player-league-seasons?${query}`,
        {
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
        }
    );
    const playerLeagueSeasons = await res.json();
    return playerLeagueSeasons;
};

export const getStandings = async (payload) => {
    const query = new URLSearchParams(payload).toString();
    const res = await fetch(`http://localhost:5000/standings?${query}`, {
        headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
        },
    });
    const standings = await res.json();
    return standings;
};

export const getLeagueSeason = async (season) => {
    const res = await fetch(
        `http://localhost:5000/league-seasons?season=${season}`,
        {
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
        }
    );
    const leagueSeason = await res.json();
    return leagueSeason;
};

export const getAllLeagueSeasons = async () => {
    const res = await fetch(`http://localhost:5000/league-seasons`, {
        headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
        },
    });
    const leagueSeasons = await res.json();
    return leagueSeasons;
};

export const getPlayerFixtureStats = async (playerId, season) => {
    const res = await fetch(
        `http://localhost:5000/player-fixture-stats?teamId=${playerId}&season=${season}`,
        {
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
        }
    );
    const teamFixtureStats = await res.json();
    return teamFixtureStats;
};

export const getTeamBio = async (teamId) => {
    const res = await fetch(
        `http://localhost:5000/team-bios?teamId=${teamId}`,
        {
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
        }
    );
    const bio = await res.json();
    return bio;
};

export const getPlayerBio = async (playerId) => {
    const res = await fetch(
        `http://localhost:5000/player-bios?playerId=${playerId}`,
        {
            headers: {
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            },
        }
    );
    const bio = await res.json();
    return bio;
};
