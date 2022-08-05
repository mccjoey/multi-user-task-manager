const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const api = require("./routes/api");
const cookieSession = require("cookie-session");

const app = express();
const whitelist = ["http://localhost:8080"];

function corsOptionsDelegate(req, callback) {
  let corsOptions;
  if (whitelist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));

app.use(morgan("combined"));

app.use(express.json());
app.use(
  cookieSession({
    name: "user-session",
    // keys: ['key1', 'key2'], 
    secret: process.env.COOKIE_SECRET, // should use as secret environment variable
    httpOnly: true
  })
);
//ROUTES
app.use("/",api);

module.exports = app;
