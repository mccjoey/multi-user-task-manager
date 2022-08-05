const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function isAuthenticated(req, res, next) {
  try {
    const token = req.session.token;
    
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }      
      req.user = await userModel.findById(decoded.id);
      next();
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = isAuthenticated;
