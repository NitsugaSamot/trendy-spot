require("dotenv").config();
const jwt = require("jsonwebtoken");

/* Cadena codificada */
const generateJWT = (id) => {
  const secret = process.env.JWT_SECRET;

  return jwt.sign({ id }, secret, {
    expiresIn: "15d",
  });
};

module.exports = {
  generateJWT,
};
