const usersDB = require("./users.model");
const teamsDB = require("../teams/teams.model");
const { runTransaction } = require("../../utils/db/db");

async function addUserTeamsHandler(req, res) {
  const { teams } = req.body;

  const clerkUserId = req.auth.userId;
  try {
    await runTransaction(async () => {
      let user = await usersDB.getUserByClerkId(clerkUserId);
      if (!user) {
        user = await usersDB.insertUser(clerkUserId);
      }

      for (const team of teams) {
        const teamFound = await teamsDB.getTeamById(team.id);
        if (!teamFound) {
          console.log(`Team not found: ${team.name} from ${team.country}`);
          console.log(`Team ID: ${team.id}`);
          console.log("I am going to insert it into the database");
          await teamsDB.insertTeam(team.name, team.country, team.id);
        }
      }

      await usersDB.addUserTeams(user.id, teams);
      res.status(201).json({ message: "Teams added successfully" });
    });
  } catch (error) {
    console.error(`Error adding team: ${error}`);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function getUserTeamsHandler(req, res) {
  const clerkUserId = req.auth.userId;
  try {
    await runTransaction(async () => {
      let user = await usersDB.getUserByClerkId(clerkUserId);
      if (!user) {
        user = await usersDB.insertUser(clerkUserId);
      }
      const teams = await usersDB.getUserTeams(user.id);
      console.log(teams);
      res.status(200).json(teams);
    });
  } catch (error) {
    console.error(`Error fetching user teams: ${error}`);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function deleteUserTeamsHandler(req, res) {
  const { teamIds } = req.body;
  const clerkUserId = req.auth.userId;
  try {
    await runTransaction(async () => {
      const user = await usersDB.getUserByClerkId(clerkUserId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      await usersDB.deleteUserTeams(user.id, teamIds);
      res.status(200).json({ message: "Team deleted successfully" });
    });
  } catch (error) {
    console.error(`Error deleting team: ${error}`);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function getUserBlockedKeywordsHandler(req, res) {
  const clerkUserId = req.auth.userId;
  try {
    await runTransaction(async () => {
      console.log(`Fetching user blocked keywords for user with Clerk ID: ${clerkUserId}`);
      let user = await usersDB.getUserByClerkId(clerkUserId);
      if (!user) {
        console.log(`User with Clerk ID ${clerkUserId} not found, inserting new user`);
        user = await usersDB.insertUser(clerkUserId);
      }
      const blockedKeywords = await usersDB.getUserBlockedKeywords(user.id);
      console.log(`User blocked keywords: ${JSON.stringify(blockedKeywords)}`);
      res.status(200).json(blockedKeywords);
    });
  } catch (error) {
    console.error(`Error fetching user blocked keywords: ${error}`);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}


async function updateTeamBlockStatusHandler(req, res) {
  const { teamId, isBlocked } = req.body;
  console.log(`Changing ${teamId} to ${isBlocked}`)
  const clerkUserId = req.auth.userId;
  try {
    await runTransaction(async () => {
      console.log(`Updating team block status for user with Clerk ID: ${clerkUserId}`);
      let user = await usersDB.getUserByClerkId(clerkUserId);
      if (!user) {
        console.log(`User with Clerk ID ${clerkUserId} not found, inserting new user`);
        user = await usersDB.insertUser(clerkUserId);
      }
      await usersDB.updateTeamBlockStatus(user.id, teamId, isBlocked);
      res.status(200).json({ message: "Team block status updated successfully" });
    });
  } catch (error) {
    console.error(`Error updating team block status: ${error}`);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

async function getUserBlockedTeamsHandler(req, res) {
  const clerkUserId = req.auth.userId;
  try {
    await runTransaction(async () => {
      console.log(`Fetching user blocked teams for user with Clerk ID: ${clerkUserId}`);
      let user = await usersDB.getUserByClerkId(clerkUserId);
      if (!user) {
        console.log(`User with Clerk ID ${clerkUserId} not found, inserting new user`);
        user = await usersDB.insertUser(clerkUserId);
      }
      console.log(`User found: ${JSON.stringify(user)}`);
      const blockedTeams = await usersDB.getUserBlockedTeams(user.id);
      console.log(`User blocked teams: ${JSON.stringify(blockedTeams)}`);
      res.status(200).json(blockedTeams);
    });
  } catch (error) {
    console.error(`Error fetching user blocked teams: ${error}`);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}


module.exports = {
  addUserTeamsHandler,
  getUserTeamsHandler,
  deleteUserTeamsHandler,
  getUserBlockedKeywordsHandler,
  updateTeamBlockStatusHandler,
  getUserBlockedTeamsHandler
};
