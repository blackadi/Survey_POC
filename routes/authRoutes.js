const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  //Here the user has the code to fetch the profile data
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    //just to show the req in the browser
    //res.send(req.user);
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user); //req.user is the user model we setup via passport inside models/User.js
  });
};
