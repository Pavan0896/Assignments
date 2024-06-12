const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  let authHeader = req.get("Authorization");
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, "masai", (err, decoded) => {
      if (err) {
        res.send("Login First");
      } else {
        req.user = decoded;
        next();
      }
    });
  }
};

module.exports = auth;
