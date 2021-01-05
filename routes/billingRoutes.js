const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
//This middleware will help check authenticated user before proccessing the requst
const requireLogin = require("../middlewares/requireLogin"); //to understand move refeer to video 113. Route-Specific Middlewares

module.exports = (app) => {
  app.post("/api/stripe", requireLogin, async (req, res) => {
    //This is the return token from stripe to complete the transaction

    const charge = await stripe.charges.create({
      amount: 500,
      currency: "usd",
      source: req.body.id,
      description: "5$ from 5 awesome blackadi",
    });

    req.user.credits += 5; //save the new credit inside the user model
    const user = await req.user.save();

    res.send(user);
  });
};
