import { sql } from "../../neon/connection.js";

// const positionMap = {
//     defenders: ['CB', 'LCB', 'RCB', 'LB', 'RB', 'LWB', 'RWB'],
//     midfielders: ['CDM', 'LDM', 'RDM', 'CM', 'LCM', 'RCM', 'CAM', 'LAM', 'RAM'],
//     wingers: ['LM', 'RM', 'LW', 'RW'],
//     forwards: ['ST', 'LS', 'RS', 'CF', 'RF', 'LF'],
//     goalkeepers: ['GK'],
//     Substitutes & Reserves:[SUB, RES]
// };

export const fetchDefenderPlayers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const players = await sql`
            SELECT player_id, player_face_url, short_name, nationality_name, overall, age, club_position ,'Defender' AS player_type
            FROM players 
            WHERE club_position IN ('CB', 'LCB', 'RCB', 'LB', 'RB', 'LWB', 'RWB')
            ORDER BY overall DESC
            LIMIT ${limit} OFFSET ${offset};
        `;

        // If returned players are less than the limit, it means no more data is present.
        const hasMore = players.length === limit;

        res.status(200).json({
            success: true,
            page,
            limit,
            hasMore,
            data: players,
        });

    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

export const fetchMidfieldersPlayers=async (req,res)=>{

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const players = await sql`
            SELECT player_id, player_face_url, short_name, nationality_name, overall, age, club_position,'Midfielder' AS player_type
            FROM players 
            WHERE club_position IN ('CDM', 'LDM', 'RDM', 'CM', 'LCM', 'RCM', 'CAM', 'LAM', 'RAM')
            ORDER BY overall DESC
            LIMIT ${limit} OFFSET ${offset};
        `;

        // If returned players are less than the limit, it means no more data is present.
        const hasMore = players.length === limit;

        res.status(200).json({
            success: true,
            page,
            limit,
            hasMore,
            data: players,
        });

    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

export const fetchWingersPlayers=async (req,res)=>{

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const players = await sql`
            SELECT player_id, player_face_url, short_name, nationality_name, overall, age, club_position,'Winger' AS player_type
            FROM players 
            WHERE club_position IN ('LM', 'RM', 'LW', 'RW')
            ORDER BY overall DESC
            LIMIT ${limit} OFFSET ${offset};
        `;

        // If returned players are less than the limit, it means no more data is present.
        const hasMore = players.length === limit;

        res.status(200).json({
            success: true,
            page,
            limit,
            hasMore,
            data: players,
        });

    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

export const fetchforwardsPlayers=async (req,res)=>{

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const players = await sql`
            SELECT player_id, player_face_url, short_name, nationality_name, overall, age, club_position,'Forwards' AS player_type
            FROM players 
            WHERE club_position IN ('ST', 'LS', 'RS', 'CF', 'RF', 'LF')
            ORDER BY overall DESC
            LIMIT ${limit} OFFSET ${offset};
        `;

        // If returned players are less than the limit, it means no more data is present.
        const hasMore = players.length === limit;

        res.status(200).json({
            success: true,
            page,
            limit,
            hasMore,
            data: players,
        });

    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

export const fetchGoalKeeperPlayers=async (req,res)=>{

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const players = await sql`
            SELECT player_id, player_face_url, short_name, nationality_name, overall, age, club_position,'Goalkeeper' AS player_type
            FROM players 
            WHERE club_position = 'GK'
            ORDER BY overall DESC
            LIMIT ${limit} OFFSET ${offset};
        `;

        // If returned players are less than the limit, it means no more data is present.
        const hasMore = players.length === limit;

        res.status(200).json({
            success: true,
            page,
            limit,
            hasMore,
            data: players,
        });

    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}

export const fetchReservesPlayers=async (req,res)=>{

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const offset = (page - 1) * limit;

        const players = await sql`
            SELECT player_id, player_face_url, short_name, nationality_name, overall, age, club_position,'Substitute' AS player_type
            FROM players 
            WHERE club_position in ('SUB','RES')
            ORDER BY overall DESC
            LIMIT ${limit} OFFSET ${offset};
        `;

        // If returned players are less than the limit, it means no more data is present.
        const hasMore = players.length === limit;

        res.status(200).json({
            success: true,
            page,
            limit,
            hasMore,
            data: players,
        });

    } catch (error) {
        console.error("Error fetching players:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }

}
