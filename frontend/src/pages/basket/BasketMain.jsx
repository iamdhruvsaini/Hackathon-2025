import FootballAd from "@/components/FootballAd";
import React from "react";

const formation = [
  {
    position: "Goalkeeper (GK)",
    description:
      "The last line of defense, responsible for shot-stopping and organizing the backline.",
  },
  {
    position: "Center-backs (CB)",
    description:
      "Strong defensive players who protect the goal by blocking attacks and winning aerial duels.",
  },
  {
    position: "Full-backs (FB)",
    description:
      "Defensive wide players who support both defense and attack",
  },
  {
    position: "Central Midfielders (CM)",
    description:
      "Key playmakers who control the game's tempo, distribute passes, and contribute defensively.",
  },
  {
    position: "Wingers (W)",
    description:
      "Fast, creative players who provide deliver crosses, and cut inside to create goal-scoring chances.",
  },
  {
    position: "Striker (ST)",
    description:
      "The primary goal-scorer for finishing attacks and creating space in the opponent's defense.",
  },
];

const BasketMain = () => {
  return (
    <div className="px-4 mx-auto xl:max-w-[1300px] mt-10">
      <div className="max-w-screen-md mb-8 lg:mb-10">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Select players from these baskets
        </h2>
        <p className="text-gray-500 sm:text-xl dark:text-gray-400">
          At Dominion FC, we focus on leveraging data, machine learning, and
          analytics to optimize team selection, enhance player performance
          insights, and unlock strategic advantages in football management
        </p>
      </div>
      <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
        {formation.map((option, index) => (
          <div className="p-[1px] bg-gradient-to-r from-gray-400 to-gray-700 transition-all duration-500 hover:from-gray-700 hover:to-gray-400 h-fit rounded-xl" key={index}>
            <div className="p-4 rounded-xl bg-white" >
              <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 dark:bg-primary-900">
                <svg
                  className="w-5 h-5 text-primary-600 lg:w-6 lg:h-6 dark:text-primary-300"
                  fill="#6C7A89"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 0l-2 2a1 1 0 101.414 1.414L8 10.414l1.293 1.293a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                {option.position}
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                {option.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <FootballAd />
    </div>
  );
};

export default BasketMain;
