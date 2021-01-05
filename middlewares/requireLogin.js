//to understand move refeer to video 113. Route-Specific Middlewares

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status("401").send({ error: "You must login!" });
  }

  next(); //if there is no issue with the request and there is authrized user then carry on normaly move to the next request handler
};
