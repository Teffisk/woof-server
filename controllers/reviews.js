const express = require("express");
const router = express.Router();
const db = require("../models");

// GET all the reviews for a location
router.get("/locations/:locationId", (req, res) => {
  db.review
    .findAll({ where: { locationId: req.params.locationId } })
    .then(reviews => {
      res.send(reviews);
    })
    .catch(err => {
      console.log("Error in the GET REVIEWS route:", err);
      res.send("Server ERROR!!!");
    });
});

//GET all the reviews for a specific user

// POST a new review from a user to a location
router.post("/new", (req, res) => {
  db.review
    .create(req.body)
    .then(review => {
      console.log("Review was successfully created!");
    })
    .catch(err => {
      console.log("Error on creating this new review:", err);
      res.send("Server error!!!");
    });
});

module.exports = router;
