import { sql } from "../../neon/connection.js"

export const getPlayerPositionCount=async(req,res)=>{
    try {
        const response = await sql`
       SELECT 
       CASE 
            WHEN club_position = 'GK' THEN 'Goalkeepers'
            WHEN club_position IN ('CB', 'LCB', 'RCB', 'LB', 'RB', 'LWB', 'RWB') THEN 'Defenders'
            WHEN club_position IN ('CDM', 'LDM', 'RDM', 'CM', 'LCM', 'RCM', 'CAM', 'LAM', 'RAM') THEN 'Midfielders'
            WHEN club_position IN ('LM', 'RM', 'LW', 'RW') THEN 'Wingers'
            WHEN club_position IN ('ST', 'LS', 'RS', 'CF', 'RF', 'LF') THEN 'Forwards'
            WHEN club_position IN ('SUB', 'RES') THEN 'Substitutes & Reserves'
            ELSE 'Unknown'
            END AS position_bucket,
            COUNT(*) AS player_count
        FROM players
        GROUP BY position_bucket;
    `;
       return res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const getRecentSoldPlayer=async(req,res)=>{
    try {
        const response = await sql`
        SELECT 
            p.club_position AS position,
            p.nationality_name AS country,
            p.short_name AS name,
            w.wage_eur AS wage
        FROM players p
        LEFT JOIN wages w ON p.wage_id = w.wage_id
        WHERE w.bought = 1
        ORDER BY p.timestamp DESC
        LIMIT 7
        ;
    `;
       return res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}