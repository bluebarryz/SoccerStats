const { MongoClient } = require("mongodb");
require("dotenv").config();
const axios = require("axios");
const { getStaticContextFromError } = require("@remix-run/router");

const leagues = { EPL_ID: 39, LA_LIGA_ID: 140 };
const HEADERS = {
    "X-RapidAPI-Key": process.env.API_KEY,
    "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
};
const uri = process.env.ATLAS_URI;

async function getResponse(url, params) {
    const options = {
        method: "GET",
        url: url,
        params: params,
        headers: HEADERS,
    };

    const res = await axios.request(options);
    return res.data;
}

const getTeamList = async (season, leagueId) => {
    const teamListRes = await getResponse(
        "https://api-football-v1.p.rapidapi.com/v3/teams",
        { season: season, league: leagueId }
    );
    return teamListRes.response;
};

const getStandings = async (season, leagueId) => {
    const standingsRes = await getResponse(
        "https://api-football-v1.p.rapidapi.com/v3/standings",
        { season: season, league: leagueId }
    );
    const { standings, ...leagueInfo } = standingsRes.response[0].league;
    return {
        season: season,
        leagueId: leagueId,
        league: { ...leagueInfo },
        standings: standings[0],
    };
};

const getTopScorers = async (season, leagueId) => {
    const topScorersRes = await getResponse(
        "https://api-football-v1.p.rapidapi.com/v3/players/topscorers",
        { season: season, league: leagueId }
    );
    return topScorersRes.response.map((playerObj) => ({
        playerId: playerObj.player.id,
        playerName: playerObj.player.name,
        goals: playerObj.statistics[0].goals.total,
        assists: playerObj.statistics[0].goals.assists,
    }));
};

const getTopAssists = async (season, leagueId) => {
    const topScorersRes = await getResponse(
        "https://api-football-v1.p.rapidapi.com/v3/players/topassists",
        { season: season, league: leagueId }
    );
    return topScorersRes.response.map((playerObj) => ({
        playerId: playerObj.player.id,
        playerName: playerObj.player.name,
        goals: playerObj.statistics[0].goals.total,
        assists: playerObj.statistics[0].goals.assists,
    }));
};

const getStandingsMap = (standingsArr) => {
    const standingsMap = new Map();
    standingsArr.forEach((teamStanding) => {
        standingsMap.set(teamStanding.team.id, teamStanding.rank);
    });
    return standingsMap;
};

const getTeamStats = async (season, leagueId, teamId) => {
    const teamStatsRes = await getResponse(
        "https://api-football-v1.p.rapidapi.com/v3/teams/statistics",
        { season: season, league: leagueId, team: teamId }
    );
    const { league, team, ...rest } = teamStatsRes.response;
    return rest;
};

const getSinglePageOfPlayers = async (season, leagueId, teamId, page) => {
    const playersPage = await getResponse(
        "https://api-football-v1.p.rapidapi.com/v3/players",
        {
            season: season,
            league: leagueId,
            team: teamId,
            page: page,
        }
    );
    // return the entire response, which includes both a paging field and a response field with the actual response
    return playersPage;
};
const getPlayersArray = async (season, leagueId, teamId) => {
    const playersArrayFirstPage = await getSinglePageOfPlayers(
        season,
        leagueId,
        teamId,
        1
    );
    let playersArray = [...playersArrayFirstPage.response];

    const numPages = playersArrayFirstPage.paging.total;
    for (let i = 2; i <= numPages; ++i) {
        const playersPage = await getSinglePageOfPlayers(
            season,
            leagueId,
            teamId,
            i
        );
        playersArray = [...playersArray, ...playersPage.response];
    }
    return playersArray;
};

const getAge = (birthDate, season) => {
    const dob = new Date(birthDate);
    const seasonStart = new Date(`08-01-${season}`);
    const monthDiff = seasonStart.getMonth() - dob.getMonth();
    const adjustment =
        monthDiff < 0 ||
        (monthDiff === 0 && seasonStart.getDate() < dob.getDate())
            ? 1
            : 0;
    return seasonStart.getFullYear() - dob.getFullYear() - adjustment;
};

