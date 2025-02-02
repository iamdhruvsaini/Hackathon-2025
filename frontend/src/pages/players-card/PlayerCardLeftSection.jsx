import React from 'react';
import "./styles/player-card-left-section.css";
import players from '@/data/playerdata';
import PlayerStatsDoughnutChart from './PlayerStatsDoughnutChart';

const PlayerCardLeftSection = () => {
    const player = players[0];

    return (
        <div className='playercard-left-section'>
            {/* Section Title */}
            <div className='playercard-section-title'>
                <h1 className='playercard-section-title-text'>
                    Physical Attributes
                </h1>
            </div>

            {/* Physical Attributes Section */}
            <div className='playercard-section-physical-attributes'>
                {[
                    { label: "Age", value: player.age },
                    { label: "Height", value: player.height },
                    { label: "Weight", value: player.weight },
                    { label: "Physique", value: player.physique },
                    { label: "Power", value: player.power },
                    { label: "Potential", value: player.potential },
                ].map((attr, index) => (
                    <div key={index} className='playercard-section-physical-attributes-attribute'>
                        <span className='attribute-label'>{attr.label}</span>
                        <span className='attribute-value'>{attr.value}</span>
                    </div>
                ))}
            </div>

            {/* Doughnut Chart Section */}
            <div className='player-doughnut-potential'>
                <PlayerStatsDoughnutChart player={player} />
            </div>
        </div>
    );
};

export default PlayerCardLeftSection;