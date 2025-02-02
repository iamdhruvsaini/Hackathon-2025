import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PlayerScoreDial = ({ player }) => {
    const data = {
        labels: ["Score"],
        datasets: [
            {
                data: [player?.potential || 0, 100 - (player?.potential || 0)],
                backgroundColor: ["#3DB54B", "#DD360F"],
                borderWidth: 1,
                circumference: 180, // Half-doughnut
                rotation: 270, // Starts at bottom
                cutout: "80%",
            },
        ],
    };

    const options = {
        responsive: true,
        cutout: "70%",
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
    };

    return (
        <div style={{ position: "relative", width: "300px", height: "300px" }}>
            <Doughnut data={data} options={options} />
            <div
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                }}
            >
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333", paddingTop: "80px" }}>
                    {player?.potential}%
                </div>

            </div>
            <h3 style={{
                textAlign: "center",
                marginTop: "-30px"
            }}>Overall Score</h3>
        </div>
    );
};

export default PlayerScoreDial;
