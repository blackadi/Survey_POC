//prod.js - production keys here!!!!
module.exports = {
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecrect: process.env.GOOGLE_CLIENT_SECRECT,
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  stripePublishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SEND_GRID_KEY,
  redirectDomain: process.env.REDIRECT_DOMAIN,
};
