import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayerBio } from "../utils/data-getters.js";
import Grid from "@mui/material/Grid";
import { getHyphenatedSeason } from "../utils/utils.js";
import { Link } from "@mui/material";

export const PlayerBio = () => {
    const { playerId } = useParams();
    const { season } = useParams();
    const [bio, setBio] = useState();
    useEffect(() => {
        (async () => {
            const bio = await getPlayerBio(playerId);
            setBio(bio);
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            {bio && (
                <Grid
                    container
                    spacing={2}
                    sx={{
                        bgcolor: "#616362",
                        borderRadius: "7px",
                        marginBottom: "2em",
                        padding: "2em",
                        paddingTop: "1em",
                    }}
                >
                    <Grid item>
                        <h1>
                            {bio.name}
                            {season &&
                                ` | Match Logs ${getHyphenatedSeason(season)}`}
                        </h1>
                        <p>
                            Full Name: {bio.firstname} {bio.lastname}
                        </p>
                        <p>
                            Born:{" "}
                            {`${bio.birth.date}, ${bio.birth.place}, ${bio.birth.country}`}
                        </p>
                        <p>Nationality: {bio.nationality}</p>
                        <p>Height: {bio.height}</p>
                        <p>Weight: {bio.weight}</p>
                        {season && (
                            <p>
                                <Link
                                    href={`/players/${playerId}`}
                                >{`Player Overview Page`}</Link>
                            </p>
                        )}
                    </Grid>
                </Grid>
            )}
        </>
    );
};
