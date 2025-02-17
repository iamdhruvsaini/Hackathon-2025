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

        const { player, country, position, age } = req.query;

        // Base query with dynamic conditions
        let query = `
            SELECT p.player_id, p.player_face_url, p.short_name, p.nationality_name, 
                   p.overall, p.age, p.club_position, w.bought
            FROM players p
            LEFT JOIN wages w ON p.wage_id = w.wage_id
            WHERE p.club_position IN ('CB', 'LCB', 'RCB', 'LB', 'RB', 'LWB', 'RWB')
        `;
        let values = [];
        let count = 1;

        if (player) {
            query += ` AND short_name ILIKE $${count}`;
            values.push(`%${player}%`);
            count++;
        }
        if (country) {
            query += ` AND nationality_name ILIKE $${count}`;
            values.push(`%${country}%`);
            count++;
        }
        if (position) {
            query += ` AND club_position = $${count}`;
            values.push(position);
            count++;
        }
        if (age) {
            query += ` AND age >= $${count}`;
            values.push(parseInt(age));
            count++;
        }

        // Add pagination
        query += ` LIMIT $${count} OFFSET $${count + 1}`;
        values.push(limit, offset);

        // Execute the query
        const players = await sql(query, values);

        res.status(200).json({
            success: true,
            data: players
        });

    } catch (error) {
        console.error("Error fetching defender players:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch defender players",
            error: error.message
        });
    }
};

