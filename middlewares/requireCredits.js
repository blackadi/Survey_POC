//to understand move refeer to video 113. Route-Specific Middlewares
module.exports = (req, res, next) => {
  if (req.user.credits < 1) {
    return res.status("403").send({ error: "Not enough credits!" }); //403 this http response for Forbidden
  }

  next(); //if there is no issue with the request and there is authrized user then carry on normaly move to the next request handler
};
