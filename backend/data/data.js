import fs from "fs";
import csvParser from "csv-parser";

import { sql } from "../neon/connection.js";


export function InsertData() {

    const importData = async (filePath) => {
        const rows = [];

        // Read CSV File
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => {
                rows.push(row);
            })
            .on("end", async () => {
                console.log(`✅ Successfully Read ${rows.length} Rows from CSV`);

                for (const row of rows) {
                    try {
                        // 🔹 Step 1: Insert into Wages Table (if wage data exists)
                        let wageId = null;
                        if (row.wage_eur && row.value_eur) {
                            const wageResult = await sql`
                            INSERT INTO wages (wage_eur, value_eur) 
                            VALUES (${row.wage_eur}, ${row.value_eur}) 
                            RETURNING wage_id;
                        `;
                            wageId = wageResult[0].wage_id;
                        }

                        // 🔹 Step 2: Insert into Players Table
                        const playerResult = await sql`
                        INSERT INTO players (
                            short_name, long_name, nationality_name, club_name, 
                            overall, potential, league_name, league_level, wage_id, 
                            player_face_url, club_position, club_jersey_number,bmi
                        ) VALUES (
                            ${row.short_name}, ${row.long_name}, ${row.nationality_name}, 
                            ${row.club_name}, ${row.overall}, ${row.potential}, 
                            ${row.league_name}, ${row.league_level}, ${wageId}, 
                            ${row.player_face_url}, ${row.club_position}, ${row.club_jersey_number},${row.BMI}
                        ) RETURNING player_id;
                    `;
                        const playerId = playerResult[0].player_id;

                        // 🔹 Step 3: Insert into Player Skills Table
                        await sql`
                        INSERT INTO player_skills (
                            player_id, skill_moves, pace, shooting, passing, dribbling, defending, physic, 
                            attacking_skills, skill_attributes, movement_skills, power_attributes, 
                            mental_attributes, defending_skills, goalkeeping_ability
                        ) VALUES (
                            ${playerId}, ${row.skill_moves}, ${row.pace}, ${row.shooting}, 
                            ${row.passing}, ${row.dribbling}, ${row.defending}, ${row.physic}, 
                            ${row.attacking_skills}, ${row.skill_attributes}, ${row.movement_skills}, 
                            ${row.power_attributes}, ${row.mental_attributes}, 
                            ${row.defending_skills}, ${row.goalkeeping_ability}
                        );
                    `;

                        console.log(`✅ Inserted Player: ${row.short_name}`);
                    } catch (error) {
                        console.error(`❌ Error inserting data for ${row.short_name}:`, error);
                    }
                }

                console.log("✅ All Data Imported Successfully");
            });
    };

    importData("C:/Users/iamdhruvsaini/Desktop/deloitte/football-optimization/football/backend/data/backend_data.csv");
}
// 🔹 Run Import Function with Your CSV File Path

