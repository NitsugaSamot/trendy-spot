const checkAuth = async (req, res, next) => {
  // Comenta o elimina toda la lógica relacionada con la validación del token

  // Luego, simplemente llama a next() para continuar con el flujo de la solicitud
  next();
};

module.exports = {
  checkAuth,
};
