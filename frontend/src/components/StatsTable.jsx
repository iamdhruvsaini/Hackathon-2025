import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "./Loading";
import playerNan from '@/assets/Images/player.jpg';

const StatsTable = () => {
  const [playerData, setPlayerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableHeader, setTableHeader] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/stats/${id}`);
        const data = await res.json();
        setPlayerData([... data.data]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching player data:", error);
      }
    };

    fetchPlayerData();
  }, []);


  useEffect(() => {
    if (playerData && Object.keys(playerData).length > 0) {
      setTableHeader(Object.keys(playerData[0]));
    }
  }, [playerData]);

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="py-3 sm:py-5">
      
      <div className="px-4 mx-auto max-w-screen-2xl lg:px-12">
        
        <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
          <div className="flex flex-col px-4 py-3 space-y-3 lg:flex-row lg:items-center lg:justify-between lg:space-y-0 lg:space-x-4">
          <p className="text-md font-semibold mx-auto ">{id.split('-').join(" ").toUpperCase()}</p>
            <div className="flex items-center flex-1 space-x-4">
              <h5>
                <span className="text-gray-500">Total Players: </span>
                <span className="dark:text-white">20</span>
              </h5>
              
            </div>
            <div className="flex flex-col flex-shrink-0 space-y-3 md:flex-row md:items-center lg:justify-end md:space-y-0 md:space-x-3">
              <button
                type="button"
                className="flex items-center justify-center flex-shrink-0 px-3 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Export
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr>
                  {tableHeader.slice(1).map((heading, index) => (
                    <th scope="col" className="px-4 py-3" key={index}>
                      {heading.split("_").join(" ")}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* table rows */}
                {playerData.map((player, index) => (
                  <tr
                    className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    key={index}
                  >
                    <th
                      scope="row"
                      className="flex items-center px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        src={player.player_face_url?player.player_face_url:playerNan}
                        alt={player.short_name}
                        className="w-auto h-8 mr-3"
                      />
                      {player.short_name}
                    </th>

                    <td className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="flex items-center">
                        {player.bought === 1 ? (
                          <div className="inline-block w-4 h-4 mr-2 bg-green-700 rounded-full"></div>
                        ) : (
                          <div className="inline-block w-4 h-4 mr-2 bg-red-700 rounded-full"></div>
                        )}
                      </div>
                    </td>

                    {Object.values(player)
                      .slice(3)
                      .map((value,index) => (
                        <td className="px-4 py-2" key={index}>
                          <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                            {value}
                          </span>
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav
            className="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              Showing
              <span className="font-semibold text-gray-900 dark:text-white">
                {" "}
                1-20{" "}
              </span>
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
        <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 sm:grid-cols-3 dark:text-white">
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">4M+</dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">
              datasets
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">1K+</dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">
              contributors
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl md:text-4xl font-extrabold">4M+</dt>
            <dd className="font-light text-gray-500 dark:text-gray-400">
              organizations
            </dd>
          </div>
        </dl>
      </div>
      
    </section>
  );
};

export default StatsTable;
