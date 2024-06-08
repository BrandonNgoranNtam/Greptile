// server/api/teams/teams.routes.js

const express = require('express');
const teamsHandlers = require('./teams.handlers');

const router = express.Router();

router.get('/', teamsHandlers.getAllTeamsHandler);
router.get('/:teamId', teamsHandlers.getTeamHandler);

// Route to add a new team
router.post('/', teamsHandlers.addTeamHandler);




console.log(typeof router)
module.exports = router;
