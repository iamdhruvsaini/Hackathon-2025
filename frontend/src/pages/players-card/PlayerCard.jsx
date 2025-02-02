import React from 'react';
import "./styles/player-card.css";
import players from "../../data/playerdata.js";
import PlayerCardLeftSection from './PlayerCardLeftSection';
import PlayerCardRightSection from './PlayerCardRightSection';


const PlayerCard = () => {
    const player = players[0];

    return (
        <div className='main-player-card'>
            {/* Left Section */}
            <div className='playercard-section-1'>
                <PlayerCardLeftSection />
            </div>

            {/* Middle Section */}
            <div className='playercard-section-2'>
                <div className='player-image-container'>
                    <img className='player-image' src={player.image_url} alt={player.name} />
                </div>
                <div className='player-name-and-position'>
                    <h1 className='player-name'>{player.name}</h1>
                    <h2 className='player-position'>{player.position}</h2>
                </div>
                <div className='player-price'>
                    <span className='price-label'>Market Value</span>
                    <span className='price-value'>${player.price}</span>
                </div>
                <button className='add-this-player-button'>Add this player</button>
            </div>

            {/* Right Section */}
            <div className='playercard-section-3'>
                <h1 className='player-stats-heading'>Player Stats</h1>
                <PlayerCardRightSection />

            </div>
        </div>
    );
};

export default PlayerCard;