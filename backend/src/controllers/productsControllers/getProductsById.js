const { Product } = require('../../models/Product'); // Asegúrate de importar el modelo Product correctamente

const getProductById = async (req, res) => {
  const productId = req.params.id; // Asegúrate de que el parámetro sea el correcto

  try {
    const product = await Product.findOne({
      attributes: ["id", "name", "size", "price", "image", "description", "stock", "color", "productbrand", "averageRating"],
      where: {
        id: productId
      }
    });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getProductById
};
