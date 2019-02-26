const express = require("express");
const router = express.Router();
("use strict");

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Yelp's helper code to call API
const yelp = require("yelp-fusion");

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey =
  "VwDPuq_pjm7WYisNaTFtmAFOyH5hHLW7vwQJPrQv6IhD8Hpqk4uiI_OchZHB3TGlVxEfMVYZkZlSWdiV2maxH_XzaNGccgRxsGmj0yl0fT892pYCXw8ALsLUKGd0XHYx";

const searchRequest = {
  term: "Four Barrel Coffee",
  location: "san francisco, ca"
};

const client = yelp.client(apiKey);

client
  .search(searchRequest)
  .then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  })
  .catch(e => {
    console.log(e);
  });
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
router.get("/search", (req, res) => {
  res.send("GET /places/search");
});

router.post("/search/", (req, res) => {
  res.send("POST /locations/search/:locationId");
});

router.get("/search/results", (req, res) => {
  res.send("GET /locations/search/results");
});

module.exports = router;
