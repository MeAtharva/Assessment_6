module.exports = function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res
      .status(403)
      .send(
        "ACCESS DENIED STATUS CODE 403 !\n Your not a authorized user to access this data"
      );
  }
};
