// server/api/teams/teams.js

const db = require("../../utils/db/db");


async function getAllTeams() {
  try {
    const query = `
            SELECT * FROM teams
        `;
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function insertTeam(teamName, teamCountry, externalId) {
  try {
    console.log(`Inserting team: ${teamName} from ${teamCountry} (${externalId})`);
    const query = `
            INSERT INTO teams (name, country, external_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        console.log("Query:", query);
    const result = await db.query(query, [teamName, teamCountry, externalId]);
    console.log(`Inserted team: ${result.rows[0].name} from ${result.rows[0].country}`);
    return result.rows[0];
  } catch (error) {
    console.error(`Error inserting team: ${error}`);
    throw new Error(error.message);
  }
}

async function getTeamById(teamId) {
  try {
    const query = `
            SELECT * FROM teams
            WHERE external_id = $1
        `;
    const result = await db.query(query, [teamId]);
    return result.rows[0];
  } catch (error) {
    console.error("Error finding team:", error);
    throw new Error("Error finding team");
  }
}

async function getTeamByNameAndCountry(teamName, teamCountry) {
  try {
    const query = `
            SELECT * FROM teams
            WHERE name = $1 AND country = $2
        `;
    const result = await db.query(query, [teamName, teamCountry]);
    return result;
  } catch (error) {
    throw new Error("Error finding team");
  }
}

module.exports = {
  insertTeam,
  getTeamByNameAndCountry,
  getTeamById,
  getAllTeams
  // Other database functions for teams
};
