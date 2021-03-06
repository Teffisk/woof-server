require("dotenv").config();
const cors = require("cors");
const express = require("express");
const expressJWT = require("express-jwt");
const favicon = require("serve-favicon");
const logger = require("morgan");
const path = require("path");

// App instance
const app = express();

// Set up middleware
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

// Helper function: This allows our server to parse the incoming token from the client
// This is being run as middleware, so it has access to the incoming request
function fromRequest(req) {
  console.log("fromRequest in index.js is running!!!!");
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
}

// Controllers
// All auth routes are protected except for POST to /auth/login and POST /auth/signup
// Remember to pass the JWT_SECRET (it will break without it)
// NOTE: The unless portion is only needed if you need exceptions
app.use(
  "/auth",
  expressJWT({
    secret: process.env.JWT_SECRET,
    getToken: fromRequest
  }).unless({
    path: [
      { url: "/auth/login", methods: ["POST"] },
      { url: "/auth/signup", methods: ["POST"] }
    ]
  }),
  require("./controllers/auth")
);
app.use("/places", require("./controllers/places"));
app.use("/dogs", require("./controllers/dogs"));
app.use("/people", require("./controllers/people"));
app.use("/reviews", require("./controllers/reviews"));

// This is the catch-all route. Ideally you don't get here unless you made a mistake on your front-end
app.get("*", function(req, res, next) {
  res.send({ message: "Not Found", error: 404 });
});

// Listen on specified PORT or default to 8000
app.listen(process.env.PORT || 8000);
