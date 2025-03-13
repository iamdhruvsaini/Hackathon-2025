import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PlayerSkillBarChart } from "./PlayerSkillBarChart";
import { useGetPlayerDetailsByIDQuery } from "@/redux/features/dashboard/dashboardApi";
import Loading from "@/components/Loading";
import PlayerStatSwiper from "./PlayerStatSwiper";

const PlayerCard = () => {
  const { playerId } = useParams();

  // State for player details
  const [playerDetails, setPlayerDetails] = useState({});

  // State for skills
  const [playerSkills, setPlayerSkills] = useState({});

  // State for physical attributes
  const [playerPhysical, setPlayerPhysical] = useState({});

  const { data: player, isLoading } = useGetPlayerDetailsByIDQuery(playerId);

  useEffect(() => {
    if (player) {
      // Separate player details
      setPlayerDetails({
        player_id: player.player_id,
        short_name: player.short_name || "N/A",
        long_name: player.long_name || "N/A",
        league_name: player.league_name || "N/A",
        club_name: player.club_name || "N/A",
        overall: player.overall || 0,
        potential: player.potential || 0,
        age: player.age || 0,
        nationality_name: player.nationality_name || "N/A",
        player_face_url: player.player_face_url || "",
        club_position: player.club_position || "N/A",
        club_jersey_number: player.club_jersey_number || 0,
        trending: player.trending || "NO",
      });

      // Separate skills
      setPlayerSkills({
        shooting: player.shooting || 0,
        passing: player.passing || 0,
        dribbling: player.dribbling || 0,
        defending: player.defending || 0,
        physic: player.physic || 0, // Fixed key name
        attacking: player.attacking_skills || 0,
        skill: player.skill_attributes || 0,
        movement: player.movement_skills || 0,
        power: player.power_attributes || 0,
        mentals: player.mental_attributes || 0,
        goalkeeping: player.goalkeeping_ability || 0, // Removed duplicate `defending`
      });

      // Separate physical attributes
      setPlayerPhysical({
        height_cm: player.height_cm || 0,
        weight_kg: player.weight_kg || 0,
        bmi: player.bmi || 0,
      });
    }
  }, [player]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className={`xl:w-[1300px] mx-auto px-4 mt-4 space-y-4 bg-gray-100 py-4 rounded-xl`}>
      <div className="sm:flex  justify-between items-stretch sm:gap-2 space-y-2 sm:space-y-0">
        {/* playerDetails */}
        <div className="flex items-center justify-between p-2 rounded-xl border-2 bg-white">
          <img
            src={playerDetails.player_face_url}
            alt=""
            className="h-[120px]"
          />
          <div className="p-2 rounded-xl ">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {playerDetails.short_name}{" "}
              <span className="text-gray-500 text-lg">
                ({playerDetails.club_name})
              </span>
            </h2>
            <div className="grid grid-cols-1 gap-4 text-gray-700">
              <p>
                <span className="font-medium">League:</span>{" "}
                {playerDetails.league_name}
              </p>
              <p>
                <span className="font-medium">Position:</span>{" "}
                {playerDetails.club_position}
              </p>
              <p>
                <span className="font-medium">Age:</span> {playerDetails.age}
              </p>
            </div>
          </div>
        </div>

        {/* swipers */}
        <PlayerStatSwiper
          playerPhysical={playerPhysical}
          playerDetails={playerDetails}
          playerSkills={playerSkills}
        />
      </div>

      {/* Pass skills and physical data to the chart */}
      <PlayerSkillBarChart
        playerSkills={playerSkills}
        playerDetails={playerDetails}
      />
    </section>
  );
};

export default PlayerCard;
