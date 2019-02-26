require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models");
const router = express.Router();

// POST /auth/login route - returns a JWT
router.post("/login", (req, res) => {
  console.log(req.body);
  // Find out if the user exists (for login, they should)
  db.user
    .findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user || !user.password) {
        return res.status(403).send("User not found");
      }
      // The user exists. Now, we want to validate their password
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        // User is invalid
        console.log("ERROR INVALID CREDENTIALS");
        return res.status(401).send("Invalid Credentials.");
      }

      // The user is valid!!! :)
      console.log("LOGIN SUCCESS");
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });
      console.log("TOKEN!!!", token);
      // Send that token and the user info
      res.send({ token: token });
    })
    .catch(err => {
      console.log("HELLO?????", err);
      return res.status(503).send("Database Error. Sad day. :(");
    });
});

// POST /auth/signup route - create a user in the DB and then log them in
router.post("/signup", function(req, res) {
  console.log("BODY", req.body);
  //TODO: First check if the user already exists
  db.user
    .findOne({ where: { email: req.body.email } })
    .then(user => {
      // Database call was a success
      if (user) {
        // If the user exists already, don't let them create a duplicate account. Instead they should log in.
        return res.status(400).send("User exists already!");
      }
      // Great! This is a new user. Let's make them an account!
      db.user
        .create(req.body)
        .then(createdUser => {
          // Make a token and send it as JSON, so the user can remain logged in
          const token = jwt.sign(createdUser.toJSON(), process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24 // 24 hours, in seconds
          });

          res.send({ token: token });
        })
        .catch(err => {
          console.log("err", err);
          res.status(500).send("Could not create user in DB");
        });
    })
    .catch(err => {
      console.log("err", err);
      res.status(500).send("Database Error! :(");
    });
});

// This is what is returned when client queries for new user data
router.get("/current/user", function(req, res) {
  db.user
    .findById(req.user.id)
    .then(function(user) {
      console.log("User from /auth/current/user:", user);
      res.send({ user: user });
    })
    .catch(function(err) {
      console.log(err);
      res.send({ user: null, error: "server error" });
    });
});

module.exports = router;
