const { Product } = require("../../db");

const ratingController = async (id, newRating) => {
    const productFound = await Product.findByPk(id);
    if (productFound === null) {
        return  `No se encontró producto con el id : ${id}`;
    }
    
    // Verifica si la propiedad ratings es null
    if (productFound.ratings === null) {
        // Si es null, asigna un arreglo vacío
        productFound.ratings = [];
    }
    
    // Realiza una copia del arreglo de valoraciones y agrega la nueva valoración
    const updatedRatings = [...productFound.ratings, newRating];

    // Actualiza el campo ratings con el nuevo arreglo de valoraciones
    productFound.ratings = updatedRatings;

    // Usa el método de Sequelize para guardar los cambios en la base de datos
    await productFound.save();
    return productFound;
}

module.exports = { ratingController };