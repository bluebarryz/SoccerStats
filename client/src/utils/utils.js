export const getHyphenatedSeason = (season) => {
    return `${season}-${(parseInt(season) + 1) % 100}`;
};
