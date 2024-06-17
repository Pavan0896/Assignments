const jwt = require("jsonwebtoken");
const blacklisted = require("../blacklist");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if(token){
    if(blacklisted.includes(token)){
        res.send("You are blacklisted, login again")
    }
  }
  jwt.verify(token, "secret", (err, decoded) => {
    if (err) {
      res.send("Login first");
    } else {
      req.user = decoded;
      next();
    }
  });
};

module.exports = auth;
