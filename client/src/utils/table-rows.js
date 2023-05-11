export const getTeamStatsRow = (teamObj) => {
    const { teamStats } = teamObj;
    const wins = teamStats.fixtures.wins.total;
    const draws = teamStats.fixtures.draws.total;
    const losses = teamStats.fixtures.loses.total;
    return {
        matches: teamStats.fixtures.played.total,
        wins: wins,
        draws: draws,
        losses: losses,
        points: wins * 3 + draws,
        finish: teamObj.ranking,
        scored: teamStats.goals.for.total.total,
        conceded: teamStats.goals.against.total.total,
        goalDiff:
            teamStats.goals.for.total.total -
            teamStats.goals.against.total.total,
        cleanSheets: teamStats.clean_sheet.total,
        penaltiesScored: teamStats.penalty.scored.total,
        penaltiesMissed: teamStats.penalty.missed.total,
        topFormation: `${teamStats.lineups[0].formation} (${teamStats.lineups[0].played} times)`,
    };
};

export const getTeamOverviewRow = (teamObj) => {
    const teamStats = getTeamStatsRow(teamObj);
    return {
        season: teamObj.season,
        seasonWithHyphen: `${teamObj.season}-${(teamObj.season + 1) % 100}`,
        teamId: teamObj.teamId,
        ...teamStats,
    };
};

export const getLeagueTeamRow = (teamObj) => {
    const teamStats = getTeamStatsRow(teamObj);
    return {
        season: teamObj.season,
        teamId: teamObj.teamId,
        teamName: teamObj.teamName,
        ...teamStats,
    };
};

export const getTeamPlayerRow = (playerObj) => {
    const stats = getPlayerStatsRow(playerObj);
    return {
        playerName: playerObj.name,
        ...stats,
    };
};

export const getPlayerOverviewRow = (playerObj) => {
    const stats = getPlayerStatsRow(playerObj);
    return {
        season: playerObj.season,
        seasonWithHyphen: `${playerObj.season}-${(playerObj.season + 1) % 100}`,
        teamId: playerObj.teamId,
        ...stats,
    };
};

export const getPlayerStatsRow = (playerObj) => {
    const { playerStats } = playerObj;
    return {
        playerId: playerObj.playerId,
        age: playerObj.age,
        matches: playerStats.games.appearences ?? 0,
        starts: playerStats.games.lineups ?? 0,
        minutes: playerStats.games.minutes ?? 0,
        position: playerStats.games.position,
        rating: playerStats.games.rating
            ? parseFloat(playerStats.games.rating).toFixed(1)
            : "N/A",
        goals: playerStats.goals.total ?? 0,
        assists: playerStats.goals.assists ?? 0,
        shots: playerStats.shots.total ?? 0,
        shotsOnTarget: playerStats.shots.on ?? 0,
        passes: playerStats.passes.total ?? 0,
        keyPasses: playerStats.passes.key ?? 0,
        tackles: playerStats.tackles.total ?? 0,
        interceptions: playerStats.tackles.interceptions ?? 0,
        duels: playerStats.duels.total ?? 0,
        duelsWon: playerStats.duels.won ?? 0,
        yellowCards: playerStats.cards.yellow ?? 0,
        redCards: playerStats.cards.red ?? 0,
        dribbles: playerStats.dribbles.attempts ?? 0,
        dribbleSuccess: playerStats.dribbles.success ?? 0,
        penaltiesScored: playerStats.penalty.scored ?? 0,
        penaltiesMissed: playerStats.penalty.missed ?? 0,
    };
};

const getResultString = (score, margin) => {
    if (margin > 0) return `W ${score}`;
    else if (margin < 0) return `L ${score}`;
    else return `D ${score}`;
};

export const getTeamFixtureStatsRows = (teamFixturesObj) => {
    const { fixtures } = teamFixturesObj;
    return fixtures.map((fixture) => {
        const { teamStats } = fixture;
        return {
            season: teamFixturesObj.season,
            oppName: fixture.oppName,
            oppId: fixture.oppId,
            result: getResultString(fixture.result, fixture.margin),
            venue: fixture.isHomeTeam ? "H" : "A",
            possession: teamStats[9].value,
            shots: teamStats[2].value ?? 0,
            shotsOnTarget: teamStats[0].value ?? 0,
            shotsInsideBox: teamStats[4].value ?? 0,
            totalPasses: teamStats[13].value ?? 0,
            accuratePasses: `${teamStats[14].value} (${teamStats[15].value})`,
            fouls: teamStats[6].value ?? 0,
            corners: teamStats[7].value ?? 0,
            offsides: teamStats[8].value ?? 0,
            yellowCards: teamStats[10].value ?? 0,
            redCards: teamStats[11].value ?? 0,
            gkSaves: teamStats[12].value ?? 0,
        };
    });
};

export const getStandingRows = (standingsObj) => {
    const { standings } = standingsObj;
    return standings.map((team) => ({
        season: standingsObj.season,
        teamId: team.team.id,
        teamName: team.team.name,
        matches: team.all.played,
        finish: team.rank,
        wins: team.all.win,
        draws: team.all.draw,
        losses: team.all.lose,
        scored: team.all.goals.for,
        conceded: team.all.goals.against,
        goalDiff: team.all.goals.for - team.all.goals.against,
        points: team.points,
    }));
};

export const getTopScorerRows = (topScorersArr) => {
    return topScorersArr.map((player, rank) => ({
        playerId: player.playerId,
        playerName: player.playerName,
        rank: rank + 1,
        goals: player.goals ?? 0,
        assists: player.assists ?? 0,
    }));
};

export const getLeagueOverviewRow = (standingsObj) => {
    const { standings } = standingsObj;
    return {
        season: standingsObj.season,
        seasonWithHyphen: `${standingsObj.season}-${
            (standingsObj.season + 1) % 100
        }`,
        topFour: standings.slice(0, 4),
    };
};

export const getPlayerFixtureStatsRows = (playerFixturesObj) => {
    const { fixtures } = playerFixturesObj;
    return fixtures.map((fixture) => {
        return {
            season: playerFixturesObj.season,
            teamName: fixture.myTeamName,
            teamId: fixture.teamId,
            oppName: fixture.oppName,
            oppId: fixture.oppId,
            result: getResultString(fixture.result, fixture.margin),
            venue: fixture.isHomeTeam ? "H" : "A",
            minutes: fixture.games.minutes,
            rating: fixture.games.rating,
            isStarter: fixture.games.substitute ? "No" : "Yes",
            shots: fixture.shots.total ?? 0,
            shotsOnTarget: fixture.shots.on ?? 0,
            goals: fixture.goals.total ?? 0,
            assists: fixture.goals.assists ?? 0,
            totalPasses: fixture.passes.total ?? 0,
            accuratePasses: fixture.passes.accuracy ?? 0,
            tackles: fixture.tackles.total ?? 0,
            blocks: fixture.tackles.blocks ?? 0,
            interceptions: fixture.tackles.interceptions ?? 0,
            duels: fixture.duels.total ?? 0,
            duelsWon: fixture.duels.won ?? 0,
            dribbles: fixture.dribbles.attempts ?? 0,
            dribbleSuccess: fixture.dribbles.success ?? 0,
            yellowCards: fixture.cards.yellow ?? 0,
            redCards: fixture.cards.red ?? 0,
            penaltiesScored: fixture.penalty.scored ?? 0,
            penaltiesMissed: fixture.penalty.missed ?? 0,
        };
    });
};