const getPlayerSeasonsArray = async (season, leagueId, teamId) => {
    const playersArray = await getPlayersArray(season, leagueId, teamId);

    return playersArray.map((player) => {
        const { id: playerId, age, ...restOfBasicInfo } = player.player;
        const { team, league, ...restOfStatistics } = player.statistics[0];
        return {
            playerId,
            name: restOfBasicInfo.name,
            teamId: team.id,
            season: league.season,
            leagueId: league.id,
            leagueName: league.name,
            age: getAge(restOfBasicInfo.birth.date, season),
            basicInfo: restOfBasicInfo,
            playerStats: restOfStatistics,
        };
    });
};

const getTeamResult = (fixtureObj, myTeamId) => {
    const isHomeTeam = fixtureObj.teams.home.id === myTeamId;
    const myTeamObj = isHomeTeam
        ? fixtureObj.teams.home
        : fixtureObj.teams.away;
    const oppTeamObj = isHomeTeam
        ? fixtureObj.teams.away
        : fixtureObj.teams.home;

    const myTeamName = myTeamObj.name;
    const oppName = oppTeamObj.name;
    const oppId = oppTeamObj.id;
    const myTeamGoals = isHomeTeam
        ? fixtureObj.score.fulltime.home
        : fixtureObj.score.fulltime.away;
    const oppGoals = isHomeTeam
        ? fixtureObj.score.fulltime.away
        : fixtureObj.score.fulltime.home;
    const margin = myTeamGoals - oppGoals;
    const result = `${myTeamGoals}-${oppGoals}`;
    return {
        myTeamName,
        oppName,
        result,
        margin,
        isHomeTeam,
        oppId,
    };
};

const getTeamFixtureResults = async (season, leagueId, teamId) => {
    const teamFixturesRes = await getResponse(
        "https://api-football-v1.p.rapidapi.com/v3/fixtures",
        { season: season, league: leagueId, team: teamId }
    );
    return teamFixturesRes.response.map((fixtureEntry) => {
        const result = getTeamResult(fixtureEntry, teamId);
        return {
            fixtureId: fixtureEntry.fixture.id,
            ...result,
        };
    });
};

const getFixtureDetails = async (fixtureId) => {
    const fixtureDetailsRes = await getResponse(
        "https://api-football-v1.p.rapidapi.com/v3/fixtures",
        { id: fixtureId }
    );
    const fixtureEntry = fixtureDetailsRes.response[0];
    return {
        fixtureId: fixtureEntry?.fixture?.id,
        season: fixtureEntry.league.season,
        leagueId: fixtureEntry.league.id,
        ...fixtureEntry,
    };
};

