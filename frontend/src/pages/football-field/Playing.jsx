import React, { useEffect, useState } from "react";
import field from "@/assets/Images/field.png";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@/context/AuthContext";
import { fetchUserSelectedPlayer } from "@/redux/cart/cartSlice";
import Swal from "sweetalert2";


  // 'LW', 'ST', 'RW', // Forwards
  // 'CDM', 'CAM', 'CM', // Midfielders
  // 'RB', 'CB', 'LB', // Defenders
  // 'GK' // Goalkeeper


  const positionMap = {
  forwards: ["LW", "ST", "RW"],
  midfielders: ["CDM", "CAM", "CM"],
  defenders: ["RB", "CB", "LB"],
  goalkeepers: ["GK"],
};

const Playing = () => {
  const { currentUser } = useAuth();
  const players = useSelector((state) => state.cart.cartItems);

  const [cartSummary, setCartSummary] = useState({
    totalPlayer: 0,
    totalPrice: 0,
    positionCounts: {},
    playersByPosition: {
      defenders: [],
      midfielders: [],
      forwards: [],
      goalkeepers: [],
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.uid) {
      dispatch(fetchUserSelectedPlayer(currentUser.uid));
    }
  }, [dispatch, currentUser?.uid]);

  useEffect(() => {
    if (players?.length > 0) {
      // Calculate total price
      const totalPrice = players.reduce(
        (sum, player) => sum + Number(player.wage_eur || 0),
        0
      );

      // Initialize positionCounts and playersByPosition
      const positionCounts = {};
      const playersByPosition = {
        defenders: [],
        midfielders: [],
        forwards: [],
        goalkeepers: [],
      };

      players.forEach((player) => {
        const position = player.club_position;

        for (const category in positionMap) {
          if (positionMap[category].includes(position)) {
            // Count player in the position category
            positionCounts[category] = (positionCounts[category] || 0) + 1;

            // Add player to the corresponding position category
            playersByPosition[category].push(player);
          }
        }
      });

      setCartSummary({
        totalPlayer: players.length,
        totalPrice,
        positionCounts,
        playersByPosition,
      });
    }
  }, [players]);

  const handlePlayerClick = (playerData) => {
    Swal.fire({
      title: "",
      html: `
        <div class="w-full max-w-lg mx-auto bg-white shadow-lg rounded-xl overflow-hidden relative">
          <!-- Close button properly positioned inside -->
          <button class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none z-10" onclick="Swal.close()">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          
          <!-- Header: Player info with gradient background - reduced padding -->
          <div class="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4">
            <div class="flex items-center">
              <!-- Player image - reduced size -->
              <div class="mr-4 rounded-lg overflow-hidden" style="height: 80px; width: 80px;">
                <img src="${playerData.player_face_url}" alt="${playerData.short_name}" class="h-full w-full object-cover" />
              </div>
              
              <!-- Player info with clean typography -->
              <div class="flex-1 overflow-hidden">
                <h2 class="text-lg font-bold text-gray-800 tracking-tight">${playerData.short_name}</h2>
                <div class="flex items-center mt-1">
                  <span class="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full font-medium">LS</span>
                  <span class="text-gray-500 text-sm ml-2 font-medium">${playerData.age} yrs</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Compact layout with reduced padding -->
          <div class="p-4 flex flex-col gap-3">
            <!-- Club -->
            <div class="flex justify-center items-center bg-gray-50 rounded-xl p-3">
              <span class="flex-shrink-0 w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center mr-2">
                <svg class="w-3 h-3 text-gray-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                </svg>
              </span>
              <span class="font-medium text-gray-800">${playerData.club_name}</span>
            </div>
            
            <!-- Status -->
            <div class="flex justify-center items-center bg-gray-50 rounded-xl p-3">
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                playerData.bought ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
              }">
                ${playerData.bought ? "Signed" : "Available"}
              </span>
            </div>
            
            <!-- Stats section (Overall & Potential) - horizontal layout -->
            <div class="flex gap-3">
              <!-- Overall Rating -->
              <div class="bg-blue-50 rounded-xl p-3 flex items-center flex-1">
                <div class="rounded-full bg-blue-100 p-1 mr-2 flex-shrink-0">
                  <svg class="w-3 h-3 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500">Overall</p>
                  <p class="text-lg font-bold text-blue-700">${playerData.overall}</p>
                </div>
              </div>
              
              <!-- Potential -->
              <div class="bg-green-50 rounded-xl p-3 flex items-center flex-1">
                <div class="rounded-full bg-green-100 p-1 mr-2 flex-shrink-0">
                  <svg class="w-3 h-3 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 20H11V8L5.5 13.5L4.08 12.08L12 4.16L19.92 12.08L18.5 13.5L13 8V20Z" fill="currentColor"/>
                  </svg>
                </div>
                <div>
                  <p class="text-xs font-medium text-gray-500">Potential</p>
                  <p class="text-lg font-bold text-green-700">${playerData.potential}</p>
                </div>
              </div>
            </div>
            
            <!-- Wage section - reduced padding -->
            <div class="bg-gray-50 rounded-xl p-3 flex items-center justify-center">
              <div class="rounded-full bg-red-100 p-1 mr-2 flex-shrink-0">
                <svg class="w-3 h-3 text-red-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.63 10.76 8.04 12.07 8.04C13.45 8.04 13.97 8.7 14.01 9.68H15.72C15.67 8.34 14.85 7.11 13.23 6.71V5H10.9V6.69C9.39 7.01 8.18 7.99 8.18 9.5C8.18 11.29 9.67 12.19 11.84 12.71C13.79 13.17 14.18 13.86 14.18 14.58C14.18 15.11 13.79 15.97 12.08 15.97C10.48 15.97 9.85 15.25 9.76 14.33H8.04C8.14 15.93 9.4 16.94 10.9 17.25V19H13.24V17.26C14.76 16.98 15.98 16.08 15.98 14.57C15.98 12.36 14.07 11.6 12.31 11.14Z" fill="currentColor"/>
                </svg>
              </div>
              <div>
                <p class="text-xs font-medium text-gray-500">Weekly Wage</p>
                <p class="text-lg font-bold text-red-700">€${playerData.wage_eur}</p>
              </div>
            </div>
          </div>
        </div>
      `,
      background: "transparent",
      showConfirmButton: false,
      showCloseButton: false,
      customClass: {
        container: "swal-player-container",
        popup: "swal-player-popup",
      },
      width: "auto",
      padding: 0,
      allowOutsideClick: true,
    });
  
    // Add event listener to ensure close button works
    document.querySelector('.swal-player-popup button').addEventListener('click', () => {
      Swal.close();
    });
  
    // Add custom styles for Sweet Alert
    const style = document.createElement("style");
    style.innerHTML = `
      .swal-player-popup {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
        border-radius: 16px !important;
        overflow: hidden !important;
        padding: 0 !important;
        box-shadow: rgba(17, 12, 46, 0.1) 0px 48px 100px 0px !important;
        max-width: 400px !important;
        width: 95% !important;
        margin: 0 auto !important;
      }
      
      /* Make sure text doesn't overflow */
      .truncate {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      @media (max-width: 640px) {
        .swal-player-popup {
          max-width: 95% !important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  return (
    <section className="w-full max-w-7xl mx-auto p-4">
      {/* Desktop/Tablet View */}
      <div className="hidden sm:block relative w-full aspect-[16/10] max-w-6xl mx-auto rounded-xl shadow-lg overflow-hidden border border-green-800">
        {/* Background field image */}
        <div
          
          className="absolute inset-0 w-full h-full object-cover bg-gray-500"
        />

        {/* Field overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 to-transparent"></div>

        {/* Field markings SVG overlay */}
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1000 600"
          preserveAspectRatio="xMidYMid slice"
        >
          <rect
            x="40"
            y="40"
            width="920"
            height="520"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
            rx="8"
          />
          <circle
            cx="500"
            cy="300"
            r="80"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <line
            x1="500"
            y1="40"
            x2="500"
            y2="560"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <rect
            x="40"
            y="170"
            width="140"
            height="260"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <rect
            x="820"
            y="170"
            width="140"
            height="260"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <rect
            x="40"
            y="220"
            width="80"
            height="160"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <rect
            x="880"
            y="220"
            width="80"
            height="160"
            fill="none"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
          />
          <circle cx="500" cy="300" r="5" fill="rgba(255,255,255,0.6)" />
          <circle cx="160" cy="300" r="5" fill="rgba(255,255,255,0.6)" />
          <circle cx="840" cy="300" r="5" fill="rgba(255,255,255,0.6)" />
        </svg>

        {/* Players container with grid layout */}
        <div className="absolute inset-0 grid grid-cols-4 items-center z-10">
          {/* Goalkeepers */}
          <div className="flex flex-col items-center justify-center gap-4">
            {cartSummary?.playersByPosition?.goalkeepers.map(
              (goalkeeper, index) => (
                <div
                  key={index}
                  className="group relative cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handlePlayerClick(goalkeeper)}
                >
                  {/* Player circular frame with fancy border */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                    <img
                      src={goalkeeper.player_face_url}
                      alt={goalkeeper.short_name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Player number badge */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-sm font-bold border border-white shadow-md">
                    {goalkeeper.jersey_number || 1}
                  </div>

                  {/* Player name tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-3 rounded-full whitespace-nowrap transition-opacity duration-200">
                    {goalkeeper.short_name}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Defenders */}
          <div className="flex flex-col items-center justify-around gap-1 py-4 h-full">
            {cartSummary?.playersByPosition?.defenders.map(
              (defender, index) => (
                <div
                  key={index}
                  className="group relative cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handlePlayerClick(defender)}
                >
                  {/* Player circular frame */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                    <img
                      src={defender.player_face_url}
                      alt={defender.short_name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Player number badge */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold border border-white shadow-md">
                    {defender.jersey_number || index + 2}
                  </div>

                  {/* Player name tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-3 rounded-full whitespace-nowrap transition-opacity duration-200">
                    {defender.short_name}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Midfielders */}
          <div className="flex flex-col items-center justify-around gap-1 py-4 h-full">
            {cartSummary?.playersByPosition?.midfielders.map(
              (midfielder, index) => (
                <div
                  key={index}
                  className="group relative cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handlePlayerClick(midfielder)}
                >
                  {/* Player circular frame */}
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                    <img
                      src={midfielder.player_face_url}
                      alt={midfielder.short_name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Player number badge */}
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold border border-white shadow-md">
                    {midfielder.jersey_number || index + 6}
                  </div>

                  {/* Player name tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-3 rounded-full whitespace-nowrap transition-opacity duration-200">
                    {midfielder.short_name}
                  </div>
                </div>
              )
            )}
          </div>

          {/* Forwards */}
          <div className="flex flex-col items-center justify-around gap-1 py-4 h-full">
            {cartSummary?.playersByPosition?.forwards.map((forward, index) => (
              <div
                key={index}
                className="group relative cursor-pointer transition-transform hover:scale-105"
                onClick={() => handlePlayerClick(forward)}
              >
                {/* Player circular frame */}
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-white shadow-lg bg-white">
                  <img
                    src={forward.player_face_url}
                    alt={forward.short_name}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Player number badge */}
                <div className="absolute -bottom-1 -right-1 w-7 h-7 md:w-8 md:h-8 rounded-full bg-yellow-600 flex items-center justify-center text-white text-sm font-bold border border-white shadow-md">
                  {forward.jersey_number || index + 9}
                </div>

                {/* Player name tooltip */}
                <div className="opacity-0 group-hover:opacity-100 absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs py-1 px-3 rounded-full whitespace-nowrap transition-opacity duration-200">
                  {forward.short_name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Formation indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-1 rounded-full text-sm font-medium border border-white/30">
          4-3-3
        </div>
      </div>

      {/* Mobile View - Enhanced Card-based Layout */}
      <div className="sm:hidden mt-2 space-y-4">
        {/* Formation card */}
        <div className="bg-gradient-to-r from-green-800 to-green-600 rounded-xl p-4 text-center shadow-lg">
          <h2 className="text-white font-bold text-xl">Team Formation</h2>
          <div className="bg-white/20 text-white text-lg font-bold rounded-full px-8 py-2 mt-2 inline-block">
            4-3-3
          </div>
        </div>

        {/* Position sections */}
        {[
          {
            title: "Goalkeepers",
            players: cartSummary?.playersByPosition?.goalkeepers,
            color: "red",
            colorClass: "bg-red-600",
          },
          {
            title: "Defenders",
            players: cartSummary?.playersByPosition?.defenders,
            color: "blue",
            colorClass: "bg-blue-600",
          },
          {
            title: "Midfielders",
            players: cartSummary?.playersByPosition?.midfielders,
            color: "green",
            colorClass: "bg-green-600",
          },
          {
            title: "Forwards",
            players: cartSummary?.playersByPosition?.forwards,
            color: "yellow",
            colorClass: "bg-yellow-600",
          },
        ].map((section, sectionIndex) => (
          <div
            key={sectionIndex}
            className="bg-gray-50 rounded-xl shadow-md overflow-hidden"
          >
            <div
              className={`${section.colorClass} text-white p-3 flex items-center justify-between`}
            >
              <h3 className="text-md font-bold">{section.title}</h3>
              <span className="bg-white text-gray-800 text-xs px-2 py-1 rounded-full">
                {section.players.length} players
              </span>
            </div>
            <div className="flex flex-row overflow-x-auto gap-3 p-4">
              {section.players.map((player, playerIndex) => (
                <div
                  key={playerIndex}
                  className="flex-shrink-0 cursor-pointer flex flex-col items-center"
                  onClick={() => handlePlayerClick(player)}
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img
                      src={player.player_face_url}
                      alt={player.short_name}
                      className="w-full h-full object-cover object-center"
                    />
                    <div
                      className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border border-white shadow-sm"
                      style={{
                        backgroundColor: `var(--${section.color}-600, ${section.colorClass})`,
                      }}
                    >
                      {player.jersey_number ||
                        (section.title === "Goalkeepers"
                          ? 1
                          : section.title === "Defenders"
                          ? playerIndex + 2
                          : section.title === "Midfielders"
                          ? playerIndex + 6
                          : playerIndex + 9)}
                    </div>
                  </div>
                  <p className="text-xs text-center mt-1 font-medium">
                    {player.short_name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Playing;
