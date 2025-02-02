import React from 'react'
import players from "../../data/playerdata.js";

import "./styles/player-card.css"
import PlayerStatsBarChart from './PlayerCardBarChart.jsx';
import PlayerScoreDial from './PlayerScoreDial.jsx';

const PlayerCardRightSection = () => {

    const player = players[0]

    return (
        <div className='player-card-right-section'>
            <PlayerStatsBarChart player={player} />
            <PlayerScoreDial player={player} />
        </div>
    )
}

export default PlayerCardRightSection