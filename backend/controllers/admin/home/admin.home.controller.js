import { sql } from "../../../neon/connection.js"
import crypto from "crypto"

//fetch portal stats
export const portalHomeStats = async (req, res) => {
    try {
        const response = await sql`
            SELECT 
                COUNT(p.player_id) AS total_players, 
                COUNT(CASE WHEN p.trending = 'YES' THEN 1 END) AS trending_players, 
                COUNT(DISTINCT p.nationality_name) AS total_countries,
                COUNT(DISTINCT p.club_name) AS total_clubs,
                COUNT(CASE WHEN w.bought = 1 THEN 1 END) AS total_players_sold
            FROM players p
            LEFT JOIN wages w ON p.wage_id = w.wage_id;
        `;

        res.status(200).json({
            success: true,
            data: response[0], 
        });
    } catch (error) {
        console.error("Error fetching portal home stats:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

//fetch trending players
export const getTrendingPlayers = async (req, res) => {
    try {
        const trendingPlayers = await sql`
            SELECT 
                player_id, 
                short_name, 
                nationality_name, 
                age
            FROM players
            WHERE trending = 'YES'
            ORDER BY timestamp DESC; 
        `;

        // Send response
        res.status(200).json({
            success: true,
            data: trendingPlayers,
        });
    } catch (error) {
        console.error("Error fetching trending players:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

//fetch recently sold players
export const getSoldPlayers = async (req, res) => {
    try {
        const boughtPlayers = await sql`
            SELECT 
                p.player_face_url,
                p.player_id, 
                p.short_name, 
                p.nationality_name, 
                p.age,
                w.wage_eur
            FROM players p
            JOIN wages w ON p.wage_id = w.wage_id
            WHERE w.bought = 1
            ORDER BY p.timestamp DESC; 
        `;

        // Send response
        res.status(200).json({
            success: true,
            data: boughtPlayers,
        });
    } catch (error) {
        console.error("Error fetching bought players:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await sql`
            SELECT admin_id, name, email, role, timestamp 
            FROM admin
            ORDER BY timestamp DESC;  -- Newest first
        `;

        res.status(200).json({
            message: "Admins fetched successfully",
            data:admins
        });
    } catch (error) {
        console.error("Error fetching admins:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

