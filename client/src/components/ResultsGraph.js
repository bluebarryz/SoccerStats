import React from "react";
import "./style.css";

const ResultsGraph = ({ games }) => {
    // Calculate the maximum margin of victory/defeat to scale the bars
    const maxMargin = Math.max(
        ...games.map((game) => Math.abs(game.marginOfVictory))
    );

    return (
        <div className="soccer-results-row">
            {/* Horizontal line */}
            <div className="soccer-results-row-line"></div>
            {/* Bars representing each game */}
            {games.map((game, index) => (
                <div
                    key={index}
                    className={`soccer-results-row-bar ${
                        game.isVictory ? "victory" : "defeat"
                    }`}
                    style={{
                        height: `${
                            (Math.abs(game.marginOfVictory) / maxMargin) * 100
                        }%`,
                        bottom: `${
                            game.marginOfVictory > 0
                                ? 0
                                : (Math.abs(game.marginOfVictory) / maxMargin) *
                                  100
                        }%`,
                        top: `${
                            game.marginOfVictory < 0
                                ? 0
                                : (Math.abs(game.marginOfVictory) / maxMargin) *
                                  100
                        }%`,
                    }}
                ></div>
            ))}
        </div>
    );
};

export default ResultsGraph;
