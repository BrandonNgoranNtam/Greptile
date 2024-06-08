// server/routes.js

const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const express = require("express");
const teamsRoutes = require("./api/teams");
const keywordsRoutes = require("./api/keywords");
const usersRoutes = require("./api/users");

const router = express.Router();

router.use("/api/teams", teamsRoutes);
router.use("/api/keywords", keywordsRoutes);
router.use("/api/users", ClerkExpressRequireAuth(), usersRoutes);

// Add other routes as needed

module.exports = router;
