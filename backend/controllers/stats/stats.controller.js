import { sql } from "../../neon/connection.js";

export const getTopRatedPlayers = async (req, res) => {
    try {
        const response = await sql`
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, p.overall
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY p.overall DESC
        LIMIT 10;
        `;
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getHighPotentialPlayers = async (req, res) => {
    try {
        const response = await sql`
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, p.potential
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY p.potential DESC
        LIMIT 10;
        `;
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getBiggestRatingDifferences = async (req, res) => {
    try {
        const response = await sql`
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, 
               (p.potential - p.overall) AS rating_difference
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY rating_difference DESC
        LIMIT 10;
        `;
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getMostValuablePlayers = async (req, res) => {
    try {
        const response = await sql`
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, w.value_eur
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY w.value_eur DESC
        LIMIT 10;
        `;
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getHighestPaidPlayers = async (req, res) => {
    try {
        const response = await sql`
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, w.wage_eur
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY w.wage_eur DESC
        LIMIT 10;
        `;
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const getBestForwards = async (req, res) => {
    try {
        const response = await sql`
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, p.overall
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        WHERE p.club_position IN ('ST', 'CF', 'LW', 'RW')
        ORDER BY p.overall DESC
        LIMIT 10;
        `;
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
