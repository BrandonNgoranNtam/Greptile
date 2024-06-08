// server/api/keywords/keywords.js

const db = require("../../utils/db/db"); // Adjust the path as needed

// Function to insert a new keyword if it doesn't already exist
async function insertKeyword(word) {
  try {
    console.log("Inserting keyword:", word);
    const query = `
            INSERT INTO keywords (word) 
            VALUES ($1) 
            ON CONFLICT (word) DO UPDATE
            SET word = EXCLUDED.word
            RETURNING id;
        `;
    console.log("Query:", query);
    const result = await db.query(query, [word]);
    console.log("Inserted or existing keyword ID:", result.rows[0].id);
    return result.rows[0].id;
  } catch (error) {
    console.error("Error inserting keyword:", error);
    throw new Error("Error inserting keyword");
  }
}

// Function to insert a relationship between team and keyword
async function insertTeamKeyword(teamId, keywordId) {
  try {
    const query = `
            INSERT INTO team_keywords (team_id, keyword_id) 
            VALUES ($1, $2)
            `;
    const result = await db.query(query, [teamId, keywordId]);
    return result.rows[0];
  } catch (error) {
    throw new Error("Error inserting keyword");
  }

  // Function to insert a relationship between team and keyword
}

module.exports = {
  insertKeyword,
  insertTeamKeyword,
};
