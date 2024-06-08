// server/api/teams/teams.routes.js

const express = require('express');
const keywordsHandlers = require('./keywords.handlers');

const router = express.Router();

// Route to add a keyword linked to a team
router.post('/:teamId/keywords', keywordsHandlers.addKeywordToTeamHandler);

module.exports = router;
