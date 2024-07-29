const jwt = require("jsonwebtoken");
const JWT_SECRET = "Shaunisacunnigo#$%ne";

const fetchUser = (req, res, next) => {
  // Get user from jwt token and add to request body
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ error: "Please authenticate with a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Please authenticate with a valid token" });
  }
};

module.exports = fetchUser;
