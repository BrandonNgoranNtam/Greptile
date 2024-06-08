// server/api/teams/teams.handlers.js

const teamsDB = require("./teams.model");
const { runTransaction } = require("../../utils/db/db");
// Database interaction code for teams


async function getAllTeamsHandler(req, res) {
  try {
    const teams = await teamsDB.getAllTeams();
    res.json(teams);
  } catch (error) {
    console.error(`Error getting teams: ${error}`);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
  
}
async function getTeamHandler(req, res) {
  const { teamId } = req.params;
  try {
    const team = await teamsDB.getTeamById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.json(team);
  } catch (error) {
    console.error(`Error getting team: ${error}`);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

// Handler to add a new team
async function addTeamHandler(req, res) {
  const { name, country, externalId } = req.body;

  try {
    await runTransaction(async () => {
      console.log(
        `Received request to add a new team: ${name} from ${country} (${externalId})`
      );
      // Check if the team already exists in the database
      const existingTeam = await teamsDB.getTeamByNameAndCountry(name, country);
      if (existingTeam.rows.length > 0) {
        console.log(
          `Team ${name} from ${country} already exists in the database`
        );
        return res.status(400).json({ error: "Team already exists" });
      }
      // If the team doesn't exist, insert it into the database
      const newTeam = await teamsDB.insertTeam(name, country, externalId);
      console.log(`Inserted new team: ${newTeam.name} from ${newTeam.country}`);
      res.status(201).json(newTeam);
    });
  } catch (error) {
    console.error(`Error adding new team: ${error}`);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

module.exports = {
  addTeamHandler,
  getTeamHandler,
  getAllTeamsHandler
  // Other request handlers for teams
};
