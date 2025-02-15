import FootballAd from "@/components/FootballAd";
import React, { useEffect, useState } from "react";
import BasketCard from "./BasketCard";
import { useGetPlayerPositionCountQuery } from "@/redux/features/dashboard/dashboardApi";
import Loading from "@/components/Loading";


const positionDetails = {
  Defenders: {
    description: "Players who specialize in preventing the opposition from scoring.",
    link: "/positions/defenders"
  },
  Forwards: {
    description: "Players responsible for attacking and scoring goals.",
    link: "/positions/forwards"
  },
  Goalkeepers: {
    description: "The last line of defense, responsible for saving shots.",
    link: "/positions/goalkeepers"
  },
  Midfielders: {
    description: "Players who link defense and attack, controlling the game.",
    link: "/positions/midfielders"
  },
  "Substitutes & Reserves": {
    description: "Backup players who can be rotated into matches.",
    link: "/positions/substitutes"
  },
  Wingers: {
    description: "Players who operate on the flanks to provide crosses and speed.",
    link: "/positions/wingers"
  }
};


const BasketMain = () => {

  const [positions, setPositions] = useState([]);

  const { data: players, isLoading } = useGetPlayerPositionCountQuery();
  
  useEffect(() => {
    if (!isLoading && players) {
      const updatedData = players.data.map(player => ({
        ...player,
        description: positionDetails[player.position_bucket]?.description || "No description available.",
        link: positionDetails[player.position_bucket]?.link || "#"
      }));
  
      setPositions(updatedData);
    }
  }, [isLoading, players]);

 
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
        {positions.map((option, index) => (
          <BasketCard option={option} key={index}/>
        ))}
      </div>
      <FootballAd />
    </div>
  );
};

export default BasketMain;
