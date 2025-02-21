import { sql } from "../neon/connection.js";

export const DominionFcModel = async () => {
    // Users Table
    await sql`
    CREATE TABLE IF NOT EXISTS users (
        user_id UUID PRIMARY KEY 
    );
    `;

    // Wages Table
    await sql`
    CREATE TABLE IF NOT EXISTS wages (
        wage_id SERIAL PRIMARY KEY,
        bought SMALLINT DEFAULT 0,
        wage_eur DECIMAL(10,2),
        value_eur DECIMAL(10,2)
    );
    `;

    // Players Table 
    await sql`
    CREATE TABLE IF NOT EXISTS players (
        player_id SERIAL PRIMARY KEY,
        short_name TEXT NOT NULL,
        long_name TEXT,
        league_name TEXT,
        club_name TEXT,
        overall INT,
        potential INT,
        age INT,
        wage_id INT,
        nationality_name TEXT,  
        player_face_url TEXT NOT NULL,
        club_position VARCHAR(100),
        club_jersey_number INT,
        trending VARCHAR(5) DEFAULT 'NO',
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (wage_id) REFERENCES wages(wage_id) ON DELETE SET NULL
    );
    `;

    // Physical Attributes Table
    await sql`
    CREATE TABLE IF NOT EXISTS physical (
        physical_id SERIAL PRIMARY KEY,
        player_id INT NOT NULL,
        height_cm INT,
        weight_kg INT,
        bmi DECIMAL(10,2),
        FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
    );
    `;

    // Player Skills Table
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
        attacking_skills DECIMAL(10,2),
        skill_attributes DECIMAL(10,2),
        movement_skills DECIMAL(10,2),
        power_attributes DECIMAL(10,2),
        mental_attributes DECIMAL(10,2),
        defending_skills DECIMAL(10,2),
        goalkeeping_ability DECIMAL(10,2),
        FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
    );
    `;

    // User Selections Table
    await sql`
    CREATE TABLE IF NOT EXISTS user_selections (
        user_id UUID NOT NULL,
        player_id INT NOT NULL,
        PRIMARY KEY (user_id, player_id),
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (player_id) REFERENCES players(player_id) ON DELETE CASCADE
    );
    `;

    await sql`
    CREATE TABLE IF NOT EXISTS admin(
        admin_id SERIAL NOT NULL, 
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(255)
    );
    `
};
