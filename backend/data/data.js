import fs from "fs";
import csvParser from "csv-parser";
import { sql } from "../neon/connection.js";

export function InsertData() {
    return new Promise((resolve, reject) => {
        const rows = [];

        // Step 1: Read CSV into an array
        fs.createReadStream("C:/Users/iamdhruvsaini/Desktop/deloitte/football-optimization/football/backend/data/database.csv")
            .pipe(csvParser())
            .on("data", (row) => rows.push(row))
            .on("end", async () => {
                console.log(`✅ Successfully Read ${rows.length} Rows from CSV`);

                try {
                    for (const row of rows) {
                        let wageId = null;
                        if (row.wage_eur && row.value_eur) {
                            const wageResult = await sql`
                                INSERT INTO wages (bought, wage_eur, value_eur)
                                VALUES (${row.bought || 0}, ${row.wage_eur}, ${row.value_eur})
                                RETURNING wage_id;
                            `;
                            wageId = wageResult[0].wage_id;
                        }

                        const playerResult = await sql`
                            INSERT INTO players (
                                short_name, long_name, league_name, club_name, 
                                overall, potential, age, wage_id, nationality_name, 
                                player_face_url, club_position, club_jersey_number, trending
                            ) VALUES (
                                ${row.short_name}, ${row.long_name}, ${row.league_name}, ${row.club_name},
                                ${row.overall}, ${row.potential}, ${row.age}, ${wageId}, ${row.nationality_name},
                                ${row.player_face_url}, ${row.club_position}, ${row.club_jersey_number}, ${row.trending || "NO"}
                            ) RETURNING player_id;
                        `;
                        const playerId = playerResult[0].player_id;

                        await sql`
                            INSERT INTO physical (player_id, height_cm, weight_kg, bmi)
                            VALUES (${playerId}, ${row.height_cm}, ${row.weight_kg}, ${row.weight_kg / ((row.height_cm / 100) ** 2)});
                        `;

                        await sql`
                            INSERT INTO player_skills (
                                player_id, skill_moves, pace, shooting, passing, dribbling, 
                                defending, physic, attacking_skills, skill_attributes, 
                                movement_skills, power_attributes, mental_attributes, 
                                defending_skills, goalkeeping_ability
                            ) VALUES (
                                ${playerId}, ${row.skill_moves}, ${row.pace}, ${row.shooting}, ${row.passing}, ${row.dribbling}, 
                                ${row.defending}, ${row.physic}, ${row.attacking_skills}, ${row.skill_attributes}, 
                                ${row.movement_skills}, ${row.power_attributes}, ${row.mental_attributes}, 
                                ${row.defending_skills}, ${row.goalkeeping_ability}
                            );
                        `;
                        console.log(`✅ Inserted : ${row.short_name}`);
                    }

                    console.log("✅ All Data Imported Successfully!");
                    resolve();  // Resolves the promise when done
                } catch (error) {
                    console.error("❌ Error inserting data:", error);
                    reject(error);  // Rejects the promise if there is an error
                }
            })
            .on("error", (error) => {
                console.error("❌ Error reading CSV:", error);
                reject(error);
            });
    });
}
