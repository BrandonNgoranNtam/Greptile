// server/api/teams/teams.handlers.js

const keywordsDB = require("../keywords/keywords.model");
const { runTransaction } = require("../../utils/db/db");


// Handler to add a keyword linked to a team
async function addKeywordToTeamHandler(req, res) {
  const { teamId } = req.params;
  const { word } = req.body;
  try {
    await runTransaction(async () => {
      // Insert the keyword into the keywords table if it doesn't already exist
      const keywordId = await keywordsDB.insertKeyword(word);

      // Insert the relationship between the team and the keyword
      await keywordsDB.insertTeamKeyword(teamId, keywordId);

      res.status(201).json({ message: "Keyword added to team successfully" });
    });
  } catch (error) {
    console.error("Error adding keyword to team:", error);
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

module.exports = {
  addKeywordToTeamHandler,
};
