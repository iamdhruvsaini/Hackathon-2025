import React from 'react';
import Lottie from 'lottie-react';
import animationData from "../assets/football-opening-animation.json";

const PreLoader = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: 400,
                    display: "flex",
                    alignItems: "center", 
                    justifyContent: "center"
                }}
            >
                <Lottie animationData={animationData} />
            </div>
        </div>
    );
};

export default PreLoader;
