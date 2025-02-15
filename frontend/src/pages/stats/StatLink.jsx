import FootballAd from "@/components/FootballAd";
import React from "react";
import { Link } from "react-router-dom";
import PositionRanking from "./PositionRanking";
import { PlayerComparison } from "./PlayerComparison";
import LeagueClubRanking from "./LeagueClubRanking";
import FinancialRanking from "./FinancialRanking";
import PotentialRanking from "./PotentialRanking";


const footballStatsCategories = [
    // Overall & Potential-Based Rankings
    "Top-Rated Players",
    "High Potential Players",
    "Biggest Rating Differences",
  
    // Financial-Based Rankings
    "Most Valuable Players",
    "Highest-Paid Players",
    "Best Value for Money",
  
    // Position-Based Best Players
    "Best Forwards",
    "Best Midfielders",
    "Best Defenders",
    "Best Goalkeepers",
  
    // Skill-Based Comparisons
    "Best Dribblers",
    "Best Passers",
    "Fastest Players",
    "Most Physical Players",
    "Best Defenders",
  
    // League & Club-Based Comparisons
    "Best Players in Each League",
    "Best Players in Each Club",
    "Leagues with Highly Rated Players",
    "Clubs with Highest Overall Ratings",
  
    // Miscellaneous Comparisons
    "Players with Highest Skill Moves",
    "Best Players by Attacking Attributes",
    "Best Players by Defensive Attributes",
    "Best All Round Players",
    "Players with Best Fitness Level"
  ];
  

const StatLink = () => {
  return (
    <section className="py-8 p-4">
      <div className="mx-auto max-w-screen-xl 2xl:px-0 flex flex-col gap-8">
        <PositionRanking/>
        <PlayerComparison/>
        <LeagueClubRanking/>
        <FinancialRanking/>
        <PotentialRanking/>
        <FootballAd/>
      </div>
    </section>
  );
};

export default StatLink;
