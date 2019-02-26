const express = require("express");
const router = express.Router();

// POST /auth/login route - returns a JWT
router.get("/search", (req, res) => {
  res.send("GET /users/search");
});

// POST /auth/signup route - create a user in the DB and then log them in
router.post("/search/", (req, res) => {
  res.send("POST /users/search/:userid");
});

// This is what is returned when client queries for new user data
router.get("/search/results", (req, res) => {
  res.send("GET /users/search/results");
});

module.exports = router;
