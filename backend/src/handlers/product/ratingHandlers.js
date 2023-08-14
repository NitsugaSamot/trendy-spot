const { validationResult, check } = require('express-validator');

const Product = require('../../models/Product');
const User = require('../../models/User');
const Rating = require('../../models/Rating');

const { calculateAverageRating } = require('../../controllers/productsControllers/calculateAverageRating'); // Importa la función de cálculo

async function getAverageRating(req, res) {
  const productId = req.params.productId;

  try {
    const averageRating = await calculateAverageRating(productId);
    return res.status(200).json({ averageRating });
  } catch (error) {
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

async function createRating(req, res) {
  const { rating } = req.body;
  const productId = req.params.productId;
  const userId = req.user.id; // El usuario autenticado

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Verificar si el usuario ya ha valorado este producto
    const existingRating = await Rating.findOne({
      where: { productId, userId },
    });

    if (existingRating) {
      return res.status(400).json({ message: 'Ya has valorado este producto' });
    }

    // Crear la valoración
    const newRating = await Rating.create({
      rating,
      productId,
      userId,
    });

    return res.status(201).json({ message: 'Valoración creada con éxito', rating: newRating });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

const createRatingValidation = [
  check('rating')
    .isInt({ min: 1, max: 5 })
    .withMessage('La calificación debe estar entre 1 y 5'),
];



module.exports = {
  getAverageRating,
  createRating,
  createRatingValidation
};
