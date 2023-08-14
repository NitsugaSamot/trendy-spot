require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../db');

const checkAuth = async (req, res, next) => {
  const secret = process.env.JWT_SECRET;
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, secret);

      req.user = await User.findByPk(decoded.id, {
        attributes: ['id', 'name', 'email'],
      });

      // Si llegamos aquí, el token es válido, así que podemos continuar con la siguiente función
      return next();
    } catch (error) {
      // Si hay un error en la verificación del token, respondemos con un mensaje de error
      return res.status(401).json({ msg: 'Token no válido' });
    }
  }

  if (!token) {
    // Si no se proporcionó un token, respondemos con un mensaje de error
    return res.status(401).json({ msg: 'Token no proporcionado' });
  }

  // Si no hubo errores, seguimos con la siguiente función
  next();
};

module.exports = {
  checkAuth,
};
