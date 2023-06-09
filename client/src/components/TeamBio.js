import React from "react";
import { logosMap } from "../configs/logosMap.js";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTeamBio } from "../utils/data-getters.js";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { getHyphenatedSeason } from "../utils/utils.js";

export const TeamBio = () => {
    const { teamId } = useParams();
    const { season } = useParams();
    const [bio, setBio] = useState();
    const [logoSrc, setLogoSrc] = useState();
    useEffect(() => {
        (async () => {
            const bio = await getTeamBio(teamId);
            setBio(bio);
            setLogoSrc(logosMap.get(bio.teamId));
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {bio && logoSrc && (
                <Grid
                    container
                    spacing={2}
                    sx={{
                        bgcolor: "#616362",
                        borderRadius: "7px",
                        marginBottom: "2em",
                        paddingBottom: "2em",
                    }}
                >
                    <Grid item xs={12} sm={3}>
                        <img
                            width="90%"
                            src={`/logos/${logoSrc}.svg`}
                            alt={`${logoSrc} team logo`}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <h1>
                            {bio.team.name}
                            {season &&
                                ` | ${getHyphenatedSeason(season)} Season`}
                        </h1>
                        <p>Founded: {bio.team.founded}</p>
                        <p>Stadium: {bio.venue.name}</p>
                        <p>
                            Stadium Capacity:{" "}
                            {bio.venue.capacity.toLocaleString()}
                        </p>
                        <p>City: {bio.venue.city}</p>
                        <p>
                            <Link
                                href={season ? `/league/${season}` : `/league`}
                            >
                                {season
                                    ? `Premier League ${getHyphenatedSeason(
                                          season
                                      )} Page`
                                    : "Premier League Page"}
                            </Link>
                        </p>
                        {season && (
                            <p>
                                <Link
                                    href={`/teams/${teamId}`}
                                >{`${bio.team.name} Overview Page`}</Link>
                            </p>
                        )}
                    </Grid>
                </Grid>
            )}
        </>
    );
};
