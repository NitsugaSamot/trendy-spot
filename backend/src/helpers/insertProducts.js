const createProduct = require('../controllers/productsControllers/createProductController');

const insertProduct = async (products) => {
    const productsList = await products.map(({name, size, price, image, description, stock, color, brand}) => {
        createProduct(name, size, price, image, description, stock, color, brand)
        return {
            name,
            size,
            price,
            image,
            description,
            stock,
            color, 
            brand
        }
    })
    return productsList
}

module.exports = insertProduct;