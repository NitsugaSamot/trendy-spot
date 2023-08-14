const { Product, Rating } = require('../../db');

const calculateAverageRating = async (productId) => {
  try {
    const product = await Product.findByPk(productId, {
      include: [{ model: Rating, attributes: ['rating'] }],
    });

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    const ratings = product.ratings.map(rating => rating.rating);
    const totalRatings = ratings.length;
    const sumRatings = ratings.reduce((sum, rating) => sum + rating, 0);

    const averageRating = totalRatings > 0 ? sumRatings / totalRatings : 0;

    await product.update({ averageRating });

    return averageRating;
  } catch (error) {
    console.error('Error al calcular el promedio de valoraciones', error);
    throw error;
  }
};

module.exports = { calculateAverageRating };
