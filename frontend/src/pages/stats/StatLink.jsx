import FootballAd from "@/components/FootballAd";
import React from "react";


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
    "Best All-Round Players",
    "Players with Best Fitness Level"
  ];
  

const StatLink = () => {
  return (
    <section className="py-8 p-4 ">
      <div className="mx-auto max-w-screen-xl 2xl:px-0">
        <div className="mb-4 flex items-center justify-between gap-4 md:mb-8">
          <h2 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
            Search for stats
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {footballStatsCategories.map((category,index) => (
                 <a key={index}
                 href="#"
                 className="flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
               >
                 <svg
                   className="me-2 h-4 w-4 shrink-0 text-gray-900 dark:text-white"
                   aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg"
                   width="24"
                   height="24"
                   fill="none"
                   viewBox="0 0 24 24"
                 >
                   <path
                     stroke="currentColor"
                     d="M12 15v5m-3 0h6M4 11h16M5 15h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1Z"
                   ></path>
                 </svg>
                 <span className="text-sm font-medium text-gray-900 dark:text-white">
                   {category}
                 </span>
               </a>

            ))}
          
        </div>
        <FootballAd/>
      </div>
    </section>
  );
};

export default StatLink;
