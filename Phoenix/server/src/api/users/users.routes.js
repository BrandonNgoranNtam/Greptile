// server/api/users/user.routes.js

const express = require("express");
const userHandlers = require("./users.handlers");
const router = express.Router();

// Add teams to the user's block list
router.post("/teams", userHandlers.addUserTeamsHandler);
// Route to get all teams for a user
router.get("/teams", userHandlers.getUserTeamsHandler);
// Delete teams to the user's block list
router.delete("/teams", userHandlers.deleteUserTeamsHandler); 
// Get every blocked keywords from the user's blocked teams
router.get('/blocked-keywords', userHandlers.getUserBlockedKeywordsHandler);

router.put('/team-block-status', userHandlers.updateTeamBlockStatusHandler);

router.get('/blocked-teamsIds', userHandlers.getUserBlockedTeamsHandler);



module.exports = router;
