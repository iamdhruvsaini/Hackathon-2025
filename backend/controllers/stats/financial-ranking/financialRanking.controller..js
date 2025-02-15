import { sql } from "../../../neon/connection.js";


export const getMostValuablePlayers = async (req, res) => {
    try {
        const players = await sql`
        SELECT 
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            w.value_eur, 
            p.age, 
            p.nationality_name 
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY w.value_eur DESC
        LIMIT 10;
        `;
        
        res.status(200).json({ success: true, data: players });
        
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch most valuable players" });
    }
};

export const getHighestPaidPlayers = async (req, res) => {
    try {
        const players = await sql`
        SELECT 
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            w.wage_eur, 
            p.age, 
            p.nationality_name 
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY w.wage_eur DESC
        LIMIT 10;
        `;
        res.status(200).json({ success: true, data: players });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch highest-paid players" });
    }
};

export const getBestValueForMoneyPlayers = async (req, res) => {
    try {
        const players = await sql`
        SELECT 
            p.player_face_url, 
            p.short_name, 
            w.bought, 
            w.value_eur, 
            (w.value_eur / NULLIF(w.wage_eur, 0)) AS value_for_money, 
            p.age, 
            p.nationality_name 
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        WHERE w.wage_eur > 0
        ORDER BY value_for_money DESC
        LIMIT 10;
        `;
        res.status(200).json({ success: true, data: players });

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch best value-for-money players" });
    }
};
