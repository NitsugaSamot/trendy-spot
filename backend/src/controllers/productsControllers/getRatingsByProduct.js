const { Rating, Product } = require('../../db');

async function getRatingsByProduct(req, res) {
  const productId = req.params.productId;

  try {
    const product = await Product.findByPk(productId, {
      include: { model: Rating, include: { model: User, attributes: ['name', 'email'] } },
    });

    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const ratings = product.ratings; // Valoraciones asociadas al producto

    return res.status(200).json({ ratings });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
}

module.exports = {
  getRatingsByProduct,
};
