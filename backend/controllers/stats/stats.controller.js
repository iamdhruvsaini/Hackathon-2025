import { sql } from "../../neon/connection.js"


//ALWAYS FECTH IN ORDER player_face_url, short_name,bought,skills

export const getTopRatedPlayer = async (req, res) => {
    try {
        const response = await sql`
            SELECT p.player_face_url, p.short_name, w.bought, p.club_position ,p.nationality_name,p.overall ,w.value_eur 
            FROM players p 
            JOIN wages w ON p.wage_id = w.wage_id 
            ORDER BY p.overall DESC 
            LIMIT 20;
        `;

        res.status(200).json({ success: true, data: response });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getHighPotentialPlayer = async (req, res) => {
    try {
        const response = await sql`
           SELECT p.player_face_url, p.short_name, w.bought, p.club_position ,p.nationality_name,p.potential ,w.value_eur 
           FROM players p 
           JOIN wages w ON p.wage_id = w.wage_id 
           ORDER BY p.potential DESC 
           LIMIT 20;

        `;
        res.status(200).json({ success: true, data: response });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const biggestRatingDifference=async(req,res)=>{
    try {
        const response=await sql `
        SELECT p.player_face_url, p.short_name , w.bought, p.club_position, p.nationality_name,(potential - overall) AS rating_difference 
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id 
        ORDER BY rating_difference DESC
        LIMIT 20;
        ;
        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const mostValuablePlayer=async(req,res)=>{
    try {
        const response=await sql `
            SELECT p.player_face_url, p.short_name, w.bought , p.club_position ,p.nationality_name, p.club_jersey_number ,w.value_eur 
            FROM players p 
            JOIN wages w ON p.wage_id = w.wage_id 
            ORDER BY w.value_eur DESC 
            LIMIT 20;
        `
        res.status(200).json({ success: true, data: response });
        
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}

export const highestPaidPlayer = async (req, res) => { 
    try {
        const response = await sql`
            SELECT p.player_face_url, p.short_name, w.bought,p.nationality_name, w.wage_eur
            FROM players p 
            JOIN wages w ON p.wage_id = w.wage_id 
            ORDER BY w.wage_eur DESC 
            LIMIT 20;

        `
        res.status(200).json({ success: true, data: response });
    }
    catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const valueForMoney=async(req,res)=>{
    try {
        const response=await sql `
        SELECT p.*, w.wage_eur, 
        (p.overall / NULLIF(w.wage_eur, 0)) AS value_for_money 
        FROM players p 
        JOIN wages w ON p.wage_id = w.wage_id 
        ORDER BY value_for_money DESC 
        LIMIT 10;
        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