async function main() {
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        const season = 2016;
        const leagueId = leagues.LA_LIGA_ID;

        const teamList = await getTeamList(season, leagueId);

        // standings collection
        const standings = await getStandings(season, leagueId);
        const standingsMap = getStandingsMap(standings.standings);
        await createDocument(client, "standings", standings);

        // league_seasons collection
        const topScorers = await getTopScorers(season, leagueId);
        const topAssists = await getTopAssists(season, leagueId);
        const leagueSeason = {
            leagueId: leagueId,
            season: season,
            league: standings.league,
            teamList: teamList.map((team) => team.team.id),
            topScorers: topScorers,
            topAssists: topAssists,
        };
        await createDocument(client, "league_seasons", leagueSeason);

        for (const team of teamList) {
            // team_bios collection
            await insertIfNotExists(
                client,
                "team_bios",
                {
                    teamId: team.team.id,
                    ...team,
                },
                { teamId: team.team.id }
            );

            // player_league_seasons and player_bios collections
            const playerArray = await getPlayerSeasonsArray(
                season,
                leagueId,
                team.team.id
            );
            const { playerSeasons, playerBios } = playerArray.reduce(
                (accumulator, player) => {
                    const { basicInfo, ...playerSeason } = player;
                    return {
                        playerSeasons: [
                            ...accumulator.playerSeasons,
                            playerSeason,
                        ],
                        playerBios: [
                            ...accumulator.playerBios,
                            {
                                playerId: player.playerId,
                                ...player.basicInfo,
                            },
                        ],
                    };
                },
                { playerSeasons: [], playerBios: [] }
            );
            await createMultipleDocuments(
                client,
                "player_league_seasons",
                playerSeasons
            );
            await insertManyIfNotExists(
                client,
                "player_bios",
                playerBios,
                "playerId"
            );

            // team_season_overviews and team_league_seasons collections
            const teamStats = await getTeamStats(
                season,
                leagueId,
                team.team.id
            );

            const playersMap = new Map();
            playerArray.forEach((player) => {
                playersMap.set(player.playerId, { fixtures: [] });
            });
            await createDocument(client, "team_season_overviews", {
                teamId: team.team.id,
                season: season,
                playerList: [...playersMap.keys()],
            });
            await createDocument(client, "team_league_seasons", {
                teamId: team.team.id,
                teamName: team.team.name,
                season: season,
                leagueId: leagueId,
                leagueName: standings.league.name,
                ranking: standingsMap.get(team.team.id),
                teamStats,
            });

            // team_fixture_stats and player_fixture_stats collections
            const teamFixtureResults = await getTeamFixtureResults(
                season,
                leagueId,
                team.team.id
            );
            const teamFixturesStats = [];

            for (const fixture of teamFixtureResults) {
                const { fixtureId } = fixture;
                const fixtureDetails = await getFixtureDetails(fixtureId);
                await insertIfNotExists(
                    client,
                    "match_details",
                    fixtureDetails,
                    { fixtureId: fixtureId }
                );
                const myTeamPlayerStats =
                    fixtureDetails.players[0].team.id == team.team.id
                        ? fixtureDetails.players[0].players
                        : fixtureDetails.players[1].players;

                myTeamPlayerStats
                    .filter(
                        (playerStats) => playerStats.statistics[0].games.minutes
                    )
                    .forEach((playerStats) => {
                        if (playersMap.has(playerStats.player.id)) {
                            const { fixtures: existingFixtures, ...rest } =
                                playersMap.get(playerStats.player.id);
                            playersMap.set(playerStats.player.id, {
                                ...rest,
                                fixtures: [
                                    ...existingFixtures,
                                    {
                                        fixtureId,
                                        teamId: team.team.id,
                                        ...fixture,
                                        ...playerStats.statistics[0],
                                    },
                                ],
                            });
                        }
                    });

                const myTeamStats =
                    fixtureDetails.statistics[0].team.id == team.team.id
                        ? fixtureDetails.statistics[0].statistics
                        : fixtureDetails.statistics[1].statistics;
                teamFixturesStats.push({
                    fixtureId,
                    teamId: team.team.id,
                    ...fixture,
                    teamStats: myTeamStats,
                });
            }

            await createDocument(client, "team_fixture_stats", {
                teamId: team.team.id,
                leagueId: leagueId,
                season: season,
                leagueName: standings.league.name,
                fixtures: teamFixturesStats,
            });

            // Convert player map to an array (pre-processing so we can insert all players at once)
            const playerDocuments = Array.from(playersMap, (entry) => ({
                playerId: entry[0],
                teamId: team.team.id,
                season: season,
                leagueId: leagueId,
                league: standings.league,
                ...entry[1],
            }));

            await createMultipleDocuments(
                client,
                "player_fixture_stats",
                playerDocuments
            );
        }
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

const insertIfNotExists = async (client, collectionName, document, filter) => {
    await client.db("soccer_stats3").collection(collectionName).updateOne(
        filter,
        {
            $setOnInsert: document,
        },
        { upsert: true }
    );
};

const insertManyIfNotExists = async (
    client,
    collectionName,
    documents,
    filterKey
) => {
    const operations = documents.map((document) => {
        const filter = { [filterKey]: document[filterKey] };
        return {
            updateOne: {
                filter: filter,
                update: { $setOnInsert: document },
                upsert: true,
            },
        };
    });

    await client
        .db("soccer_stats3")
        .collection(collectionName)
        .bulkWrite(operations, { ordered: false });
};

const createDocument = async (client, collectionName, newDocument) => {
    await client
        .db("soccer_stats3")
        .collection(collectionName)
        .insertOne(newDocument);
};

/**
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {Object[]} newListings The new listings to be added
 */
async function createMultipleDocuments(client, collectionName, newDocuments) {
    const result = await client
        .db("soccer_stats3")
        .collection(collectionName)
        .insertMany(newDocuments);
}
