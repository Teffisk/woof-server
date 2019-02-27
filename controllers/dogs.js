const express = require("express");
const router = express.Router();
const db = require("../models");

// POST /auth/login route - returns a JWT
router.get("/search", (req, res) => {
  res.send("GET /dogs/search");
});

// POST create a new dog with a userId association
router.post("/new", (req, res) => {
  db.user.findById(req.body.userId).then(function(user) {
    console.log("req.body:", req);
    user
      .createDog({
        name: req.body.name,
        userId: req.body.userId,
        birthday: req.body.birthday,
        breed: req.body.breed,
        gender: req.body.gender,
        bio: req.body.bio
      })
      .then(function(dog) {
        console.log(dog.get());
      });
  });
});

// This is what is returned when client queries for new user data
router.get("/search/results", (req, res) => {
  res.send("GET /dogs/search/results");
});

module.exports = router;
