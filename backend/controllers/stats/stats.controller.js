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
        SELECT p.player_face_url, p.short_name, w.bought,p.nationality_name, w.wage_eur, 
        (p.overall / NULLIF(w.wage_eur, 0)) AS value_for_money 
        FROM players p 
        JOIN wages w ON p.wage_id = w.wage_id 
        ORDER BY value_for_money DESC 
        LIMIT 20;
        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getBestForwards=async(req,res)=>{
    try {
        const response=await sql`
        SELECT 
        p.player_face_url, 
        p.short_name, 
        w.bought, 
        p.club_name, 
        p.overall, 
        ps.shooting, 
        ps.pace
        FROM players p
        JOIN player_skills ps ON p.player_id = ps.player_id
        LEFT JOIN wages w ON p.wage_id = w.wage_id
        WHERE p.club_position IN ('ST', 'CF', 'RW', 'LW')
        ORDER BY ps.shooting DESC, ps.pace DESC
        LIMIT 20;
        `

        res.status(200).json({ success: true, data: response });

    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getBestMidfielders=async(req,res)=>{
    try {
        const response =await sql `
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, p.overall
        FROM players p
        JOIN player_skills ps ON p.player_id = ps.player_id
        JOIN wages w ON p.wage_id = w.wage_id
        WHERE p.club_position IN ('CM', 'CDM', 'CAM')
        ORDER BY p.overall DESC
        LIMIT 10;
        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getBestDefenders=async(req,res)=>{
    try {
        const response =await sql `
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, p.overall
        FROM players p
        JOIN player_skills ps ON p.player_id = ps.player_id
        JOIN wages w ON p.wage_id = w.wage_id
        WHERE p.club_position IN ('CB', 'LB', 'RB', 'LWB', 'RWB')
        ORDER BY p.overall DESC
        LIMIT 10;
        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getBestGoalkeepers=async(req,res)=>{
    try {
        const response =await sql `
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, ps.goalkeeping_ability AS overall
        FROM players p
        JOIN player_skills ps ON p.player_id = ps.player_id
        JOIN wages w ON p.wage_id = w.wage_id
        WHERE p.club_position = 'GK'
        ORDER BY ps.goalkeeping_ability DESC
        LIMIT 10;
        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getBestDribblers=async(req,res)=>{
    try {
        const response =await sql `
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, ps.dribbling
        FROM players p
        JOIN player_skills ps ON p.player_id = ps.player_id
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY ps.dribbling DESC
        LIMIT 10;

        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const getBestPassers=async(req,res)=>{
    try {
        const response =await sql `
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, ps.passing
        FROM players p
        JOIN player_skills ps ON p.player_id = ps.player_id
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY ps.passing DESC
        LIMIT 10;

        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getFastestPlayers=async(req,res)=>{
    try {
        const response =await sql `
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, ps.pace
        FROM players p
        JOIN player_skills ps ON p.player_id = ps.player_id
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY ps.pace DESC
        LIMIT 10;
        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getMostPhysicalPlayers=async(req,res)=>{
    try {
        const response =await sql `
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, ps.physic
        FROM players p
        JOIN player_skills ps ON p.player_id = ps.player_id
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY ps.physic DESC
        LIMIT 10;
        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const getBestPlayerInLeague=async(req,res)=>{
    try {
        const response =await sql `
        SELECT DISTINCT ON (p.club_name) 
        p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, p.overall
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY p.club_name, p.overall DESC
        LIMIT 20
        ;
        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


export const getBestPlayerInClub=async(req,res)=>{

    try {
        const response =await sql `
        SELECT DISTINCT ON (p.club_name) 
        p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, p.overall
        FROM players p
        JOIN wages w ON p.wage_id = w.wage_id
        ORDER BY p.club_name, p.overall DESC
        LIMIT 20;
        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getHighlyRatedPlayersLeague=async(req,res)=>{

    try {
        const response =await sql `
        SELECT p.league_name, COUNT(*) AS top_players
        FROM players p
        WHERE p.overall >= 85
        GROUP BY p.league_name
        ORDER BY top_players DESC
        LIMIT 10;
        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getPlayersWithHighestSkillMoves=async(req,res)=>{

    try {
        const response =await sql `
        SELECT p.player_face_url, p.short_name, w.bought, p.club_name, p.league_name, ps.skill_moves
        FROM players p
        JOIN player_skills ps ON p.player_id = ps.player_id
        JOIN wages w ON p.wage_id = w.wage_id
        WHERE p.club_name !~ '[0-9]' 
        AND p.league_name !~ '[0-9]'  
        ORDER BY ps.skill_moves DESC
        LIMIT 10;
        `
        res.status(200).json({ success: true, data: response });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}









