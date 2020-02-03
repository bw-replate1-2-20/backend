const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/secrets.js');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, jwtSecret, (err, decodedToken) => {
      if (err) {
        // The token isn't valid.
        res.status(401).json({ message: "Invalid credentials." });
      }
      else { // TODO: Extract important information from token
        // req.____ = { ____: decodedToken.____ };
        next();
      }
    })
  }
  else {
    // No token. Not logged in.
    res.status(401).json({ message: "You shall not pass!" });
  }
};
