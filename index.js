const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const keys = require("./config/keys");
require("./models/User");
require("./models/Survey");
require("./services/passport");

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .catch(function (reason) {
    console.log("Unable to connect to the mongodb instance. Error: ", reason);
  });

const app = express();

app.use(bodyParser.json()); //this is required by express server to parese any request body and assigned it to the req.body proprity inside the incomding request object
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, //keep the cookie alive for 30 days
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Defind routes in the app and immediately call the app funcation
require("./routes/authRoutes")(app);
require("./routes/billingRoutes")(app);
require("./routes/surevyRoutes")(app);

//this line enables production route changes to react router build version since express does not understand react
if (process.env.NODE_ENV === "production") {
  //this to ensure heroku run the right path
  //check Section 9: Back End to Front End Routing in Production
  app.use(express.static("client/build"));

  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//Either find a dymanic port set by the server for example heroku or use default 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
