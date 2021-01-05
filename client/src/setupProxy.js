const { createProxyMiddleware } = require("http-proxy-middleware");

//To avoid browser security for cookies since we relay on this for authentication, usign a proxy will make the browser thinks its making the same request to the same domain and port even-though we know we are using two diffrent prort to from client and server (Watch [Optional] Why This Architecture? video to refresh memory)
module.exports = function (app) {
  app.use(
    ["/api", "/auth/google"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
