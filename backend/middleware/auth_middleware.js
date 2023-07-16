const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const auth_middleware = (req, res, next) => {
  //grab token from cookies
  //console.log(req.cookies);
  const token = req.header("Authorization");
  if (!token) {
    res.status(403).send("Access denied");
  }

  //decode token and get id
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
    req.user = decode;
  } catch (err) {
    console.log(err);
    res.status(401).send("Invalid token");
  }

  return next();
};

module.exports = auth_middleware;
