import React from "react";
import { logosMap, namesMap } from "../configs/logosMap.js";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

export const Home = () => {
    return (
        <>
            <h1 className="pageHeading">SoccerStats</h1>
            <p style={{ marginBottom: "5em" }}>
                Explore the English Premier League! Stats courtesy of{" "}
                <Link href="https://www.api-football.com/">API-FOOTBALL</Link>
            </p>

            <h2>Teams</h2>
            <p>
                Every team that has competed in the Premier League since the
                2016-17 season
            </p>
            <Grid
                container
                spacing={2}
                sx={{
                    bgcolor: "#616362",
                    borderRadius: "7px",
                    marginTop: "2em",
                    marginBottom: "2em",
                }}
            >
                {Array.from(logosMap.keys()).map((teamId) => (
                    <Grid
                        item
                        xs={12}
                        sm={3}
                        sx={{ marginBottom: "2em", textAlign: "center" }}
                        key={`${teamId}-grid`}
                    >
                        <Stack>
                            <>
                                <h2>
                                    <Link
                                        key={`${teamId}-link`}
                                        href={`/teams/${teamId}`}
                                    >
                                        {namesMap.get(teamId)}
                                    </Link>
                                </h2>
                            </>
                            <>
                                <img
                                    key={`${logosMap.get(teamId)}-logo`}
                                    style={{ marginRight: "5px" }}
                                    src={`/logos/${logosMap.get(teamId)}.svg`}
                                    alt={`${logosMap.get(teamId)} team logo`}
                                />
                            </>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};
