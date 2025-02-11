import React, { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const SelectedPlayer = () => {
  const [players, setplayers] = useState([]);
  const rowsPerPage = 4;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/data.json");
      const text = await response.json();
      setplayers(text);
    };
    fetchData();
  }, []);
  return (
    <div className="space-y-6">
      {players.slice(startIndex, endIndex).map((player, index) => (
        <div
          className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
          key={index}
        >
          <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
            <a href="#" className="shrink-0 md:order-1">
              <img
                className="h-30 w-30 dark:hidden"
                src={player.player_face_url}
                alt="imac image"
              />
            </a>

            <div className="flex items-center justify-between md:order-3 md:justify-end">
              <div className="text-end md:order-4 md:w-32">
                <p className="text-base font-bold text-gray-700 dark:text-white">
                  {player.wage_eur} Euro
                </p>
              </div>
            </div>

            <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
              <p className="text-lg font-bold text-gray-700 dark:text-white">
                {player.short_name}
              </p>
              <p className="text-base font-normal text-gray-900 hover:underline">
                Position: {player.club_position}, Skill Moves:{" "}
                {player.skill_moves}, Pace: {player.pace}, Shooting:{" "}
                {player.shooting}, Passing: {player.passing}, Dribbling:{" "}
                {player.dribbling}
              </p>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
                >
                  Add to Favorites
                </button>

                <button
                  type="button"
                  className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              className="text-md"
              onClick={() => {
                setStartIndex(startIndex - rowsPerPage);
                setEndIndex(endIndex - rowsPerPage);
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href="#"
              className="text-md"
              onClick={() => {
                setStartIndex(startIndex + rowsPerPage);
                setEndIndex(endIndex + rowsPerPage);
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default SelectedPlayer;
