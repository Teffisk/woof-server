const express = require("express");
const router = express.Router();
const db = require("../models");

// GET all the dogs with the user's id
router.get("/:userId", (req, res) => {
  console.log("Hitting server route GET /dogs/search");
  db.dog
    .findAll({ where: { userId: req.params.userId } })
    .then(dogs => {
      console.log(dogs);
      res.send(dogs);
    })
    .catch(err => {
      console.log("Err!:", err);
      res.send(err);
    });
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
        res.send(dog);
      });
  });
});

// This is what is returned when client queries for new user data
router.get("/search/results", (req, res) => {
  res.send("GET /dogs/search/results");
});

module.exports = router;
