import { sql } from "../neon/connection.js";

export const DominionFcModel=async ()=>{
    // Users Table (Fix: Ensuring only one `user_id` column)
    await sql`
    CREATE TABLE IF NOT EXISTS users (
        user_id UUID PRIMARY KEY
    );
    `;

    // Wages Table
    await sql`
    CREATE TABLE IF NOT EXISTS wages (
        wage_id SERIAL PRIMARY KEY,
        wage_eur DECIMAL(10,2),
        value_eur DECIMAL(10,2)
    );
    `;

    // Players Table
    await sql`
    CREATE TABLE IF NOT EXISTS player_skills (
        skill_id SERIAL PRIMARY KEY,
        player_id INT NOT NULL,
        skill_moves INT,
        pace INT,
        shooting INT,
        passing INT,
        dribbling INT,
        defending INT,
        physic INT,
        attacking_skills DECIMAL(10,3),
        skill_attributes DECIMAL(10,3),
        movement_skills DECIMAL(10,3),
        power_attributes DECIMAL(10,3),
        mental_attributes DECIMAL(10,3),
        defending_skills DECIMAL(10,3),
        goalkeeping_ability DECIMAL(10,3),
        FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
    );
    `;

    // User Selections Table (Fix: Ensuring only one `user_id` column)
    await sql`
    CREATE TABLE IF NOT EXISTS user_selections (
        user_id UUID NOT NULL,
        player_id INT NOT NULL,
        PRIMARY KEY (user_id, player_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
    );
    `;

}