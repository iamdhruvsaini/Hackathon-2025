import { sql } from "../../../neon/connection.js";


// Get Top-Rated Players
export const getTopRatedPlayers = async (req, res) => {
    try {
        const topRatedPlayers = await sql`
            SELECT 
                p.player_id,
                p.player_face_url, 
                p.short_name, 
                w.bought, 
                p.club_name, 
                p.league_name, 
                p.overall
            FROM players p
            JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY p.overall DESC
            LIMIT 10;
        `;

        res.status(200).json({ success: true, data: topRatedPlayers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Get High Potential Players
export const getHighPotentialPlayers = async (req, res) => {
    try {
        const highPotentialPlayers = await sql`
            SELECT 
                p.player_id,
                p.player_face_url, 
                p.short_name, 
                w.bought, 
                p.club_name, 
                p.league_name, 
                p.potential
            FROM players p
            JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY p.potential DESC
            LIMIT 10;
        `;

        res.status(200).json({ success: true, data: highPotentialPlayers });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

// Get Players with Biggest Rating Differences
export const getBiggestRatingDifferences = async (req, res) => {
    try {
        const ratingDifferences = await sql`
            SELECT 
                p.player_id,
                p.player_face_url, 
                p.short_name, 
                w.bought, 
                p.club_name, 
                p.league_name, 
                (p.potential - p.overall) AS rating_difference
            FROM players p
            JOIN wages w ON p.wage_id = w.wage_id
            ORDER BY rating_difference DESC
            LIMIT 10;
        `;

        res.status(200).json({ success: true, data: ratingDifferences });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};
