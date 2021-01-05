//keys.js - figure out what set of credentials to return

const { model } = require("mongoose");

//read env variable from heroku server to determine if we are running in production
if (process.env.NODE_ENV === "production") {
  //we are in production - return the prod set of keys
  module.exports = require("./prod");
} else {
  //we are in development - return the dev keys!!!
  module.exports = require("./dev");
}
