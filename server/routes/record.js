const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/team-fixture-stats").get((req, res) => {
    let db_connect = dbo.getDb("soccer_stats");

    // Extract the query parameters
    const teamId = parseInt(req.query.teamId);
    const season = parseInt(req.query.season);

    if (teamId && season) {
        db_connect
            .collection("team_fixture_stats")
            .findOne(
                { teamId: teamId, season: season },
                function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            error: "Internal server error",
                        });
                    } else if (!result) {
                        res.status(404).json({ error: "Document not found" });
                    } else {
                        res.json(result);
                    }
                }
            );
    }
});

recordRoutes.route("/player-fixture-stats").get((req, res) => {
    let db_connect = dbo.getDb("soccer_stats");

    // Extract the query parameters
    const playerId = parseInt(req.query.teamId);
    const season = parseInt(req.query.season);

    if (playerId && season) {
        const myQuery = { playerId, season };
        db_connect
            .collection("player_fixture_stats")
            .find(myQuery)
            .toArray(function (err, result) {
                if (err) throw err;
                console.log("Result:", result); // Log the resulting documents
                res.json(result);
            });
    }
});

recordRoutes.route("/team-league-seasons").get((req, res) => {
    let db_connect = dbo.getDb("soccer_stats");

    // Extract the query parameters
    const teamId = parseInt(req.query.teamId);
    const season = parseInt(req.query.season);

    if (teamId && season) {
        db_connect
            .collection("team_league_seasons")
            .findOne(
                { teamId: teamId, season: season },
                function (err, result) {
                    if (err) {
                        console.log(err);
                        res.status(500).json({
                            error: "Internal server error",
                        });
                    } else if (!result) {
                        res.status(404).json({ error: "Document not found" });
                    } else {
                        res.json(result);
                    }
                }
            );
    } else {
        const myQuery = {};
        if (teamId) myQuery.teamId = teamId;
        if (season) myQuery.season = season;

        db_connect
            .collection("team_league_seasons")
            .find(myQuery)
            .toArray(function (err, result) {
                if (err) throw err;
                console.log("Result:", result); // Log the resulting documents
                res.json(result);
            });
    }
});

recordRoutes.route("/player-league-seasons").get((req, res) => {
    let db_connect = dbo.getDb("soccer_stats");

    // Extract the query parameters
    const playerId = parseInt(req.query.playerId);
    const teamId = parseInt(req.query.teamId);
    const season = parseInt(req.query.season);

    // Build the query object
    const myQuery = {};
    if (playerId) myQuery.playerId = playerId;
    if (teamId) myQuery.teamId = teamId;
    if (season) myQuery.season = season;

    db_connect
        .collection("player_league_seasons")
        .find(myQuery)
        .toArray(function (err, result) {
            if (err) throw err;
            console.log("Result:", result); // Log the resulting documents
            res.json(result);
        });
});

recordRoutes.route("/league-seasons").get((req, res) => {
    let db_connect = dbo.getDb("soccer_stats");

    // Extract the query parameters
    const season = parseInt(req.query.season);

    if (season) {
        db_connect
            .collection("league_seasons")
            .findOne({ season: season }, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: "Internal server error",
                    });
                } else if (!result) {
                    res.status(404).json({ error: "Document not found" });
                } else {
                    res.json(result);
                }
            });
    } else {
        db_connect
            .collection("league_seasons")
            .find({})
            .toArray(function (err, result) {
                if (err) throw err;
                console.log("Result:", result); // Log the resulting documents
                res.json(result);
            });
    }
});

recordRoutes.route("/standings").get((req, res) => {
    let db_connect = dbo.getDb("soccer_stats");

    // Extract the query parameters
    const season = parseInt(req.query.season);

    if (season) {
        db_connect
            .collection("standings")
            .findOne({ season: season }, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: "Internal server error",
                    });
                } else if (!result) {
                    res.status(404).json({ error: "Document not found" });
                } else {
                    res.json(result);
                }
            });
    } else {
        db_connect
            .collection("standings")
            .find({})
            .toArray(function (err, result) {
                if (err) throw err;
                console.log("Result:", result); // Log the resulting documents
                res.json(result);
            });
    }
});

recordRoutes.route("/team-bios").get((req, res) => {
    let db_connect = dbo.getDb("soccer_stats");

    // Extract the query parameters
    const teamId = parseInt(req.query.teamId);

    if (teamId) {
        db_connect
            .collection("team_bios")
            .findOne({ teamId: teamId }, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: "Internal server error",
                    });
                } else if (!result) {
                    res.status(404).json({ error: "Document not found" });
                } else {
                    res.json(result);
                }
            });
    }
});

recordRoutes.route("/player-bios").get((req, res) => {
    let db_connect = dbo.getDb("soccer_stats");

    // Extract the query parameters
    const playerId = parseInt(req.query.playerId);

    if (playerId) {
        db_connect
            .collection("player_bios")
            .findOne({ playerId: playerId }, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: "Internal server error",
                    });
                } else if (!result) {
                    res.status(404).json({ error: "Document not found" });
                } else {
                    res.json(result);
                }
            });
    }
});

module.exports = recordRoutes;
