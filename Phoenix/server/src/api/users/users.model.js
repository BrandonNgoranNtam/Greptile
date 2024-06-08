const db = require("../../utils/db/db");

// Insert a user by their Clerk user ID
async function insertUser(clerkUserId) {
  try {
    const query = `
      INSERT INTO users (clerk_user_id)
      VALUES ($1)
      RETURNING *;
    `;
    const result = await db.query(query, [clerkUserId]);
    console.log("Inserted user:", result.rows[0]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error inserting user: ${error.message}`);
  }
}

// Get a user by their Clerk user ID
async function getUserByClerkId(clerkUserId) {
  try {
    const query = `
      SELECT id
      FROM users
      WHERE clerk_user_id = $1;
    `;
    const result = await db.query(query, [clerkUserId]);
    return result.rows[0];
  } catch (error) {
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

// Add a selected team for a user (Fix the ID thing)
async function addUserTeams(userId, teams) {
  try {
    console.log("Adding user teams:", userId, teams);
    const query = `
      INSERT INTO user_teams (user_id, team_id)
      VALUES ${teams.map((_, i) => `($1, $${i + 2})`).join(", ")}
      ON CONFLICT DO NOTHING
    `;
    const params = [userId, ...teams.map((team) => {
      console.log("Team ID:", team.id);
      return  team.id;
    })];
    console.log("Params:", params);
    const result = await db.query(query, params);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}


// Function to get all teams for a user
async function getUserTeams(userId) {

  try {
    const query = `
    SELECT teams.*
    FROM teams
    INNER JOIN user_teams ON teams.external_id = user_teams.team_id
    WHERE user_teams.user_id = $1
  `;
    const result = await db.query(query, [userId]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteUserTeams(userId, teamIds) {
  try {
    console.log("Deleting user teams:", userId, teamIds);
    const query = `
    DELETE FROM user_teams
    WHERE user_id = $1 AND team_id = ANY($2::int[])
  `;
    const result = await db.query(query, [userId, teamIds]);
    console.log("Deleted user teams:", result.rows);
    return result.rows;
  } catch (error) {
    console.log("Error deleting user teams:", error.message);
    throw new Error(error.message);
  }
}

async function getUserBlockedKeywords(userId) {
  try {
    const query = `
      SELECT k.word 
      FROM keywords k
      JOIN team_keywords tk ON k.id = tk.keyword_id
      JOIN user_teams ut ON ut.team_id = tk.team_id
      WHERE ut.user_id = $1 AND ut.is_blocked = true
    `;
    const result = await db.query(query, [userId]);
    return result.rows.map(row => row.word);
  } catch (error) {
    throw new Error(error.message);
  }
}

async function updateTeamBlockStatus (userId, teamId, blocked) {
  try {
    const query = `
      UPDATE user_teams
      SET is_blocked = $3
      WHERE user_id = $1 AND team_id = $2
    `;
    const result = await db.query(query, [userId, teamId, blocked]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUserBlockedTeams(userId) {
  try {
    const query = `
      SELECT teams.external_id
      FROM teams
      INNER JOIN user_teams ON teams.external_id = user_teams.team_id
      WHERE user_teams.user_id = $1 AND user_teams.is_blocked = true
    `;
    const result = await db.query(query, [userId]);
    return result.rows;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  getUserByClerkId,
  addUserTeams,
  insertUser,
  getUserTeams,
  deleteUserTeams,
  getUserBlockedKeywords,
  updateTeamBlockStatus,
  getUserBlockedTeams
};
