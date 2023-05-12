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
        matches: playerStats.games.appearences,
        starts: playerStats.games.lineups,
        minutes: playerStats.games.minutes,
        position: playerStats.games.position,
        rating: playerStats.games.rating
            ? parseFloat(playerStats.games.rating).toFixed(1)
            : "N/A",
        goals: playerStats.goals.total,
        assists: playerStats.goals.assists,
        shots: playerStats.shots.total,
        shotsOnTarget: playerStats.shots.on,
        passes: playerStats.passes.total,
        keyPasses: playerStats.passes.key,
        tackles: playerStats.tackles.total,
        interceptions: playerStats.tackles.interceptions,
        duels: playerStats.duels.total,
        duelsWon: playerStats.duels.won,
        yellowCards: playerStats.cards.yellow,
        redCards: playerStats.cards.red,
        dribbles: playerStats.dribbles.attempts,
        dribbleSuccess: playerStats.dribbles.success,
        penaltiesScored: playerStats.penalty.scored,
        penaltiesMissed: playerStats.penalty.missed,
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
            shots: teamStats[2].value,
            shotsOnTarget: teamStats[0].value,
            shotsInsideBox: teamStats[4].value,
            totalPasses: teamStats[13].value,
            accuratePasses: `${teamStats[14].value} (${teamStats[15].value})`,
            fouls: teamStats[6].value,
            corners: teamStats[7].value,
            offsides: teamStats[8].value,
            yellowCards: teamStats[10].value,
            redCards: teamStats[11].value,
            gkSaves: teamStats[12].value,
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
        goals: player.goals,
        assists: player.assists,
    }));
};

export const getLeagueOverviewRow = (standingsObj) => {
    const { standings } = standingsObj;
    return {
        season: standingsObj.season,
        seasonWithHyphen: `${standingsObj.season}-${(standingsObj.season + 1) %
            100}`,
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
            shots: fixture.shots.total,
            shotsOnTarget: fixture.shots.on,
            goals: fixture.goals.total,
            assists: fixture.goals.assists,
            totalPasses: fixture.passes.total,
            accuratePasses: fixture.passes.accuracy,
            tackles: fixture.tackles.total,
            blocks: fixture.tackles.blocks,
            interceptions: fixture.tackles.interceptions,
            duels: fixture.duels.total,
            duelsWon: fixture.duels.won,
            dribbles: fixture.dribbles.attempts,
            dribbleSuccess: fixture.dribbles.success,
            yellowCards: fixture.cards.yellow,
            redCards: fixture.cards.red,
            penaltiesScored: fixture.penalty.scored,
            penaltiesMissed: fixture.penalty.missed,
        };
    });
};
