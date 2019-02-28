const express = require("express");
const router = express.Router();
const db = require("./models");

// POST /auth/login route - returns a JWT
router.get("/:userid", (req, res) => {
  db.user.findById(req.params.userid),
    then(user => {
      res.send(user);
    }).catch(err => {
      console.log("Server Error:", err);
      res.send("Error!");
    });
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
